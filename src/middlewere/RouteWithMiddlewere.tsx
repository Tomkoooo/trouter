import React from 'react';
import { useNavigate } from 'react-router-dom';

interface RouteWithMiddlewareProps {
  path: string;
  component: React.ComponentType<any>;
  user?: Object | null;
  routes: routes;
}

interface routes {
    [key: string]: {
        type: string;
        credentials?: string;
        redirectTo?: string;
    };
}


// Middleware logika
const RouteWithMiddleware: React.FC<RouteWithMiddlewareProps> = ({
  path,
  component: Component,
  user,
  routes: routeConfig
}) => {
  const navigate = useNavigate();

const routeConfigForPath = routeConfig[path] as { type: string; credentials: string; redirectTo: string } | undefined;
  if (routeConfigForPath) {
    if (routeConfigForPath.type === 'public') {
      return <Component />;
    }

    // Privát route esetén ellenőrizzük a felhasználót
    if (routeConfigForPath.type === 'private') {
      if (user) {
        const condition = new Function('user', `return ${routeConfigForPath.credentials}`);
        if (condition(user)) {
          return <Component />;
        } else {
          navigate(routeConfigForPath.redirectTo);
          return null;
        }
      } else {
        navigate(routeConfigForPath.redirectTo);
        return null;
      }
    }
  }

  return <Component />;
};

export default RouteWithMiddleware;
