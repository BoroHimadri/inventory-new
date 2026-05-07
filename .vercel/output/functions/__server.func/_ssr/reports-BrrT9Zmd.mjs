import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useStore } from "./store-DdP1yNhv.mjs";
import { T as TrendingUp } from "../_libs/lucide-react.mjs";
function ReportsPage() {
  const products = useStore((s) => s.products);
  const transactions = useStore((s) => s.transactions);
  const lowCount = reactExports.useMemo(() => products.filter((p) => p.stock <= p.reorder).length, [products]);
  const tops = [{
    name: "Basmati Rice 1kg",
    qty: 34,
    pct: 90
  }, {
    name: "Whole Milk 1L",
    qty: 28,
    pct: 74
  }, {
    name: "Tomatoes",
    qty: 25,
    pct: 66
  }, {
    name: "Eggs (12 pcs)",
    qty: 22,
    pct: 58
  }, {
    name: "Bisleri Water",
    qty: 18,
    pct: 48
  }];
  const cats = [{
    name: "Grains",
    val: 1820,
    pct: 95
  }, {
    name: "Dairy",
    val: 1240,
    pct: 65
  }, {
    name: "Vegetables",
    val: 880,
    pct: 46
  }, {
    name: "Fruits",
    val: 640,
    pct: 33
  }, {
    name: "Beverages",
    val: 420,
    pct: 22
  }, {
    name: "Snacks",
    val: 290,
    pct: 15
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full overflow-y-auto px-4 py-5 sm:px-6 sm:py-6 lg:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex max-w-[1400px] flex-col gap-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Kpi, { label: "Today's Revenue", value: "₹4,820", sub: "↑ 12% vs yesterday", tone: "up" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Kpi, { label: "Transactions", value: "38", sub: "Avg. ₹126.8 / sale" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Kpi, { label: "Items Sold", value: "214", sub: "5.6 items / txn" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Kpi, { label: "Low Stock Alerts", value: String(lowCount), sub: "Need reordering", tone: "warn" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-4 lg:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { title: "Top Selling Products", subtitle: "Today", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3 px-5 py-4", children: tops.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { label: s.name, pct: s.pct, value: String(s.qty), tone: "forest" }, s.name)) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { title: "Revenue by Category", subtitle: "This week", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3 px-5 py-4", children: cats.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { label: c.name, pct: c.pct, value: `₹${c.val}`, tone: "bronze" }, c.name)) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { title: "Recent Transactions", subtitle: "Latest 8", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full min-w-[640px]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "border-b border-hairline bg-surface-2/60", children: ["Time", "Invoice", "Customer", "Items", "Payment", "Amount"].map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-soft", children: h }, h)) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: transactions.slice(0, 8).map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-hairline last:border-b-0 hover:bg-brand-mist/40", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-mono text-[12px] text-ink-soft", children: t.time }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-mono text-[11.5px]", children: t.inv }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-[12.5px]", children: t.cust }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-[12.5px]", children: t.items }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-[12.5px] text-ink-soft", children: t.pay }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 font-mono text-[13px] font-semibold text-brand", children: [
          "₹",
          t.amount
        ] })
      ] }, t.inv)) })
    ] }) }) })
  ] }) });
}
function Kpi({
  label,
  value,
  sub,
  tone
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-hidden rounded-lg border border-hairline bg-surface px-6 py-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-0 top-0 h-full w-[3px] bg-brand" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-soft", children: label }),
      tone === "up" && /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-3.5 w-3.5 text-success", strokeWidth: 1.5 })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `mt-2 font-display text-[34px] leading-none ${tone === "warn" ? "text-warn" : "text-ink"}`, children: value }),
    sub && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `mt-2 text-[11px] ${tone === "up" ? "text-success" : "text-ink-soft"}`, children: sub })
  ] });
}
function Card({
  title,
  subtitle,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-hidden rounded-lg border border-hairline bg-surface", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline justify-between border-b border-hairline px-5 py-3.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-[16px] text-ink", children: title }),
      subtitle && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] uppercase tracking-[0.18em] text-ink-soft", children: subtitle })
    ] }),
    children
  ] });
}
function Bar({
  label,
  pct,
  value,
  tone
}) {
  const fill = tone === "forest" ? "bg-brand-mist text-brand" : "bg-warn-soft text-warn";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-24 shrink-0 truncate text-right text-[11.5px] text-ink-soft", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-6 flex-1 overflow-hidden rounded-sm border border-hairline bg-surface-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
      width: `${pct}%`
    }, className: `flex h-full items-center justify-end pr-2 font-mono text-[10.5px] font-medium transition-all duration-700 ${fill}`, children: value }) })
  ] });
}
export {
  ReportsPage as component
};
