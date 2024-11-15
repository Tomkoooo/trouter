import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import fs from 'fs/promises';

const app = express();

// Dynamically load API routes based on filesystem structure
export const loadRoutes = async (dir: string, parentPath: string = '') => {
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

