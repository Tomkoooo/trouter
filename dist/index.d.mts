import React, { ReactNode } from 'react';

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
}
declare const DynamicRouter: React.FC<DynamicRouterProps>;

declare const NotFound: React.FC;

interface LinkProps {
    to: string;
    children: React.ReactNode;
    className?: string;
    target?: string;
}
declare const Link: React.FC<LinkProps>;

export { DynamicRouter, Link, NotFound };
