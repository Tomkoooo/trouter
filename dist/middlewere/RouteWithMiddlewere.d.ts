import { default as React } from 'react';
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
declare const RouteWithMiddleware: React.FC<RouteWithMiddlewareProps>;
export default RouteWithMiddleware;
