import * as c from "react";
import b, { lazy as Te, Suspense as Ve } from "react";
import "react-dom";
/**
 * @remix-run/router v1.21.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
function U() {
  return U = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, U.apply(this, arguments);
}
var D;
(function(e) {
  e.Pop = "POP", e.Push = "PUSH", e.Replace = "REPLACE";
})(D || (D = {}));
const ue = "popstate";
function Ue(e) {
  e === void 0 && (e = {});
  function t(r, a) {
    let {
      pathname: o,
      search: i,
      hash: l
    } = r.location;
    return Z(
      "",
      {
        pathname: o,
        search: i,
        hash: l
      },
      // state defaults to `null` because `window.history.state` does
      a.state && a.state.usr || null,
      a.state && a.state.key || "default"
    );
  }
  function n(r, a) {
    return typeof a == "string" ? a : F(a);
  }
  return ke(t, n, null, e);
}
function v(e, t) {
  if (e === !1 || e === null || typeof e > "u")
    throw new Error(t);
}
function C(e, t) {
  if (!e) {
    typeof console < "u" && console.warn(t);
    try {
      throw new Error(t);
    } catch {
    }
  }
}
function Fe() {
  return Math.random().toString(36).substr(2, 8);
}
function ce(e, t) {
  return {
    usr: e.state,
    key: e.key,
    idx: t
  };
}
function Z(e, t, n, r) {
  return n === void 0 && (n = null), U({
    pathname: typeof e == "string" ? e : e.pathname,
    search: "",
    hash: ""
  }, typeof t == "string" ? T(t) : t, {
    state: n,
    // TODO: This could be cleaned up.  push/replace should probably just take
    // full Locations now and avoid the need to run through this flow at all
    // But that's a pretty big refactor to the current test suite so going to
    // keep as is for the time being and just let any incoming keys take precedence
    key: t && t.key || r || Fe()
  });
}
function F(e) {
  let {
    pathname: t = "/",
    search: n = "",
    hash: r = ""
  } = e;
  return n && n !== "?" && (t += n.charAt(0) === "?" ? n : "?" + n), r && r !== "#" && (t += r.charAt(0) === "#" ? r : "#" + r), t;
}
function T(e) {
  let t = {};
  if (e) {
    let n = e.indexOf("#");
    n >= 0 && (t.hash = e.substr(n), e = e.substr(0, n));
    let r = e.indexOf("?");
    r >= 0 && (t.search = e.substr(r), e = e.substr(0, r)), e && (t.pathname = e);
  }
  return t;
}
function ke(e, t, n, r) {
  r === void 0 && (r = {});
  let {
    window: a = document.defaultView,
    v5Compat: o = !1
  } = r, i = a.history, l = D.Pop, s = null, u = f();
  u == null && (u = 0, i.replaceState(U({}, i.state, {
    idx: u
  }), ""));
  function f() {
    return (i.state || {
      idx: null
    }).idx;
  }
  function d() {
    l = D.Pop;
    let m = f(), N = m == null ? null : m - u;
    u = m, s && s({
      action: l,
      location: g.location,
      delta: N
    });
  }
  function h(m, N) {
    l = D.Push;
    let p = Z(g.location, m, N);
    u = f() + 1;
    let E = ce(p, u), w = g.createHref(p);
    try {
      i.pushState(E, "", w);
    } catch (O) {
      if (O instanceof DOMException && O.name === "DataCloneError")
        throw O;
      a.location.assign(w);
    }
    o && s && s({
      action: l,
      location: g.location,
      delta: 1
    });
  }
  function x(m, N) {
    l = D.Replace;
    let p = Z(g.location, m, N);
    u = f();
    let E = ce(p, u), w = g.createHref(p);
    i.replaceState(E, "", w), o && s && s({
      action: l,
      location: g.location,
      delta: 0
    });
  }
  function y(m) {
    let N = a.location.origin !== "null" ? a.location.origin : a.location.href, p = typeof m == "string" ? m : F(m);
    return p = p.replace(/ $/, "%20"), v(N, "No window.location.(origin|href) available to create URL for href: " + p), new URL(p, N);
  }
  let g = {
    get action() {
      return l;
    },
    get location() {
      return e(a, i);
    },
    listen(m) {
      if (s)
        throw new Error("A history only accepts one active listener");
      return a.addEventListener(ue, d), s = m, () => {
        a.removeEventListener(ue, d), s = null;
      };
    },
    createHref(m) {
      return t(a, m);
    },
    createURL: y,
    encodeLocation(m) {
      let N = y(m);
      return {
        pathname: N.pathname,
        search: N.search,
        hash: N.hash
      };
    },
    push: h,
    replace: x,
    go(m) {
      return i.go(m);
    }
  };
  return g;
}
var de;
(function(e) {
  e.data = "data", e.deferred = "deferred", e.redirect = "redirect", e.error = "error";
})(de || (de = {}));
function Ie(e, t, n) {
  return n === void 0 && (n = "/"), Be(e, t, n, !1);
}
function Be(e, t, n, r) {
  let a = typeof t == "string" ? T(t) : t, o = _(a.pathname || "/", n);
  if (o == null)
    return null;
  let i = Ee(e);
  We(i);
  let l = null;
  for (let s = 0; l == null && s < i.length; ++s) {
    let u = Ge(o);
    l = He(i[s], u, r);
  }
  return l;
}
function Ee(e, t, n, r) {
  t === void 0 && (t = []), n === void 0 && (n = []), r === void 0 && (r = "");
  let a = (o, i, l) => {
    let s = {
      relativePath: l === void 0 ? o.path || "" : l,
      caseSensitive: o.caseSensitive === !0,
      childrenIndex: i,
      route: o
    };
    s.relativePath.startsWith("/") && (v(s.relativePath.startsWith(r), 'Absolute route path "' + s.relativePath + '" nested under path ' + ('"' + r + '" is not valid. An absolute child route path ') + "must start with the combined path of all its parent routes."), s.relativePath = s.relativePath.slice(r.length));
    let u = P([r, s.relativePath]), f = n.concat(s);
    o.children && o.children.length > 0 && (v(
      // Our types know better, but runtime JS may not!
      // @ts-expect-error
      o.index !== !0,
      "Index routes must not have child routes. Please remove " + ('all child routes from route path "' + u + '".')
    ), Ee(o.children, t, f, u)), !(o.path == null && !o.index) && t.push({
      path: u,
      score: Je(u, o.index),
      routesMeta: f
    });
  };
  return e.forEach((o, i) => {
    var l;
    if (o.path === "" || !((l = o.path) != null && l.includes("?")))
      a(o, i);
    else
      for (let s of ye(o.path))
        a(o, i, s);
  }), t;
}
function ye(e) {
  let t = e.split("/");
  if (t.length === 0) return [];
  let [n, ...r] = t, a = n.endsWith("?"), o = n.replace(/\?$/, "");
  if (r.length === 0)
    return a ? [o, ""] : [o];
  let i = ye(r.join("/")), l = [];
  return l.push(...i.map((s) => s === "" ? o : [o, s].join("/"))), a && l.push(...i), l.map((s) => e.startsWith("/") && s === "" ? "/" : s);
}
function We(e) {
  e.sort((t, n) => t.score !== n.score ? n.score - t.score : Ye(t.routesMeta.map((r) => r.childrenIndex), n.routesMeta.map((r) => r.childrenIndex)));
}
const Ae = /^:[\w-]+$/, $e = 3, Me = 2, je = 1, ze = 10, Ke = -2, fe = (e) => e === "*";
function Je(e, t) {
  let n = e.split("/"), r = n.length;
  return n.some(fe) && (r += Ke), t && (r += Me), n.filter((a) => !fe(a)).reduce((a, o) => a + (Ae.test(o) ? $e : o === "" ? je : ze), r);
}
function Ye(e, t) {
  return e.length === t.length && e.slice(0, -1).every((r, a) => r === t[a]) ? (
    // If two routes are siblings, we should try to match the earlier sibling
    // first. This allows people to have fine-grained control over the matching
    // behavior by simply putting routes with identical paths in the order they
    // want them tried.
    e[e.length - 1] - t[t.length - 1]
  ) : (
    // Otherwise, it doesn't really make sense to rank non-siblings by index,
    // so they sort equally.
    0
  );
}
function He(e, t, n) {
  let {
    routesMeta: r
  } = e, a = {}, o = "/", i = [];
  for (let l = 0; l < r.length; ++l) {
    let s = r[l], u = l === r.length - 1, f = o === "/" ? t : t.slice(o.length) || "/", d = K({
      path: s.relativePath,
      caseSensitive: s.caseSensitive,
      end: u
    }, f), h = s.route;
    if (!d && u && n && !r[r.length - 1].route.index && (d = K({
      path: s.relativePath,
      caseSensitive: s.caseSensitive,
      end: !1
    }, f)), !d)
      return null;
    Object.assign(a, d.params), i.push({
      // TODO: Can this as be avoided?
      params: a,
      pathname: P([o, d.pathname]),
      pathnameBase: et(P([o, d.pathnameBase])),
      route: h
    }), d.pathnameBase !== "/" && (o = P([o, d.pathnameBase]));
  }
  return i;
}
function K(e, t) {
  typeof e == "string" && (e = {
    path: e,
    caseSensitive: !1,
    end: !0
  });
  let [n, r] = qe(e.path, e.caseSensitive, e.end), a = t.match(n);
  if (!a) return null;
  let o = a[0], i = o.replace(/(.)\/+$/, "$1"), l = a.slice(1);
  return {
    params: r.reduce((u, f, d) => {
      let {
        paramName: h,
        isOptional: x
      } = f;
      if (h === "*") {
        let g = l[d] || "";
        i = o.slice(0, o.length - g.length).replace(/(.)\/+$/, "$1");
      }
      const y = l[d];
      return x && !y ? u[h] = void 0 : u[h] = (y || "").replace(/%2F/g, "/"), u;
    }, {}),
    pathname: o,
    pathnameBase: i,
    pattern: e
  };
}
function qe(e, t, n) {
  t === void 0 && (t = !1), n === void 0 && (n = !0), C(e === "*" || !e.endsWith("*") || e.endsWith("/*"), 'Route path "' + e + '" will be treated as if it were ' + ('"' + e.replace(/\*$/, "/*") + '" because the `*` character must ') + "always follow a `/` in the pattern. To get rid of this warning, " + ('please change the route path to "' + e.replace(/\*$/, "/*") + '".'));
  let r = [], a = "^" + e.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^${}|()[\]]/g, "\\$&").replace(/\/:([\w-]+)(\?)?/g, (i, l, s) => (r.push({
    paramName: l,
    isOptional: s != null
  }), s ? "/?([^\\/]+)?" : "/([^\\/]+)"));
  return e.endsWith("*") ? (r.push({
    paramName: "*"
  }), a += e === "*" || e === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$") : n ? a += "\\/*$" : e !== "" && e !== "/" && (a += "(?:(?=\\/|$))"), [new RegExp(a, t ? void 0 : "i"), r];
}
function Ge(e) {
  try {
    return e.split("/").map((t) => decodeURIComponent(t).replace(/\//g, "%2F")).join("/");
  } catch (t) {
    return C(!1, 'The URL path "' + e + '" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent ' + ("encoding (" + t + ").")), e;
  }
}
function _(e, t) {
  if (t === "/") return e;
  if (!e.toLowerCase().startsWith(t.toLowerCase()))
    return null;
  let n = t.endsWith("/") ? t.length - 1 : t.length, r = e.charAt(n);
  return r && r !== "/" ? null : e.slice(n) || "/";
}
function Xe(e, t) {
  t === void 0 && (t = "/");
  let {
    pathname: n,
    search: r = "",
    hash: a = ""
  } = typeof e == "string" ? T(e) : e;
  return {
    pathname: n ? n.startsWith("/") ? n : Qe(n, t) : t,
    search: tt(r),
    hash: nt(a)
  };
}
function Qe(e, t) {
  let n = t.replace(/\/+$/, "").split("/");
  return e.split("/").forEach((a) => {
    a === ".." ? n.length > 1 && n.pop() : a !== "." && n.push(a);
  }), n.length > 1 ? n.join("/") : "/";
}
function X(e, t, n, r) {
  return "Cannot include a '" + e + "' character in a manually specified " + ("`to." + t + "` field [" + JSON.stringify(r) + "].  Please separate it out to the ") + ("`to." + n + "` field. Alternatively you may provide the full path as ") + 'a string in <Link to="..."> and the router will parse it for you.';
}
function Ze(e) {
  return e.filter((t, n) => n === 0 || t.route.path && t.route.path.length > 0);
}
function Ne(e, t) {
  let n = Ze(e);
  return t ? n.map((r, a) => a === n.length - 1 ? r.pathname : r.pathnameBase) : n.map((r) => r.pathnameBase);
}
function we(e, t, n, r) {
  r === void 0 && (r = !1);
  let a;
  typeof e == "string" ? a = T(e) : (a = U({}, e), v(!a.pathname || !a.pathname.includes("?"), X("?", "pathname", "search", a)), v(!a.pathname || !a.pathname.includes("#"), X("#", "pathname", "hash", a)), v(!a.search || !a.search.includes("#"), X("#", "search", "hash", a)));
  let o = e === "" || a.pathname === "", i = o ? "/" : a.pathname, l;
  if (i == null)
    l = n;
  else {
    let d = t.length - 1;
    if (!r && i.startsWith("..")) {
      let h = i.split("/");
      for (; h[0] === ".."; )
        h.shift(), d -= 1;
      a.pathname = h.join("/");
    }
    l = d >= 0 ? t[d] : "/";
  }
  let s = Xe(a, l), u = i && i !== "/" && i.endsWith("/"), f = (o || i === ".") && n.endsWith("/");
  return !s.pathname.endsWith("/") && (u || f) && (s.pathname += "/"), s;
}
const P = (e) => e.join("/").replace(/\/\/+/g, "/"), et = (e) => e.replace(/\/+$/, "").replace(/^\/*/, "/"), tt = (e) => !e || e === "?" ? "" : e.startsWith("?") ? e : "?" + e, nt = (e) => !e || e === "#" ? "" : e.startsWith("#") ? e : "#" + e;
function rt(e) {
  return e != null && typeof e.status == "number" && typeof e.statusText == "string" && typeof e.internal == "boolean" && "data" in e;
}
const xe = ["post", "put", "patch", "delete"];
new Set(xe);
const at = ["get", ...xe];
new Set(at);
/**
 * React Router v6.28.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
function k() {
  return k = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, k.apply(this, arguments);
}
const B = /* @__PURE__ */ c.createContext(null);
process.env.NODE_ENV !== "production" && (B.displayName = "DataRouter");
const ne = /* @__PURE__ */ c.createContext(null);
process.env.NODE_ENV !== "production" && (ne.displayName = "DataRouterState");
const ot = /* @__PURE__ */ c.createContext(null);
process.env.NODE_ENV !== "production" && (ot.displayName = "Await");
const R = /* @__PURE__ */ c.createContext(null);
process.env.NODE_ENV !== "production" && (R.displayName = "Navigation");
const W = /* @__PURE__ */ c.createContext(null);
process.env.NODE_ENV !== "production" && (W.displayName = "Location");
const S = /* @__PURE__ */ c.createContext({
  outlet: null,
  matches: [],
  isDataRoute: !1
});
process.env.NODE_ENV !== "production" && (S.displayName = "Route");
const re = /* @__PURE__ */ c.createContext(null);
process.env.NODE_ENV !== "production" && (re.displayName = "RouteError");
function it(e, t) {
  let {
    relative: n
  } = t === void 0 ? {} : t;
  A() || (process.env.NODE_ENV !== "production" ? v(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useHref() may be used only in the context of a <Router> component."
  ) : v(!1));
  let {
    basename: r,
    navigator: a
  } = c.useContext(R), {
    hash: o,
    pathname: i,
    search: l
  } = $(e, {
    relative: n
  }), s = i;
  return r !== "/" && (s = i === "/" ? r : P([r, i])), a.createHref({
    pathname: s,
    search: l,
    hash: o
  });
}
function A() {
  return c.useContext(W) != null;
}
function V() {
  return A() || (process.env.NODE_ENV !== "production" ? v(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useLocation() may be used only in the context of a <Router> component."
  ) : v(!1)), c.useContext(W).location;
}
const be = "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
function Re(e) {
  c.useContext(R).static || c.useLayoutEffect(e);
}
function ae() {
  let {
    isDataRoute: e
  } = c.useContext(S);
  return e ? wt() : lt();
}
function lt() {
  A() || (process.env.NODE_ENV !== "production" ? v(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useNavigate() may be used only in the context of a <Router> component."
  ) : v(!1));
  let e = c.useContext(B), {
    basename: t,
    future: n,
    navigator: r
  } = c.useContext(R), {
    matches: a
  } = c.useContext(S), {
    pathname: o
  } = V(), i = JSON.stringify(Ne(a, n.v7_relativeSplatPath)), l = c.useRef(!1);
  return Re(() => {
    l.current = !0;
  }), c.useCallback(function(u, f) {
    if (f === void 0 && (f = {}), process.env.NODE_ENV !== "production" && C(l.current, be), !l.current) return;
    if (typeof u == "number") {
      r.go(u);
      return;
    }
    let d = we(u, JSON.parse(i), o, f.relative === "path");
    e == null && t !== "/" && (d.pathname = d.pathname === "/" ? t : P([t, d.pathname])), (f.replace ? r.replace : r.push)(d, f.state, f);
  }, [t, r, i, o, e]);
}
function st() {
  let {
    matches: e
  } = c.useContext(S), t = e[e.length - 1];
  return t ? t.params : {};
}
function $(e, t) {
  let {
    relative: n
  } = t === void 0 ? {} : t, {
    future: r
  } = c.useContext(R), {
    matches: a
  } = c.useContext(S), {
    pathname: o
  } = V(), i = JSON.stringify(Ne(a, r.v7_relativeSplatPath));
  return c.useMemo(() => we(e, JSON.parse(i), o, n === "path"), [e, i, o, n]);
}
function ut(e, t) {
  return ct(e, t);
}
function ct(e, t, n, r) {
  A() || (process.env.NODE_ENV !== "production" ? v(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useRoutes() may be used only in the context of a <Router> component."
  ) : v(!1));
  let {
    navigator: a
  } = c.useContext(R), {
    matches: o
  } = c.useContext(S), i = o[o.length - 1], l = i ? i.params : {}, s = i ? i.pathname : "/", u = i ? i.pathnameBase : "/", f = i && i.route;
  if (process.env.NODE_ENV !== "production") {
    let p = f && f.path || "";
    Se(s, !f || p.endsWith("*"), "You rendered descendant <Routes> (or called `useRoutes()`) at " + ('"' + s + '" (under <Route path="' + p + '">) but the ') + `parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

` + ('Please change the parent <Route path="' + p + '"> to <Route ') + ('path="' + (p === "/" ? "*" : p + "/*") + '">.'));
  }
  let d = V(), h;
  if (t) {
    var x;
    let p = typeof t == "string" ? T(t) : t;
    u === "/" || (x = p.pathname) != null && x.startsWith(u) || (process.env.NODE_ENV !== "production" ? v(!1, "When overriding the location using `<Routes location>` or `useRoutes(routes, location)`, the location pathname must begin with the portion of the URL pathname that was " + ('matched by all parent routes. The current pathname base is "' + u + '" ') + ('but pathname "' + p.pathname + '" was given in the `location` prop.')) : v(!1)), h = p;
  } else
    h = d;
  let y = h.pathname || "/", g = y;
  if (u !== "/") {
    let p = u.replace(/^\//, "").split("/");
    g = "/" + y.replace(/^\//, "").split("/").slice(p.length).join("/");
  }
  let m = Ie(e, {
    pathname: g
  });
  process.env.NODE_ENV !== "production" && (process.env.NODE_ENV !== "production" && C(f || m != null, 'No routes matched location "' + h.pathname + h.search + h.hash + '" '), process.env.NODE_ENV !== "production" && C(m == null || m[m.length - 1].route.element !== void 0 || m[m.length - 1].route.Component !== void 0 || m[m.length - 1].route.lazy !== void 0, 'Matched leaf route at location "' + h.pathname + h.search + h.hash + '" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.'));
  let N = mt(m && m.map((p) => Object.assign({}, p, {
    params: Object.assign({}, l, p.params),
    pathname: P([
      u,
      // Re-encode pathnames that were decoded inside matchRoutes
      a.encodeLocation ? a.encodeLocation(p.pathname).pathname : p.pathname
    ]),
    pathnameBase: p.pathnameBase === "/" ? u : P([
      u,
      // Re-encode pathnames that were decoded inside matchRoutes
      a.encodeLocation ? a.encodeLocation(p.pathnameBase).pathname : p.pathnameBase
    ])
  })), o, n, r);
  return t && N ? /* @__PURE__ */ c.createElement(W.Provider, {
    value: {
      location: k({
        pathname: "/",
        search: "",
        hash: "",
        state: null,
        key: "default"
      }, h),
      navigationType: D.Pop
    }
  }, N) : N;
}
function dt() {
  let e = Nt(), t = rt(e) ? e.status + " " + e.statusText : e instanceof Error ? e.message : JSON.stringify(e), n = e instanceof Error ? e.stack : null, r = "rgba(200,200,200, 0.5)", a = {
    padding: "0.5rem",
    backgroundColor: r
  }, o = {
    padding: "2px 4px",
    backgroundColor: r
  }, i = null;
  return process.env.NODE_ENV !== "production" && (console.error("Error handled by React Router default ErrorBoundary:", e), i = /* @__PURE__ */ c.createElement(c.Fragment, null, /* @__PURE__ */ c.createElement("p", null, "💿 Hey developer 👋"), /* @__PURE__ */ c.createElement("p", null, "You can provide a way better UX than this when your app throws errors by providing your own ", /* @__PURE__ */ c.createElement("code", {
    style: o
  }, "ErrorBoundary"), " or", " ", /* @__PURE__ */ c.createElement("code", {
    style: o
  }, "errorElement"), " prop on your route."))), /* @__PURE__ */ c.createElement(c.Fragment, null, /* @__PURE__ */ c.createElement("h2", null, "Unexpected Application Error!"), /* @__PURE__ */ c.createElement("h3", {
    style: {
      fontStyle: "italic"
    }
  }, t), n ? /* @__PURE__ */ c.createElement("pre", {
    style: a
  }, n) : null, i);
}
const ft = /* @__PURE__ */ c.createElement(dt, null);
class pt extends c.Component {
  constructor(t) {
    super(t), this.state = {
      location: t.location,
      revalidation: t.revalidation,
      error: t.error
    };
  }
  static getDerivedStateFromError(t) {
    return {
      error: t
    };
  }
  static getDerivedStateFromProps(t, n) {
    return n.location !== t.location || n.revalidation !== "idle" && t.revalidation === "idle" ? {
      error: t.error,
      location: t.location,
      revalidation: t.revalidation
    } : {
      error: t.error !== void 0 ? t.error : n.error,
      location: n.location,
      revalidation: t.revalidation || n.revalidation
    };
  }
  componentDidCatch(t, n) {
    console.error("React Router caught the following error during render", t, n);
  }
  render() {
    return this.state.error !== void 0 ? /* @__PURE__ */ c.createElement(S.Provider, {
      value: this.props.routeContext
    }, /* @__PURE__ */ c.createElement(re.Provider, {
      value: this.state.error,
      children: this.props.component
    })) : this.props.children;
  }
}
function ht(e) {
  let {
    routeContext: t,
    match: n,
    children: r
  } = e, a = c.useContext(B);
  return a && a.static && a.staticContext && (n.route.errorElement || n.route.ErrorBoundary) && (a.staticContext._deepestRenderedBoundaryId = n.route.id), /* @__PURE__ */ c.createElement(S.Provider, {
    value: t
  }, r);
}
function mt(e, t, n, r) {
  var a;
  if (t === void 0 && (t = []), n === void 0 && (n = null), r === void 0 && (r = null), e == null) {
    var o;
    if (!n)
      return null;
    if (n.errors)
      e = n.matches;
    else if ((o = r) != null && o.v7_partialHydration && t.length === 0 && !n.initialized && n.matches.length > 0)
      e = n.matches;
    else
      return null;
  }
  let i = e, l = (a = n) == null ? void 0 : a.errors;
  if (l != null) {
    let f = i.findIndex((d) => d.route.id && (l == null ? void 0 : l[d.route.id]) !== void 0);
    f >= 0 || (process.env.NODE_ENV !== "production" ? v(!1, "Could not find a matching route for errors on route IDs: " + Object.keys(l).join(",")) : v(!1)), i = i.slice(0, Math.min(i.length, f + 1));
  }
  let s = !1, u = -1;
  if (n && r && r.v7_partialHydration)
    for (let f = 0; f < i.length; f++) {
      let d = i[f];
      if ((d.route.HydrateFallback || d.route.hydrateFallbackElement) && (u = f), d.route.id) {
        let {
          loaderData: h,
          errors: x
        } = n, y = d.route.loader && h[d.route.id] === void 0 && (!x || x[d.route.id] === void 0);
        if (d.route.lazy || y) {
          s = !0, u >= 0 ? i = i.slice(0, u + 1) : i = [i[0]];
          break;
        }
      }
    }
  return i.reduceRight((f, d, h) => {
    let x, y = !1, g = null, m = null;
    n && (x = l && d.route.id ? l[d.route.id] : void 0, g = d.route.errorElement || ft, s && (u < 0 && h === 0 ? (Se("route-fallback", !1, "No `HydrateFallback` element provided to render during initial hydration"), y = !0, m = null) : u === h && (y = !0, m = d.route.hydrateFallbackElement || null)));
    let N = t.concat(i.slice(0, h + 1)), p = () => {
      let E;
      return x ? E = g : y ? E = m : d.route.Component ? E = /* @__PURE__ */ c.createElement(d.route.Component, null) : d.route.element ? E = d.route.element : E = f, /* @__PURE__ */ c.createElement(ht, {
        match: d,
        routeContext: {
          outlet: f,
          matches: N,
          isDataRoute: n != null
        },
        children: E
      });
    };
    return n && (d.route.ErrorBoundary || d.route.errorElement || h === 0) ? /* @__PURE__ */ c.createElement(pt, {
      location: n.location,
      revalidation: n.revalidation,
      component: g,
      error: x,
      children: p(),
      routeContext: {
        outlet: null,
        matches: N,
        isDataRoute: !0
      }
    }) : p();
  }, null);
}
var Ce = /* @__PURE__ */ function(e) {
  return e.UseBlocker = "useBlocker", e.UseRevalidator = "useRevalidator", e.UseNavigateStable = "useNavigate", e;
}(Ce || {}), I = /* @__PURE__ */ function(e) {
  return e.UseBlocker = "useBlocker", e.UseLoaderData = "useLoaderData", e.UseActionData = "useActionData", e.UseRouteError = "useRouteError", e.UseNavigation = "useNavigation", e.UseRouteLoaderData = "useRouteLoaderData", e.UseMatches = "useMatches", e.UseRevalidator = "useRevalidator", e.UseNavigateStable = "useNavigate", e.UseRouteId = "useRouteId", e;
}(I || {});
function oe(e) {
  return e + " must be used within a data router.  See https://reactrouter.com/v6/routers/picking-a-router.";
}
function vt(e) {
  let t = c.useContext(B);
  return t || (process.env.NODE_ENV !== "production" ? v(!1, oe(e)) : v(!1)), t;
}
function gt(e) {
  let t = c.useContext(ne);
  return t || (process.env.NODE_ENV !== "production" ? v(!1, oe(e)) : v(!1)), t;
}
function Et(e) {
  let t = c.useContext(S);
  return t || (process.env.NODE_ENV !== "production" ? v(!1, oe(e)) : v(!1)), t;
}
function ie(e) {
  let t = Et(e), n = t.matches[t.matches.length - 1];
  return n.route.id || (process.env.NODE_ENV !== "production" ? v(!1, e + ' can only be used on routes that contain a unique "id"') : v(!1)), n.route.id;
}
function yt() {
  return ie(I.UseRouteId);
}
function Nt() {
  var e;
  let t = c.useContext(re), n = gt(I.UseRouteError), r = ie(I.UseRouteError);
  return t !== void 0 ? t : (e = n.errors) == null ? void 0 : e[r];
}
function wt() {
  let {
    router: e
  } = vt(Ce.UseNavigateStable), t = ie(I.UseNavigateStable), n = c.useRef(!1);
  return Re(() => {
    n.current = !0;
  }), c.useCallback(function(a, o) {
    o === void 0 && (o = {}), process.env.NODE_ENV !== "production" && C(n.current, be), n.current && (typeof a == "number" ? e.navigate(a) : e.navigate(a, k({
      fromRouteId: t
    }, o)));
  }, [e, t]);
}
const pe = {};
function Se(e, t, n) {
  !t && !pe[e] && (pe[e] = !0, process.env.NODE_ENV !== "production" && C(!1, n));
}
const he = {};
function xt(e, t) {
  he[t] || (he[t] = !0, console.warn(t));
}
const me = (e, t, n) => xt(e, "⚠️ React Router Future Flag Warning: " + t + ". " + ("You can use the `" + e + "` future flag to opt-in early. ") + ("For more information, see " + n + "."));
function bt(e, t) {
  e != null && e.v7_startTransition || me("v7_startTransition", "React Router will begin wrapping state updates in `React.startTransition` in v7", "https://reactrouter.com/v6/upgrading/future#v7_starttransition"), !(e != null && e.v7_relativeSplatPath) && !t && me("v7_relativeSplatPath", "Relative route resolution within Splat routes is changing in v7", "https://reactrouter.com/v6/upgrading/future#v7_relativesplatpath");
}
function ee(e) {
  process.env.NODE_ENV !== "production" ? v(!1, "A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.") : v(!1);
}
function Rt(e) {
  let {
    basename: t = "/",
    children: n = null,
    location: r,
    navigationType: a = D.Pop,
    navigator: o,
    static: i = !1,
    future: l
  } = e;
  A() && (process.env.NODE_ENV !== "production" ? v(!1, "You cannot render a <Router> inside another <Router>. You should never have more than one in your app.") : v(!1));
  let s = t.replace(/^\/*/, "/"), u = c.useMemo(() => ({
    basename: s,
    navigator: o,
    static: i,
    future: k({
      v7_relativeSplatPath: !1
    }, l)
  }), [s, l, o, i]);
  typeof r == "string" && (r = T(r));
  let {
    pathname: f = "/",
    search: d = "",
    hash: h = "",
    state: x = null,
    key: y = "default"
  } = r, g = c.useMemo(() => {
    let m = _(f, s);
    return m == null ? null : {
      location: {
        pathname: m,
        search: d,
        hash: h,
        state: x,
        key: y
      },
      navigationType: a
    };
  }, [s, f, d, h, x, y, a]);
  return process.env.NODE_ENV !== "production" && C(g != null, '<Router basename="' + s + '"> is not able to match the URL ' + ('"' + f + d + h + '" because it does not start with the ') + "basename, so the <Router> won't render anything."), g == null ? null : /* @__PURE__ */ c.createElement(R.Provider, {
    value: u
  }, /* @__PURE__ */ c.createElement(W.Provider, {
    children: n,
    value: g
  }));
}
function Ct(e) {
  let {
    children: t,
    location: n
  } = e;
  return ut(te(t), n);
}
new Promise(() => {
});
function te(e, t) {
  t === void 0 && (t = []);
  let n = [];
  return c.Children.forEach(e, (r, a) => {
    if (!/* @__PURE__ */ c.isValidElement(r))
      return;
    let o = [...t, a];
    if (r.type === c.Fragment) {
      n.push.apply(n, te(r.props.children, o));
      return;
    }
    r.type !== ee && (process.env.NODE_ENV !== "production" ? v(!1, "[" + (typeof r.type == "string" ? r.type : r.type.name) + "] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>") : v(!1)), !r.props.index || !r.props.children || (process.env.NODE_ENV !== "production" ? v(!1, "An index route cannot have child routes.") : v(!1));
    let i = {
      id: r.props.id || o.join("-"),
      caseSensitive: r.props.caseSensitive,
      element: r.props.element,
      Component: r.props.Component,
      index: r.props.index,
      path: r.props.path,
      loader: r.props.loader,
      action: r.props.action,
      errorElement: r.props.errorElement,
      ErrorBoundary: r.props.ErrorBoundary,
      hasErrorBoundary: r.props.ErrorBoundary != null || r.props.errorElement != null,
      shouldRevalidate: r.props.shouldRevalidate,
      handle: r.props.handle,
      lazy: r.props.lazy
    };
    r.props.children && (i.children = te(r.props.children, o)), n.push(i);
  }), n;
}
/**
 * React Router DOM v6.28.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
function L() {
  return L = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, L.apply(this, arguments);
}
function le(e, t) {
  if (e == null) return {};
  var n = {}, r = Object.keys(e), a, o;
  for (o = 0; o < r.length; o++)
    a = r[o], !(t.indexOf(a) >= 0) && (n[a] = e[a]);
  return n;
}
const j = "get", z = "application/x-www-form-urlencoded";
function Y(e) {
  return e != null && typeof e.tagName == "string";
}
function St(e) {
  return Y(e) && e.tagName.toLowerCase() === "button";
}
function Pt(e) {
  return Y(e) && e.tagName.toLowerCase() === "form";
}
function Ot(e) {
  return Y(e) && e.tagName.toLowerCase() === "input";
}
function Dt(e) {
  return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);
}
function _t(e, t) {
  return e.button === 0 && // Ignore everything but left clicks
  (!t || t === "_self") && // Let browser handle "target=_blank" etc.
  !Dt(e);
}
let M = null;
function Lt() {
  if (M === null)
    try {
      new FormData(
        document.createElement("form"),
        // @ts-expect-error if FormData supports the submitter parameter, this will throw
        0
      ), M = !1;
    } catch {
      M = !0;
    }
  return M;
}
const Tt = /* @__PURE__ */ new Set(["application/x-www-form-urlencoded", "multipart/form-data", "text/plain"]);
function Q(e) {
  return e != null && !Tt.has(e) ? (process.env.NODE_ENV !== "production" && C(!1, '"' + e + '" is not a valid `encType` for `<Form>`/`<fetcher.Form>` ' + ('and will default to "' + z + '"')), null) : e;
}
function Vt(e, t) {
  let n, r, a, o, i;
  if (Pt(e)) {
    let l = e.getAttribute("action");
    r = l ? _(l, t) : null, n = e.getAttribute("method") || j, a = Q(e.getAttribute("enctype")) || z, o = new FormData(e);
  } else if (St(e) || Ot(e) && (e.type === "submit" || e.type === "image")) {
    let l = e.form;
    if (l == null)
      throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');
    let s = e.getAttribute("formaction") || l.getAttribute("action");
    if (r = s ? _(s, t) : null, n = e.getAttribute("formmethod") || l.getAttribute("method") || j, a = Q(e.getAttribute("formenctype")) || Q(l.getAttribute("enctype")) || z, o = new FormData(l, e), !Lt()) {
      let {
        name: u,
        type: f,
        value: d
      } = e;
      if (f === "image") {
        let h = u ? u + "." : "";
        o.append(h + "x", "0"), o.append(h + "y", "0");
      } else u && o.append(u, d);
    }
  } else {
    if (Y(e))
      throw new Error('Cannot submit element that is not <form>, <button>, or <input type="submit|image">');
    n = j, r = null, a = z, i = e;
  }
  return o && a === "text/plain" && (i = o, o = void 0), {
    action: r,
    method: n.toLowerCase(),
    encType: a,
    formData: o,
    body: i
  };
}
const Ut = ["onClick", "relative", "reloadDocument", "replace", "state", "target", "to", "preventScrollReset", "viewTransition"], Ft = ["aria-current", "caseSensitive", "className", "end", "style", "to", "viewTransition", "children"], kt = ["fetcherKey", "navigate", "reloadDocument", "replace", "state", "method", "action", "onSubmit", "relative", "preventScrollReset", "viewTransition"], It = "6";
try {
  window.__reactRouterVersion = It;
} catch {
}
const Pe = /* @__PURE__ */ c.createContext({
  isTransitioning: !1
});
process.env.NODE_ENV !== "production" && (Pe.displayName = "ViewTransition");
const Bt = /* @__PURE__ */ c.createContext(/* @__PURE__ */ new Map());
process.env.NODE_ENV !== "production" && (Bt.displayName = "Fetchers");
const Wt = "startTransition", ve = c[Wt];
function At(e) {
  let {
    basename: t,
    children: n,
    future: r,
    window: a
  } = e, o = c.useRef();
  o.current == null && (o.current = Ue({
    window: a,
    v5Compat: !0
  }));
  let i = o.current, [l, s] = c.useState({
    action: i.action,
    location: i.location
  }), {
    v7_startTransition: u
  } = r || {}, f = c.useCallback((d) => {
    u && ve ? ve(() => s(d)) : s(d);
  }, [s, u]);
  return c.useLayoutEffect(() => i.listen(f), [i, f]), c.useEffect(() => bt(r), [r]), /* @__PURE__ */ c.createElement(Rt, {
    basename: t,
    children: n,
    location: l.location,
    navigationType: l.action,
    navigator: i,
    future: r
  });
}
process.env.NODE_ENV;
const $t = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", Mt = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, Oe = /* @__PURE__ */ c.forwardRef(function(t, n) {
  let {
    onClick: r,
    relative: a,
    reloadDocument: o,
    replace: i,
    state: l,
    target: s,
    to: u,
    preventScrollReset: f,
    viewTransition: d
  } = t, h = le(t, Ut), {
    basename: x
  } = c.useContext(R), y, g = !1;
  if (typeof u == "string" && Mt.test(u) && (y = u, $t))
    try {
      let E = new URL(window.location.href), w = u.startsWith("//") ? new URL(E.protocol + u) : new URL(u), O = _(w.pathname, x);
      w.origin === E.origin && O != null ? u = O + w.search + w.hash : g = !0;
    } catch {
      process.env.NODE_ENV !== "production" && C(!1, '<Link to="' + u + '"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.');
    }
  let m = it(u, {
    relative: a
  }), N = Jt(u, {
    replace: i,
    state: l,
    target: s,
    preventScrollReset: f,
    relative: a,
    viewTransition: d
  });
  function p(E) {
    r && r(E), E.defaultPrevented || N(E);
  }
  return (
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    /* @__PURE__ */ c.createElement("a", L({}, h, {
      href: y || m,
      onClick: g || o ? r : p,
      ref: n,
      target: s
    }))
  );
});
process.env.NODE_ENV !== "production" && (Oe.displayName = "Link");
const jt = /* @__PURE__ */ c.forwardRef(function(t, n) {
  let {
    "aria-current": r = "page",
    caseSensitive: a = !1,
    className: o = "",
    end: i = !1,
    style: l,
    to: s,
    viewTransition: u,
    children: f
  } = t, d = le(t, Ft), h = $(s, {
    relative: d.relative
  }), x = V(), y = c.useContext(ne), {
    navigator: g,
    basename: m
  } = c.useContext(R), N = y != null && // Conditional usage is OK here because the usage of a data router is static
  // eslint-disable-next-line react-hooks/rules-of-hooks
  Qt(h) && u === !0, p = g.encodeLocation ? g.encodeLocation(h).pathname : h.pathname, E = x.pathname, w = y && y.navigation && y.navigation.location ? y.navigation.location.pathname : null;
  a || (E = E.toLowerCase(), w = w ? w.toLowerCase() : null, p = p.toLowerCase()), w && m && (w = _(w, m) || w);
  const O = p !== "/" && p.endsWith("/") ? p.length - 1 : p.length;
  let H = E === p || !i && E.startsWith(p) && E.charAt(O) === "/", se = w != null && (w === p || !i && w.startsWith(p) && w.charAt(p.length) === "/"), q = {
    isActive: H,
    isPending: se,
    isTransitioning: N
  }, _e = H ? r : void 0, G;
  typeof o == "function" ? G = o(q) : G = [o, H ? "active" : null, se ? "pending" : null, N ? "transitioning" : null].filter(Boolean).join(" ");
  let Le = typeof l == "function" ? l(q) : l;
  return /* @__PURE__ */ c.createElement(Oe, L({}, d, {
    "aria-current": _e,
    className: G,
    ref: n,
    style: Le,
    to: s,
    viewTransition: u
  }), typeof f == "function" ? f(q) : f);
});
process.env.NODE_ENV !== "production" && (jt.displayName = "NavLink");
const zt = /* @__PURE__ */ c.forwardRef((e, t) => {
  let {
    fetcherKey: n,
    navigate: r,
    reloadDocument: a,
    replace: o,
    state: i,
    method: l = j,
    action: s,
    onSubmit: u,
    relative: f,
    preventScrollReset: d,
    viewTransition: h
  } = e, x = le(e, kt), y = Gt(), g = Xt(s, {
    relative: f
  }), m = l.toLowerCase() === "get" ? "get" : "post", N = (p) => {
    if (u && u(p), p.defaultPrevented) return;
    p.preventDefault();
    let E = p.nativeEvent.submitter, w = (E == null ? void 0 : E.getAttribute("formmethod")) || l;
    y(E || p.currentTarget, {
      fetcherKey: n,
      method: w,
      navigate: r,
      replace: o,
      state: i,
      relative: f,
      preventScrollReset: d,
      viewTransition: h
    });
  };
  return /* @__PURE__ */ c.createElement("form", L({
    ref: t,
    method: m,
    action: g,
    onSubmit: a ? u : N
  }, x));
});
process.env.NODE_ENV !== "production" && (zt.displayName = "Form");
process.env.NODE_ENV;
var J;
(function(e) {
  e.UseScrollRestoration = "useScrollRestoration", e.UseSubmit = "useSubmit", e.UseSubmitFetcher = "useSubmitFetcher", e.UseFetcher = "useFetcher", e.useViewTransitionState = "useViewTransitionState";
})(J || (J = {}));
var ge;
(function(e) {
  e.UseFetcher = "useFetcher", e.UseFetchers = "useFetchers", e.UseScrollRestoration = "useScrollRestoration";
})(ge || (ge = {}));
function Kt(e) {
  return e + " must be used within a data router.  See https://reactrouter.com/v6/routers/picking-a-router.";
}
function De(e) {
  let t = c.useContext(B);
  return t || (process.env.NODE_ENV !== "production" ? v(!1, Kt(e)) : v(!1)), t;
}
function Jt(e, t) {
  let {
    target: n,
    replace: r,
    state: a,
    preventScrollReset: o,
    relative: i,
    viewTransition: l
  } = t === void 0 ? {} : t, s = ae(), u = V(), f = $(e, {
    relative: i
  });
  return c.useCallback((d) => {
    if (_t(d, n)) {
      d.preventDefault();
      let h = r !== void 0 ? r : F(u) === F(f);
      s(e, {
        replace: h,
        state: a,
        preventScrollReset: o,
        relative: i,
        viewTransition: l
      });
    }
  }, [u, s, f, r, a, n, e, o, i, l]);
}
function Yt() {
  if (typeof document > "u")
    throw new Error("You are calling submit during the server render. Try calling submit within a `useEffect` or callback instead.");
}
let Ht = 0, qt = () => "__" + String(++Ht) + "__";
function Gt() {
  let {
    router: e
  } = De(J.UseSubmit), {
    basename: t
  } = c.useContext(R), n = yt();
  return c.useCallback(function(r, a) {
    a === void 0 && (a = {}), Yt();
    let {
      action: o,
      method: i,
      encType: l,
      formData: s,
      body: u
    } = Vt(r, t);
    if (a.navigate === !1) {
      let f = a.fetcherKey || qt();
      e.fetch(f, n, a.action || o, {
        preventScrollReset: a.preventScrollReset,
        formData: s,
        body: u,
        formMethod: a.method || i,
        formEncType: a.encType || l,
        flushSync: a.flushSync
      });
    } else
      e.navigate(a.action || o, {
        preventScrollReset: a.preventScrollReset,
        formData: s,
        body: u,
        formMethod: a.method || i,
        formEncType: a.encType || l,
        replace: a.replace,
        state: a.state,
        fromRouteId: n,
        flushSync: a.flushSync,
        viewTransition: a.viewTransition
      });
  }, [e, t, n]);
}
function Xt(e, t) {
  let {
    relative: n
  } = t === void 0 ? {} : t, {
    basename: r
  } = c.useContext(R), a = c.useContext(S);
  a || (process.env.NODE_ENV !== "production" ? v(!1, "useFormAction must be used inside a RouteContext") : v(!1));
  let [o] = a.matches.slice(-1), i = L({}, $(e || ".", {
    relative: n
  })), l = V();
  if (e == null) {
    i.search = l.search;
    let s = new URLSearchParams(i.search), u = s.getAll("index");
    if (u.some((d) => d === "")) {
      s.delete("index"), u.filter((h) => h).forEach((h) => s.append("index", h));
      let d = s.toString();
      i.search = d ? "?" + d : "";
    }
  }
  return (!e || e === ".") && o.route.index && (i.search = i.search ? i.search.replace(/^\?/, "?index&") : "?index"), r !== "/" && (i.pathname = i.pathname === "/" ? r : P([r, i.pathname])), F(i);
}
function Qt(e, t) {
  t === void 0 && (t = {});
  let n = c.useContext(Pe);
  n == null && (process.env.NODE_ENV !== "production" ? v(!1, "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?") : v(!1));
  let {
    basename: r
  } = De(J.useViewTransitionState), a = $(e, {
    relative: t.relative
  });
  if (!n.isTransitioning)
    return !1;
  let o = _(n.currentLocation.pathname, r) || n.currentLocation.pathname, i = _(n.nextLocation.pathname, r) || n.nextLocation.pathname;
  return K(a.pathname, i) != null || K(a.pathname, o) != null;
}
const Zt = ({ to: e, children: t, className: n, target: r }) => {
  const a = ae(), o = (i) => {
    i.preventDefault(), a(e);
  };
  return (
    // Use a button or div for navigation, styled as a link if needed
    /* @__PURE__ */ b.createElement(
      "button",
      {
        onClick: o,
        className: n,
        style: { all: "unset", cursor: "pointer" }
      },
      t
    )
  );
}, en = () => /* @__PURE__ */ b.createElement("div", { className: "not-found-container" }, /* @__PURE__ */ b.createElement("div", { className: "not-found-content" }, /* @__PURE__ */ b.createElement("h1", { className: "not-found-title" }, "404"), /* @__PURE__ */ b.createElement("p", { className: "not-found-message" }, "Oops! The page you're looking for doesn't exist."), /* @__PURE__ */ b.createElement("p", { className: "not-found-submessage" }, "But don't worry, you can always go back to the homepage."), /* @__PURE__ */ b.createElement(Zt, { to: "/", className: "back-home-button" }, "Go to Homepage"))), tn = ({
  path: e,
  component: t,
  user: n,
  routes: r
}) => {
  const a = ae(), o = r[e];
  if (o) {
    if (o.type === "public")
      return /* @__PURE__ */ b.createElement(t, null);
    if (o.type === "private")
      return n && new Function("user", `return ${o.credentials}`)(n) ? /* @__PURE__ */ b.createElement(t, null) : (a(o.redirectTo), null);
  }
  return /* @__PURE__ */ b.createElement(t, null);
}, an = ({
  loadingFallback: e = /* @__PURE__ */ b.createElement("div", null, "Loading..."),
  user: t,
  pagesConfig: n,
  middlewere: r,
  // Custom middleware passed as prop
  pages: a
}) => {
  const o = (l) => {
    const s = l.replace("./pages", "").replace(/\/page\.(js|jsx|ts|tsx)$/, "").replace(/\[([^\]]+)\]/g, ":$1");
    return s === "" ? "/" : s;
  }, i = Object.keys(a).map((l) => {
    const s = Te(() => a[l]().then((u) => ({ default: u.default })));
    return {
      path: o(l),
      component: s
    };
  });
  return console.log(i), /* @__PURE__ */ b.createElement(At, null, /* @__PURE__ */ b.createElement(Ve, { fallback: e }, /* @__PURE__ */ b.createElement(Ct, null, i.map(({ path: l, component: s }) => {
    const u = r || tn;
    return /* @__PURE__ */ b.createElement(
      ee,
      {
        key: l,
        path: l,
        element: /* @__PURE__ */ b.createElement(
          u,
          {
            path: l,
            component: s,
            user: t,
            routes: n
          }
        )
      }
    );
  }), /* @__PURE__ */ b.createElement(ee, { path: "*", element: /* @__PURE__ */ b.createElement(en, null) }))));
}, on = () => st();
export {
  an as DynamicRouter,
  Zt as Link,
  en as NotFound,
  on as useDynamicParams
};
//# sourceMappingURL=index.es.js.map
