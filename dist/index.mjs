// src/router/dynamicRouter.tsx
import React4, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// src/components/NotFound.tsx
import React2 from "react";

// src/components/Link.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
var Link = ({ to, children, className, target }) => {
  const navigate = useNavigate();
  const handleClick = (e) => {
    e.preventDefault();
    navigate(to);
  };
  return (
    // Use a button or div for navigation, styled as a link if needed
    /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: handleClick,
        className,
        style: { all: "unset", cursor: "pointer" }
      },
      children
    )
  );
};
var Link_default = Link;

// src/components/NotFound.tsx
var NotFound = () => {
  return /* @__PURE__ */ React2.createElement("div", { className: "not-found-container" }, /* @__PURE__ */ React2.createElement("div", { className: "not-found-content" }, /* @__PURE__ */ React2.createElement("h1", { className: "not-found-title" }, "404"), /* @__PURE__ */ React2.createElement("p", { className: "not-found-message" }, "Oops! The page you're looking for doesn't exist."), /* @__PURE__ */ React2.createElement("p", { className: "not-found-submessage" }, "But don't worry, you can always go back to the homepage."), /* @__PURE__ */ React2.createElement(Link_default, { to: "/", className: "back-home-button" }, "Go to Homepage")));
};
var NotFound_default = NotFound;

// src/middlewere/RouteWithMiddlewere.tsx
import React3 from "react";
import { useNavigate as useNavigate2 } from "react-router-dom";
var RouteWithMiddleware = ({
  path,
  component: Component,
  user,
  routes: routeConfig
}) => {
  const navigate = useNavigate2();
  const routeConfigForPath = routeConfig[path];
  if (routeConfigForPath) {
    if (routeConfigForPath.type === "public") {
      return /* @__PURE__ */ React3.createElement(Component, null);
    }
    if (routeConfigForPath.type === "private") {
      if (user) {
        const condition = new Function("user", `return ${routeConfigForPath.credentials}`);
        if (condition(user)) {
          return /* @__PURE__ */ React3.createElement(Component, null);
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
  return /* @__PURE__ */ React3.createElement(Component, null);
};
var RouteWithMiddlewere_default = RouteWithMiddleware;

// src/router/dynamicRouter.tsx
var DynamicRouter = ({
  loadingFallback = /* @__PURE__ */ React4.createElement("div", null, "Loading..."),
  user,
  pagesConfig,
  middlewere
  // Custom middleware passed as prop
}) => {
  const pages = import.meta.glob("../pages/**/*.{js,jsx,ts,tsx}");
  const pathFromFile = (filePath) => {
    const cleanedPath = filePath.replace("./pages", "").replace(/\/page\.(js|jsx|ts|tsx)$/, "").replace(/\[([^\]]+)\]/g, ":$1");
    return cleanedPath === "" ? "/" : cleanedPath;
  };
  const routes = Object.keys(pages).map((filePath) => {
    const Component = lazy(() => {
      return pages[filePath]().then((module) => {
        const mod = module;
        return { default: mod.default };
      });
    });
    return {
      path: pathFromFile(filePath),
      component: Component
    };
  });
  return /* @__PURE__ */ React4.createElement(Router, null, /* @__PURE__ */ React4.createElement(Suspense, { fallback: loadingFallback }, /* @__PURE__ */ React4.createElement(Routes, null, routes.map(({ path, component: Component }) => {
    const MiddlewareComponent = middlewere || RouteWithMiddlewere_default;
    return /* @__PURE__ */ React4.createElement(
      Route,
      {
        key: path,
        path,
        element: /* @__PURE__ */ React4.createElement(
          MiddlewareComponent,
          {
            path,
            component: Component,
            user,
            routes: pagesConfig
          }
        )
      }
    );
  }), /* @__PURE__ */ React4.createElement(Route, { path: "*", element: /* @__PURE__ */ React4.createElement(NotFound_default, null) }))));
};
var dynamicRouter_default = DynamicRouter;
export {
  dynamicRouter_default as DynamicRouter,
  Link_default as Link,
  NotFound_default as NotFound
};
//# sourceMappingURL=index.mjs.map