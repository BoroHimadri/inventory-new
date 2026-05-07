import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useStore } from "./store-DdP1yNhv.mjs";
import { a as Search, i as User, j as Phone, S as ShoppingBag, R as Receipt } from "../_libs/lucide-react.mjs";
function CustomersPage() {
  const transactions = useStore((s) => s.transactions);
  const [query, setQuery] = reactExports.useState("");
  const filtered = reactExports.useMemo(() => {
    const q = query.toLowerCase();
    return transactions.filter((t) => t.cust.toLowerCase().includes(q) || t.custPhone && t.custPhone.includes(q) || t.inv.toLowerCase().includes(q));
  }, [transactions, query]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-full flex-col overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 border-b border-hairline bg-surface px-4 py-4 sm:px-6 sm:py-5 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 max-w-md", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint", strokeWidth: 2 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: query, onChange: (e) => setQuery(e.target.value), placeholder: "Search by name, phone or invoice…", className: "w-full rounded-xl border border-hairline bg-surface-2 px-4 py-2.5 pl-10 text-[13.5px] text-ink placeholder:text-ink-faint focus:border-brand focus:bg-surface focus:outline-none focus:ring-2 focus:ring-brand/15" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ml-auto text-[11px] font-bold uppercase tracking-[0.2em] text-ink-faint", children: [
        filtered.length,
        " Records"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-6xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4", children: filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center rounded-3xl border border-hairline bg-surface py-20 text-center shadow-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-surface-2 text-ink-faint", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-8 w-8" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-[18px] font-bold text-ink", children: "No customer records found" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-[14px] text-ink-soft", children: "Try adjusting your search query" })
    ] }) : filtered.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden rounded-2xl border border-hairline bg-surface shadow-card transition-all hover:shadow-pop", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-[240px_1fr_200px] divide-y md:divide-y-0 md:divide-x divide-hairline", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-5 flex flex-col justify-center bg-surface-2/30", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display font-bold text-ink truncate", children: t.cust }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-[11px] text-ink-soft", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "h-3 w-3" }),
            t.custPhone || "N/A"
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 flex flex-col justify-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "h-4 w-4 text-brand" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-bold uppercase tracking-wider text-ink-soft", children: "Items Purchased" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[13px] text-ink-soft leading-relaxed", children: t.itemList }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-center gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-[11px] font-medium text-ink-faint", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Receipt, { className: "h-3.5 w-3.5" }),
            t.inv
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] font-medium text-ink-faint", children: t.time })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 flex flex-col justify-center items-end bg-surface-2/30", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] font-bold uppercase tracking-wider text-ink-faint mb-1", children: "Total Paid" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-display text-[22px] font-bold text-ink", children: [
          "₹",
          t.amount.toLocaleString("en-IN")
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 inline-flex items-center rounded-full bg-brand px-2.5 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider", children: t.pay })
      ] })
    ] }) }, t.inv)) }) }) })
  ] });
}
export {
  CustomersPage as component
};
