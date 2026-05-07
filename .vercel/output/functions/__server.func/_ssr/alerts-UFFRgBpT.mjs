import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useStore } from "./store-DdP1yNhv.mjs";
import { k as ArrowLeft, P as Package, l as Ban, m as TriangleAlert, n as CircleAlert, o as Clock, h as Pencil } from "../_libs/lucide-react.mjs";
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
function AlertsPage() {
  const products = useStore((s) => s.products);
  const alerts = reactExports.useMemo(() => {
    const now = /* @__PURE__ */ new Date();
    const soon = /* @__PURE__ */ new Date();
    soon.setDate(now.getDate() + 14);
    return {
      expired: products.filter((p) => p.exp && new Date(p.exp) < now),
      outOfStock: products.filter((p) => p.stock === 0),
      lowStock: products.filter((p) => p.stock > 0 && p.stock <= p.reorder),
      expiringSoon: products.filter((p) => {
        if (!p.exp) return false;
        const expDate = new Date(p.exp);
        return expDate >= now && expDate <= soon;
      })
    };
  }, [products]);
  const totalCount = alerts.expired.length + alerts.outOfStock.length + alerts.lowStock.length + alerts.expiringSoon.length;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full overflow-y-auto bg-canvas", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-250 px-4 py-6 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "mb-4 inline-flex items-center gap-1.5 text-[12px] font-semibold text-ink-soft hover:text-brand", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-3.5 w-3.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Back to Dashboard" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-[28px] font-bold tracking-tight text-ink", children: "System Alerts" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-[14px] text-ink-soft", children: [
          "Showing ",
          totalCount,
          " items that require attention."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/inventory", className: "inline-flex items-center gap-2 rounded-xl bg-brand px-5 py-2.5 text-[14px] font-bold text-white shadow-sm transition-all hover:bg-brand-deep", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "h-4 w-4" }),
        " Manage Inventory"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8 pb-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(AlertSection, { title: "Expired Products", description: "These items have passed their expiry date and must be removed from stock immediately.", items: alerts.expired, type: "danger", icon: Ban }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AlertSection, { title: "Out of Stock", description: "These products are currently unavailable for sale. Consider reordering soon.", items: alerts.outOfStock, type: "danger", icon: TriangleAlert }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AlertSection, { title: "Low Stock", description: "Inventory levels are below the reorder point. Check if a new order is needed.", items: alerts.lowStock, type: "warn", icon: CircleAlert }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AlertSection, { title: "Expiring Soon", description: "Products reaching their expiration date within the next 14 days.", items: alerts.expiringSoon, type: "warn", icon: Clock }),
      totalCount === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center rounded-3xl border border-hairline bg-surface py-20 text-center shadow-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-success-soft text-success", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-8 w-8" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-[20px] font-bold text-ink", children: "Everything looks good!" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-[14px] text-ink-soft", children: "No active alerts at the moment." })
      ] })
    ] })
  ] }) });
}
function AlertSection({
  title,
  description,
  items,
  type,
  icon: Icon
}) {
  if (items.length === 0) return null;
  const colorCls = type === "danger" ? "text-danger" : "text-warn";
  const bgCls = type === "danger" ? "bg-danger-soft/30" : "bg-warn-soft/30";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `flex h-10 w-10 items-center justify-center rounded-xl ${bgCls} ${colorCls}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-5 w-5" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-[18px] font-bold text-ink", children: title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[12.5px] text-ink-soft", children: description })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3", children: items.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group relative flex flex-col rounded-2xl border border-hairline bg-surface p-4 shadow-card transition-all hover:border-brand/30 hover:shadow-pop", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-12 w-12 items-center justify-center rounded-xl bg-surface-2 text-[24px]", children: p.emoji }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-[11px] font-medium text-ink-faint", children: p.sku }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `mt-1 text-[13px] font-bold ${colorCls}`, children: title === "Expired" || title === "Expiring Soon" ? p.exp : `${p.stock} ${p.unit}` })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-[14px] font-bold text-ink transition-colors group-hover:text-brand", children: p.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-0.5 text-[11.5px] text-ink-faint", children: [
          p.cat,
          " · ₹",
          p.price
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 flex gap-2 border-t border-hairline pt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/inventory", className: "flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-surface-2 py-2 text-[12px] font-semibold text-ink-soft transition-colors hover:bg-brand-mist hover:text-brand", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-3 w-3" }),
        " Edit"
      ] }) })
    ] }, p.id)) })
  ] });
}
export {
  AlertsPage as component
};
