import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useStore } from "./store-DdP1yNhv.mjs";
import { W as Wallet, R as Receipt, p as Boxes, m as TriangleAlert, S as ShoppingBag, P as Package, B as Bell, U as Users, T as TrendingUp, q as ArrowUpRight, l as Ban, n as CircleAlert, r as TrendingDown } from "../_libs/lucide-react.mjs";
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
function DashboardPage() {
  const products = useStore((s) => s.products);
  const transactions = useStore((s) => s.transactions);
  const todayRevenue = reactExports.useMemo(() => transactions.reduce((s, t) => s + t.amount, 0), [transactions]);
  const txnCount = transactions.length;
  const itemsSold = reactExports.useMemo(() => transactions.reduce((s, t) => s + t.items, 0), [transactions]);
  const lowStock = reactExports.useMemo(() => products.filter((p) => p.stock > 0 && p.stock <= p.reorder), [products]);
  const outOfStock = reactExports.useMemo(() => products.filter((p) => p.stock === 0), [products]);
  const {
    expired,
    expiringSoon
  } = reactExports.useMemo(() => {
    const now = /* @__PURE__ */ new Date();
    const soon = /* @__PURE__ */ new Date();
    soon.setDate(now.getDate() + 14);
    return {
      expired: products.filter((p) => p.exp && new Date(p.exp) < now),
      expiringSoon: products.filter((p) => {
        if (!p.exp) return false;
        const expDate = new Date(p.exp);
        return expDate >= now && expDate <= soon;
      })
    };
  }, [products]);
  const inventoryValue = reactExports.useMemo(() => products.reduce((s, p) => s + p.stock * p.cost, 0), [products]);
  const totalAlerts = lowStock.length + outOfStock.length + expired.length + expiringSoon.length;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full overflow-y-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex max-w-350 flex-col gap-6 px-8 py-7", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Kpi, { icon: Wallet, label: "Today's Revenue", value: `₹${todayRevenue.toLocaleString("en-IN")}`, delta: "+12.5%", trend: "up", tint: "brand" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Kpi, { icon: Receipt, label: "Transactions", value: String(txnCount), delta: `Avg ₹${(todayRevenue / Math.max(txnCount, 1)).toFixed(0)}`, trend: "flat" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Kpi, { icon: Boxes, label: "Inventory Value", value: `₹${(inventoryValue / 1e3).toFixed(1)}K`, delta: "+8.2%", trend: "up" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Kpi, { icon: TriangleAlert, label: "System Alerts", value: String(totalAlerts), delta: `${outOfStock.length + expired.length} critical`, trend: totalAlerts > 0 ? "down" : "up", tint: totalAlerts > 0 ? "warn" : "brand", to: "/alerts" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ActionCard, { to: "/pos", icon: ShoppingBag, title: "Open Point of Sale", sub: "Start a new sale" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ActionCard, { to: "/inventory", icon: Package, title: "Manage Inventory", sub: `${products.length} active products` }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ActionCard, { to: "/alerts", icon: Bell, title: "System Alerts", sub: `${totalAlerts} items need attention` })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-4 lg:grid-cols-[1fr_400px]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { title: "Recent Transactions", action: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/reports", className: "text-[12px] font-semibold text-brand hover:text-brand-deep", children: "View all →" }), children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-hairline", children: transactions.slice(0, 6).map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 px-6 py-3.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-full bg-brand-mist text-[12px] font-bold text-brand-deep", children: t.cust.split(" ").map((s) => s[0]).slice(0, 2).join("") }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[13px] font-semibold text-ink", children: t.cust }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[11.5px] text-ink-faint", children: [
            t.inv,
            " · ",
            t.items,
            " items · ",
            t.pay
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-display text-[14px] font-bold text-ink", children: [
            "₹",
            t.amount.toLocaleString("en-IN")
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-[10.5px] text-ink-faint", children: t.time })
        ] })
      ] }, t.inv)) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { title: "Attention Required", action: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/alerts", className: "text-[12px] font-semibold text-brand hover:text-brand-deep", children: "View all →" }), children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-hairline", children: totalAlerts === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-6 py-10 text-center text-[12.5px] text-ink-faint", children: "All systems healthy ✓" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertGroup, { items: expired, label: "Expired", type: "danger", subLabel: "Needs immediate removal" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertGroup, { items: outOfStock, label: "Out of Stock", type: "danger", subLabel: "Cannot be sold" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertGroup, { items: lowStock, label: "Low Stock", type: "warn", subLabel: "Reorder suggested" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertGroup, { items: expiringSoon, label: "Expiring Soon", type: "warn", subLabel: "Within 14 days" })
      ] }) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { title: "Customer Insights", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 divide-y divide-hairline sm:grid-cols-3 sm:divide-x sm:divide-y-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { icon: Users, label: "Today's customers", value: String(txnCount) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { icon: ShoppingBag, label: "Items sold", value: String(itemsSold) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { icon: TrendingUp, label: "Avg basket size", value: `${(itemsSold / Math.max(txnCount, 1)).toFixed(1)} items` })
    ] }) })
  ] }) });
}
function AlertGroup({
  items,
  label,
  subLabel,
  type
}) {
  if (items.length === 0) return null;
  const Icon = type === "danger" ? Ban : CircleAlert;
  const colorCls = type === "danger" ? "text-danger" : "text-warn";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 px-6 py-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `h-3.5 w-3.5 ${colorCls}`, strokeWidth: 2.5 }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `text-[11px] font-bold uppercase tracking-wider ${colorCls}`, children: [
        label,
        " (",
        items.length,
        ")"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-ink-faint", children: [
        "— ",
        subLabel
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1 px-4 pb-2", children: [
      items.slice(0, 3).map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 rounded-xl px-3 py-2 transition-colors hover:bg-surface-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[16px]", children: p.emoji }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "truncate text-[12.5px] font-medium text-ink", children: p.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10.5px] text-ink-faint", children: label === "Expired" || label === "Expiring Soon" ? `Exp: ${p.exp}` : `${p.stock} units in stock` })
        ] })
      ] }, p.id)),
      items.length > 3 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-3 pt-1 text-[10.5px] font-medium text-ink-faint italic", children: [
        "+ ",
        items.length - 3,
        " more items..."
      ] })
    ] })
  ] });
}
function Kpi({
  icon: Icon,
  label,
  value,
  delta,
  trend,
  tint,
  to
}) {
  const tintCls = tint === "brand" ? "bg-brand-mist text-brand-deep" : tint === "warn" ? "bg-warn-soft text-warn" : "bg-surface-2 text-ink-soft";
  const trendCls = trend === "up" ? "text-success" : trend === "down" ? "text-danger" : "text-ink-faint";
  const TrendIcon = trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : ArrowUpRight;
  const content = /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-start justify-between", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `flex h-10 w-10 items-center justify-center rounded-xl ${tintCls}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-[18px] w-[18px]", strokeWidth: 1.8 }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-faint", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 font-display text-[26px] font-bold leading-tight tracking-tight text-ink", children: value }),
    delta && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `mt-2 inline-flex items-center gap-1 text-[11.5px] font-semibold ${trendCls}`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TrendIcon, { className: "h-3 w-3", strokeWidth: 2.4 }),
      delta
    ] })
  ] });
  if (to) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to, className: "group rounded-2xl border border-hairline bg-surface p-5 shadow-card transition-all hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-pop", children: content });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl border border-hairline bg-surface p-5 shadow-card", children: content });
}
function ActionCard({
  to,
  icon: Icon,
  title,
  sub
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to, className: "group flex items-center gap-4 rounded-2xl border border-hairline bg-surface p-5 shadow-card transition-all hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-pop", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-12 w-12 items-center justify-center rounded-xl bg-brand-mist text-brand-deep transition-colors group-hover:bg-brand group-hover:text-white", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-5 w-5", strokeWidth: 1.8 }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[14px] font-semibold text-ink", children: title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11.5px] text-ink-faint", children: sub })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "h-4 w-4 text-ink-faint transition-colors group-hover:text-brand", strokeWidth: 2 })
  ] });
}
function Card({
  title,
  action,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-hidden rounded-2xl border border-hairline bg-surface shadow-card", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between border-b border-hairline px-6 py-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-[15px] font-bold text-ink", children: title }),
      action
    ] }),
    children
  ] });
}
function Stat({
  icon: Icon,
  label,
  value
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 px-6 py-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-xl bg-surface-2 text-ink-soft", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-[18px] w-[18px]", strokeWidth: 1.8 }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-faint", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-0.5 font-display text-[20px] font-bold text-ink", children: value })
    ] })
  ] });
}
export {
  DashboardPage as component
};
