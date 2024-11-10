import { default as React, ReactNode } from 'react';
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
    middlewere?: React.ComponentType<any>;
    pages: Record<string, () => Promise<unknown>>;
}
declare const DynamicRouter: React.FC<DynamicRouterProps>;
export default DynamicRouter;
