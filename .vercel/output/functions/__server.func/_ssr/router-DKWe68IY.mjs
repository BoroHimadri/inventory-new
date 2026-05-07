import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { c as createRouter, u as useRouter, a as createRootRoute, b as createFileRoute, l as lazyRouteComponent, H as HeadContent, S as Scripts, L as Link, d as useRouterState, O as Outlet } from "../_libs/tanstack__react-router.mjs";
import { X, L as LayoutDashboard, S as ShoppingBag, P as Package, C as ChartColumn, B as Bell, U as Users, M as Menu, a as Search } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
const appCss = "/assets/styles-CMrxbKgG.css";
const NAV = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/pos", label: "Point of Sale", icon: ShoppingBag },
  { to: "/inventory", label: "Inventory", icon: Package },
  { to: "/reports", label: "Reports", icon: ChartColumn },
  { to: "/alerts", label: "Alerts", icon: Bell },
  { to: "/customers", label: "Customers", icon: Users }
];
const META = {
  "/": { title: "Dashboard", sub: "Today's overview at a glance" },
  "/pos": { title: "Point of Sale", sub: "Complete sales" },
  "/inventory": { title: "Inventory", sub: "Manage products and stock levels" },
  "/reports": { title: "Reports", sub: "Sales analytics and trends" },
  "/alerts": {
    title: "System Alerts",
    sub: "Critical items requiring attention"
  },
  "/customers": {
    title: "Customers",
    sub: "View customer details and history"
  }
};
function AppLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [time, setTime] = reactExports.useState("");
  const [navOpen, setNavOpen] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const tick = () => setTime(
      (/* @__PURE__ */ new Date()).toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit"
      })
    );
    tick();
    const id = setInterval(tick, 3e4);
    return () => clearInterval(id);
  }, []);
  reactExports.useEffect(() => {
    setNavOpen(false);
  }, [pathname]);
  const today = (/* @__PURE__ */ new Date()).toLocaleDateString("en-GB", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric"
  });
  const todayShort = (/* @__PURE__ */ new Date()).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short"
  });
  const meta = META[pathname] ?? { title: "Ira", sub: "" };
  const SidebarBody = /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-17 items-center justify-between gap-3 border-b border-hairline px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-9 w-9 items-center justify-center text-white ", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/ira_logo.png" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "leading-tight", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-[15px] font-bold tracking-tight text-ink", children: "Ira" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => setNavOpen(false),
          className: "flex h-8 w-8 items-center justify-center rounded-md text-ink-soft hover:bg-surface lg:hidden",
          "aria-label": "Close menu",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4", strokeWidth: 2 })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "flex-1 overflow-y-auto px-3 py-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-faint", children: "Workspace" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-0.5", children: NAV.map((item) => {
        const active = pathname === item.to;
        const Icon = item.icon;
        return /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: item.to,
            className: [
              "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13.5px] font-medium transition-all",
              active ? "bg-surface text-ink shadow-card" : "text-ink-soft hover:bg-surface hover:text-ink"
            ].join(" "),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Icon,
                {
                  className: [
                    "h-4.25 w-4.25 transition-colors",
                    active ? "text-brand" : "text-ink-faint group-hover:text-ink-soft"
                  ].join(" "),
                  strokeWidth: 1.8
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tracking-tight", children: item.label })
            ]
          }
        ) }, item.to);
      }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-hairline p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 rounded-lg bg-surface px-3 py-2.5 shadow-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-9 w-9 items-center justify-center rounded-full bg-linear-to-br from-brand to-brand-deep text-[12px] font-semibold text-white", children: "SM" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[12.5px] font-semibold text-ink", children: "Store Manager" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10.5px] text-ink-faint", children: "Cashier · Shift 01" })
      ] })
    ] }) })
  ] });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-screen w-full overflow-hidden bg-canvas text-ink", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("aside", { className: "hidden w-62 shrink-0 flex-col border-r border-hairline bg-surface-2 lg:flex", children: SidebarBody }),
    navOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          onClick: () => setNavOpen(false),
          className: "fixed inset-0 z-40 bg-ink/40 backdrop-blur-sm lg:hidden",
          "aria-hidden": true
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("aside", { className: "fixed inset-y-0 left-0 z-50 flex w-70 max-w-[85vw] flex-col border-r border-hairline bg-surface-2 shadow-pop lg:hidden", children: SidebarBody })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "flex min-w-0 flex-1 flex-col overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex h-16 shrink-0 items-center gap-2 border-b border-hairline bg-surface px-4 sm:gap-3 sm:px-6 lg:h-17 lg:px-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => setNavOpen(true),
            className: "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-hairline bg-surface text-ink-soft transition-colors hover:text-ink lg:hidden",
            "aria-label": "Open menu",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "h-4 w-4", strokeWidth: 2 })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "truncate font-display text-[17px] font-bold leading-tight text-ink sm:text-[20px]", children: meta.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "hidden truncate text-[12px] text-ink-soft sm:block", children: meta.sub })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative hidden xl:block", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Search,
            {
              className: "pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-ink-faint",
              strokeWidth: 2
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              placeholder: "Quick search…",
              className: "w-64 rounded-lg border border-hairline bg-surface-2 py-2 pl-8 pr-3 text-[12.5px] text-ink placeholder:text-ink-faint focus:border-brand focus:bg-surface focus:outline-none focus:ring-2 focus:ring-brand/15"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            className: "hidden h-9 w-9 items-center justify-center rounded-lg border border-hairline bg-surface text-ink-soft transition-colors hover:text-ink sm:flex xl:hidden",
            "aria-label": "Search",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-4 w-4", strokeWidth: 1.8 })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "relative flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-hairline bg-surface text-ink-soft transition-colors hover:text-ink", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "h-4 w-4", strokeWidth: 1.8 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand px-1 text-[9px] font-bold text-white", children: "3" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden flex-col items-end leading-tight lg:flex", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[12px] font-semibold text-ink", children: today }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-[11px] text-ink-faint", children: time || "--:--" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden flex-col items-end leading-tight sm:flex lg:hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11.5px] font-semibold text-ink", children: todayShort }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-[10.5px] text-ink-faint", children: time || "--:--" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-hidden bg-canvas", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) })
    ] })
  ] });
}
let push = () => {
};
function toast(msg) {
  push(msg);
}
function ToastHost() {
  const [msg, setMsg] = reactExports.useState(null);
  reactExports.useEffect(() => {
    push = (m) => {
      setMsg(m);
      setTimeout(() => setMsg(null), 2400);
    };
    return () => {
      push = () => {
      };
    };
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: [
        "pointer-events-none fixed bottom-8 left-1/2 z-50 -translate-x-1/2 transition-all duration-300",
        msg ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      ].join(" "),
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-full bg-ink px-6 py-2.5 text-[13px] font-medium tracking-tight text-white shadow-pop", children: msg })
    }
  );
}
function NotFoundComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-canvas px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-semibold uppercase tracking-[0.24em] text-brand", children: "Ira" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-3 font-display text-7xl text-ink", children: "404" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-2 font-display text-xl text-ink", children: "Page not found" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm text-ink-soft", children: "The page you're looking for doesn't exist or has been moved." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/",
        className: "inline-flex items-center justify-center rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-deep",
        children: "Return home"
      }
    ) })
  ] }) });
}
const Route$7 = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Ira — Point of Sale & Inventory" },
      {
        name: "description",
        content: "Ira POS, inventory and analytics — an editorial point-of-sale workspace."
      },
      { property: "og:title", content: "Ira — Point of Sale & Inventory" },
      { name: "twitter:title", content: "Ira — Point of Sale & Inventory" },
      { name: "description", content: "Inventory with POS ." },
      { property: "og:description", content: "Inventory with POS ." },
      { name: "twitter:description", content: "Inventory with POS ." },
      {
        name: "twitter:card",
        content: "summary_large_image"
      },
      { property: "og:type", content: "website" }
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous"
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap"
      }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("head", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AppLayout, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ToastHost, {})
  ] });
}
const $$splitComponentImporter$6 = () => import("./suppliers-BmcgP77u.mjs");
const Route$6 = createFileRoute("/suppliers")({
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./reports-BrrT9Zmd.mjs");
const Route$5 = createFileRoute("/reports")({
  head: () => ({
    meta: [{
      title: "Reports — Ira"
    }, {
      name: "description",
      content: "Daily revenue, top sellers and recent transactions."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./pos-DYheZZit.mjs");
const Route$4 = createFileRoute("/pos")({
  head: () => ({
    meta: [{
      title: "Point of Sale — Ira"
    }, {
      name: "description",
      content: "Run the till: browse products, build a sale, accept payment."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./inventory-BWUSdTzF.mjs");
const Route$3 = createFileRoute("/inventory")({
  head: () => ({
    meta: [{
      title: "Inventory — Ira"
    }, {
      name: "description",
      content: "Track stock levels, costs and reorder points."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./customers-B2HtfcRo.mjs");
const Route$2 = createFileRoute("/customers")({
  head: () => ({
    meta: [{
      title: "Customers — Ira"
    }, {
      name: "description",
      content: "View customer details and their purchase history."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./alerts-UFFRgBpT.mjs");
const Route$1 = createFileRoute("/alerts")({
  head: () => ({
    meta: [{
      title: "System Alerts — Ira"
    }, {
      name: "description",
      content: "Detailed view of all inventory alerts: low stock, expired, and more."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./index-DmrG7y0V.mjs");
const Route = createFileRoute("/")({
  head: () => ({
    meta: [{
      title: "Dashboard — Ira"
    }, {
      name: "description",
      content: "Today's sales, inventory health and recent activity at a glance."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const SuppliersRoute = Route$6.update({
  id: "/suppliers",
  path: "/suppliers",
  getParentRoute: () => Route$7
});
const ReportsRoute = Route$5.update({
  id: "/reports",
  path: "/reports",
  getParentRoute: () => Route$7
});
const PosRoute = Route$4.update({
  id: "/pos",
  path: "/pos",
  getParentRoute: () => Route$7
});
const InventoryRoute = Route$3.update({
  id: "/inventory",
  path: "/inventory",
  getParentRoute: () => Route$7
});
const CustomersRoute = Route$2.update({
  id: "/customers",
  path: "/customers",
  getParentRoute: () => Route$7
});
const AlertsRoute = Route$1.update({
  id: "/alerts",
  path: "/alerts",
  getParentRoute: () => Route$7
});
const IndexRoute = Route.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$7
});
const rootRouteChildren = {
  IndexRoute,
  AlertsRoute,
  CustomersRoute,
  InventoryRoute,
  PosRoute,
  ReportsRoute,
  SuppliersRoute
};
const routeTree = Route$7._addFileChildren(rootRouteChildren)._addFileTypes();
function DefaultErrorComponent({ error, reset }) {
  const router2 = useRouter();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        className: "h-8 w-8 text-destructive",
        fill: "none",
        viewBox: "0 0 24 24",
        stroke: "currentColor",
        strokeWidth: 2,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "path",
          {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
          }
        )
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold tracking-tight text-foreground", children: "Something went wrong" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "An unexpected error occurred. Please try again." }),
    false,
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex items-center justify-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => {
            router2.invalidate();
            reset();
          },
          className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
          children: "Try again"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: "/",
          className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
          children: "Go home"
        }
      )
    ] })
  ] }) });
}
const getRouter = () => {
  const router2 = createRouter({
    routeTree,
    context: {},
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    defaultErrorComponent: DefaultErrorComponent
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  router as r,
  toast as t
};
