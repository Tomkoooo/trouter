"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  DynamicRouter: () => dynamicRouter_default,
  Link: () => Link_default,
  NotFound: () => NotFound_default
});
module.exports = __toCommonJS(src_exports);

// src/router/dynamicRouter.tsx
var import_react4 = __toESM(require("react"));
var import_react_router_dom3 = require("react-router-dom");

// src/components/NotFound.tsx
var import_react2 = __toESM(require("react"));

// src/components/Link.tsx
var import_react = __toESM(require("react"));
var import_react_router_dom = require("react-router-dom");
var Link = ({ to, children, className, target }) => {
  const navigate = (0, import_react_router_dom.useNavigate)();
  const handleClick = (e) => {
    e.preventDefault();
    navigate(to);
  };
  return (
    // Use a button or div for navigation, styled as a link if needed
    /* @__PURE__ */ import_react.default.createElement(
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
  return /* @__PURE__ */ import_react2.default.createElement("div", { className: "not-found-container" }, /* @__PURE__ */ import_react2.default.createElement("div", { className: "not-found-content" }, /* @__PURE__ */ import_react2.default.createElement("h1", { className: "not-found-title" }, "404"), /* @__PURE__ */ import_react2.default.createElement("p", { className: "not-found-message" }, "Oops! The page you're looking for doesn't exist."), /* @__PURE__ */ import_react2.default.createElement("p", { className: "not-found-submessage" }, "But don't worry, you can always go back to the homepage."), /* @__PURE__ */ import_react2.default.createElement(Link_default, { to: "/", className: "back-home-button" }, "Go to Homepage")));
};
var NotFound_default = NotFound;

// src/middlewere/RouteWithMiddlewere.tsx
var import_react3 = __toESM(require("react"));
var import_react_router_dom2 = require("react-router-dom");
var RouteWithMiddleware = ({
  path,
  component: Component,
  user,
  routes: routeConfig
}) => {
  const navigate = (0, import_react_router_dom2.useNavigate)();
  const routeConfigForPath = routeConfig[path];
  if (routeConfigForPath) {
    if (routeConfigForPath.type === "public") {
      return /* @__PURE__ */ import_react3.default.createElement(Component, null);
    }
    if (routeConfigForPath.type === "private") {
      if (user) {
        const condition = new Function("user", `return ${routeConfigForPath.credentials}`);
        if (condition(user)) {
          return /* @__PURE__ */ import_react3.default.createElement(Component, null);
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
  return /* @__PURE__ */ import_react3.default.createElement(Component, null);
};
var RouteWithMiddlewere_default = RouteWithMiddleware;

// src/router/dynamicRouter.tsx
var import_meta = {};
var DynamicRouter = ({
  loadingFallback = /* @__PURE__ */ import_react4.default.createElement("div", null, "Loading..."),
  user,
  pagesConfig,
  middlewere
  // Custom middleware passed as prop
}) => {
  const pages = import_meta.glob("../pages/**/*.{js,jsx,ts,tsx}");
  const pathFromFile = (filePath) => {
    const cleanedPath = filePath.replace("./pages", "").replace(/\/page\.(js|jsx|ts|tsx)$/, "").replace(/\[([^\]]+)\]/g, ":$1");
    return cleanedPath === "" ? "/" : cleanedPath;
  };
  const routes = Object.keys(pages).map((filePath) => {
    const Component = (0, import_react4.lazy)(() => {
      return pages[filePath]().then((module2) => {
        const mod = module2;
        return { default: mod.default };
      });
    });
    return {
      path: pathFromFile(filePath),
      component: Component
    };
  });
  return /* @__PURE__ */ import_react4.default.createElement(import_react_router_dom3.BrowserRouter, null, /* @__PURE__ */ import_react4.default.createElement(import_react4.Suspense, { fallback: loadingFallback }, /* @__PURE__ */ import_react4.default.createElement(import_react_router_dom3.Routes, null, routes.map(({ path, component: Component }) => {
    const MiddlewareComponent = middlewere || RouteWithMiddlewere_default;
    return /* @__PURE__ */ import_react4.default.createElement(
      import_react_router_dom3.Route,
      {
        key: path,
        path,
        element: /* @__PURE__ */ import_react4.default.createElement(
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
  }), /* @__PURE__ */ import_react4.default.createElement(import_react_router_dom3.Route, { path: "*", element: /* @__PURE__ */ import_react4.default.createElement(NotFound_default, null) }))));
};
var dynamicRouter_default = DynamicRouter;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DynamicRouter,
  Link,
  NotFound
});
//# sourceMappingURL=index.js.map