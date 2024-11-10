/// <reference types="vite/client" />

import React, { lazy, Suspense, ReactNode } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NotFound from '../components/NotFound'; // 404-es oldal importálása
import RouteWithMiddleware from '../middlewere/RouteWithMiddlewere';  // Middleware importálása

// Típusdefiníciók
type PageModule = { default: React.ComponentType<any> };

// A helyes típusok importálása
type RouteConfig = {
  path: string;
  component: React.ComponentType<any>;
};

interface Pages {
  [key: string]: {
    type: string;
    credentials?: string;
    redirectTo?: string;
  };
}

interface DynamicRouterProps {
  loadingFallback?: ReactNode;
  pagesConfig: Pages;
  pagePath?: string;
  user?: Object | null;
  middlewere?: React.ComponentType<any>; // Optional custom middleware component
  pages: Record<string, () => Promise<unknown>>
}

const DynamicRouter: React.FC<DynamicRouterProps> = ({
  loadingFallback = <div>Loading...</div>,
  user,
  pagesConfig,
  middlewere, // Custom middleware passed as prop
  pages
}) => {
  // Az útvonalak létrehozása a fájlokból
  const pathFromFile = (filePath: string): string => {
    const cleanedPath = filePath
      .replace('./pages', '') // A 'pages' mappa eltávolítása
      .replace(/\/page\.(js|jsx|ts|tsx)$/, '')  // Csak `page` fájlokat kezelünk
      .replace(/\[([^\]]+)\]/g, ':$1');         // Dinamikus útvonalak kezeléséhez

    return cleanedPath === '' ? '/' : cleanedPath;  // Ha üres, akkor a főoldal
  };

  // Dinamikus route objektumok létrehozása
  const routes: RouteConfig[] = Object.keys(pages).map((filePath) => {
    const Component = lazy(() => {
      return pages[filePath]().then((module: unknown) => {
        const mod = module as PageModule;
        return { default: mod.default };
      });
    });

    return {
      path: pathFromFile(filePath),
      component: Component,
    };
  });

  console.log(routes);

  return (
    <Router>
      <Suspense fallback={loadingFallback}>
        <Routes>
          {routes.map(({ path, component: Component }) => {
            // If a custom middleware is passed, use it; otherwise, use the default RouteWithMiddleware
            const MiddlewareComponent = middlewere || RouteWithMiddleware;

            return (
              <Route
                key={path}
                path={path}
                element={
                  <MiddlewareComponent
                    path={path}
                    component={Component}
                    user={user}
                    routes={pagesConfig}
                  />
                }
              />
            );
          })}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default DynamicRouter;
