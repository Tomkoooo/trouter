import { default as React } from 'react';
interface LinkProps {
    to: string;
    children: React.ReactNode;
    className?: string;
    target?: string;
}
declare const Link: React.FC<LinkProps>;
export default Link;
