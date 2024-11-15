
---

# t-router

`t-router` is a dynamic routing library for React with Vite, designed to handle routes dynamically based on your file structure, with the option to apply middleware for route protection or other logic. It supports both TypeScript and JavaScript files and integrates seamlessly with React Router.

## Installation

To use `t-router` in your project, you can install it via npm or yarn.

### Using pre-built templete:
Learn more about [t-react](#https://github.com/Tomkoooo/t-router-React-template)
```bash
npx create-treact
```

### Using npm:

```bash
npm install @tomkoooo/t-router@latest
```

### Using yarn:

```bash
yarn add @tomkoooo/t-router@latest
```

## Usage

### Basic Setup

```tsx
import React from 'react';
import { DynamicRouter, Link } from '@tomkoooo/t-router';

const App = () => {
  const pagesConfig = {
    '/home': {
      type: 'public'
    },
    '/profile': {
      type: 'private',
      credentials: 'user.role === "admin"',
      redirectTo: '/login'
    }
  };
  /*
   or use import routes './your-route-config.json'

    {
      "Routes" : {
        "/": {
          "type": "public"
        }
      }
    }

  <DynamicRouter pagesConfig={routes.Routes} pages={pages}/>
  */

   const pages = import.meta.glob('./pages/**/*.{tsx,jsx}') //Needs to be passed like this because from node_modules the package ahs no access for glob but this creates opportunitys to use it outside Vite

  return (
    <DynamicRouter pagesConfig={pagesConfig} pages={pages}/>
    {/*There is a built-in middlewere by default that handles the pagesConfig logic, by default every route will be public, but for the user credentials to work you need to pass a user object*/}
  );
};

export default App;
```

## Server

You can create  `ExpressJs` server with API routes as folder structure. With this setup you will be able to create API routes like in `NextJs`. For this structure follow the [example structure](#file-structure) as provided. Also on run the server will console.log the read API structure with the API routes. Becouse file reading not workin from the `node_modules` here is the `server.ts` you can setup easily:

Example setup with Vite:
```javascript
// ./server/iindex.ts
import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 4000;

// Dynamically load API routes based on filesystem structure
const loadRoutes = async (dir: string, parentPath: string = '') => {
  const files = await fs.readdir(dir, { withFileTypes: true });

  for (const file of files) {
    const fullPath = path.join(dir, file.name);
    const routePath = `${parentPath}/${file.name.replace(/\.[tj]s$/, '')}`;

    if (file.isDirectory()) {
      // Recursively load files within directories
      await loadRoutes(fullPath, routePath);
    } else if (file.name === 'route.ts' || file.name === 'route.js') {
      // Process only files named `route.ts` or `route.js`
      const expressPath = `/api${parentPath.replace(/\[(\w+)\]/g, ':$1')}`; // Convert `[param]` to `:param`

      // Import the route handler
      const routeHandler = await import(fullPath);

      // Apply route handler, assuming it exports a default function
      app.use(expressPath, async (req: Request, res: Response, next: NextFunction) => {
        try {
          await routeHandler.default(req, res);
        } catch (err) {
          next(err);
        }
      });

      console.log(`Loaded route: [${expressPath}] -> ${fullPath}`);
    }
  }
};

// Enable CORS for all routes
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Load API routes from 'server/api' folder
loadRoutes(path.join(__dirname, 'api'))
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch(console.error);

```
```javascript
// vite.config.js

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: { //this will redirect every API call to the Express server without using http:localhost:3000/api/*
    proxy: {
      '/api': {
        target: 'http://localhost:4000', // Target Express server
        changeOrigin: true, // Handles the origin to match the target
      }
    }
  }
})
```

By this you can create the API folder inside Server and then add routes like `Login/` create a exported HTTP handler in a `route.ts/js` file and you can call it like `('/api/login')`. Or also you can create dynamic endpoints with folder name between `[]` like `[test]`

```javascript
// ./server/[test]/route.ts
import { Request, Response } from 'express';

export default async (req: Request, res: Response) => {
  const { test } = req.params;
  // A logika itt történik, pl. adatbázis lekérdezés
  res.json({ message: `Hello world, given params: ${test}` });
};

```

To run the server install `nodemon` so you not need to restart everytime you make changes. Then create `nodemon.json` and make a script for the server start:

```json
// nodemon.json for typescript
{
    "watch": ["server", "src"], 
    "ext": "js,ts,json",         
    "ignore": ["node_modules"],  
    "exec": "npx tsx server/index.ts"
  }
// extend the scripts in package.json (start:server)
"scripts": {
    "start:server": "nodemon server/index.ts",
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
```

### Dynamic Routing

`t-router` uses `import.meta.glob` to dynamically import your pages based on the file structure but you need to call the `glob` function and pass the reasult as pages because it's impossible to do from `node_modules` folder. Files should be placed under the `pages` directory and named `page.js`, `page.jsx`, `page.ts`, or `page.tsx`. For the root create a `page` file in the root of the `pages` directory and it will match the `/` route.

#### file structure:

```
server/
  api/
    login/
      route.ts
    [id]/
      route.ts
  index.ts
src/
  pages/
    home/
      page.tsx
    profile/
      page.tsx
    [id]/
      page.tsx
   page.tsx
```

The router will automatically pick up these routes and map them to the URL paths `/home` and `/profile`. And also can handle dynamic routes like [id] or [name].

### Dynamic Pages

Create dynamic URls with braces. The router automaticly handles them and you can access the param in the component like this:

```javascript
// src/pages/blog/[id]/page.tsx
import React from 'react';
import { useDynamicParams } from '@tomkoooo/t-router';

const BlogPostPage: React.FC = () => {
  const { id } = useDynamicParams(); //you need to use the dynamic name you given in the braces

  return <h1>Blog Post ID: {id}</h1>;
};

export default BlogPostPage;

```

### Custom Middleware

You can pass a custom middleware component to the `DynamicRouter`.

```tsx
import { DynamicRouter, Link } from '@tomkoooo/t-router';
import MyCustomMiddleware from './MyCustomMiddleware';
import routes from './routes.json'

const App = () => {

  const pages = import.meta.glob('./pages/**/*.{tsx,jsx}')

  return (
    <DynamicRouter pagesConfig={routes.Routes} pages={pages} middlewere={MyCustomMiddleware}/>
  );
};

export default App;
```

### Custom User Object

You can pass a custom `user` object to the router, which can be used for route authentication.

```tsx
const App = () => {
  const user = {
    id: '1',
    name: 'John Doe',
    role: 'admin'
  };

  return (
    <DynamicRouter pagesConfig={pagesConfig} pages={pages} user={user}/>
    {/*You can pass user object for the built-in middlewere to work with it for private routing*/}
  );
};
```

### Link Component

`t-router` provides a custom `Link` component that works with React Router and supports passing additional props like `className` and `target`.

```tsx
import { Link } from '@tomkoooo/t-router';

const MyComponent = () => {
  return (
    <div>
      <Link to="/profile" className="nav-link">
        Go to Profile
      </Link>
    </div>
  );
};
```

### NotFound Page

`t-router` includes a default `NotFound` page that automatically handles 404 errors on the router but can be imported.

```tsx
import NotFound from '@tomkoooo/t-router/dist/pages/NotFound';

const App = () => {
  return (
      <NotFound />
  );
};
```



## API

### `DynamicRouter`

- **`pages`** (required): All the pages in the `pages` folder.

- **`pagesConfig`** (required): An object defining routes and their configurations. Each route can have a `type`, optional `credentials` condition, and a `redirectTo` URL.
  
- **`user`** (optional): A custom user object to be passed for route authentication.
  
- **`middlewere`** (optional): A custom middleware component to handle additional logic such as authentication or redirects.

- **`loadingFallback`** (optional): A fallback element displayed while the route components are loading.

### `Link`

- **`to`** (required): The path to navigate to.
- **`children`** (required): The content displayed inside the link.
- **`className`** (optional): Additional CSS class for styling.
- **`target`** (optional): The target for opening the link (e.g., `_blank`).

## License

This project is licensed under the MIT License.

---

Let me know if you need further adjustments!
[Github/Tomkoooo](https://github.com/Tomkoooo/trouter)