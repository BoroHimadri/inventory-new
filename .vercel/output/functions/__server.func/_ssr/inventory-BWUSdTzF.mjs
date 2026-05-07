import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useStore, a as actions } from "./store-DdP1yNhv.mjs";
import { t as toast } from "./router-DKWe68IY.mjs";
import { e as Plus, h as Pencil, X } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__react-router.mjs";
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
const CATS = ["Fruits", "Vegetables", "Dairy", "Grains", "Beverages", "Snacks"];
const UNITS = ["kg", "pcs", "liter", "dozen", "box"];
const empty = {
  name: "",
  cat: "Fruits",
  emoji: "📦",
  price: 0,
  cost: 0,
  stock: 0,
  reorder: 10,
  mfd: "",
  exp: "",
  unit: "pcs"
};
function InventoryPage() {
  const products = useStore((s) => s.products);
  const [q, setQ] = reactExports.useState("");
  const [cat, setCat] = reactExports.useState("");
  const [open, setOpen] = reactExports.useState(false);
  const [editingId, setEditingId] = reactExports.useState(null);
  const [form, setForm] = reactExports.useState(empty);
  const list = reactExports.useMemo(() => {
    const ql = q.toLowerCase();
    return products.filter((p) => (!cat || p.cat === cat) && (p.name.toLowerCase().includes(ql) || p.sku.toLowerCase().includes(ql) || p.cat.toLowerCase().includes(ql)));
  }, [products, q, cat]);
  function openAdd() {
    setEditingId(null);
    setForm(empty);
    setOpen(true);
  }
  function openEdit(p) {
    setEditingId(p.id);
    setForm({
      name: p.name,
      cat: p.cat,
      emoji: p.emoji,
      price: p.price,
      cost: p.cost,
      stock: p.stock,
      reorder: p.reorder,
      mfd: p.mfd || "",
      exp: p.exp || "",
      unit: p.unit
    });
    setOpen(true);
  }
  function save() {
    if (!form.name.trim()) {
      toast("Please enter a product name");
      return;
    }
    actions.upsertProduct(form, editingId);
    toast(editingId ? "Product updated" : "Product added");
    setOpen(false);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-full flex-col overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2 border-b border-hairline bg-surface px-4 py-3 sm:gap-3 sm:px-6 sm:py-4 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: q, onChange: (e) => setQ(e.target.value), placeholder: "Search products or SKU…", className: "w-full sm:w-64 rounded-md border border-hairline bg-surface-2 px-4 py-2 text-[13px] text-ink placeholder:text-ink-soft focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/15" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: cat, onChange: (e) => setCat(e.target.value), className: "rounded-md border border-hairline bg-surface-2 px-3 py-2 text-[13px] text-ink focus:border-brand focus:outline-none", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "All Categories" }),
        CATS.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: c }, c))
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ml-auto text-[11px] uppercase tracking-[0.2em] text-ink-soft", children: [
        list.length,
        " items"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: openAdd, className: "inline-flex items-center gap-1.5 rounded-md bg-brand px-4 py-2 text-[13px] font-medium text-white transition-colors hover:bg-ink", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3.5 w-3.5", strokeWidth: 2 }),
        " Add Product"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-y-auto px-4 py-5 sm:px-6 sm:py-6 lg:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden rounded-lg border border-hairline bg-surface", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full min-w-[960px]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "border-b border-hairline bg-surface-2", children: ["Product", "Category", "SKU", "Price", "Cost", "Stock", "Unit", "Exp Date", "Status", ""].map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-soft", children: h }, h)) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: list.map((p) => {
        const out = p.stock === 0;
        const low = p.stock > 0 && p.stock <= p.reorder;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-hairline last:border-b-0 transition-colors hover:bg-brand-mist/40", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 text-[13px]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mr-2 text-base", children: p.emoji }),
            p.name
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-[12.5px] text-ink-soft", children: p.cat }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-mono text-[11px] text-ink-soft", children: p.sku }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 font-mono text-[12.5px]", children: [
            "₹",
            p.price
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 font-mono text-[12.5px] text-ink-soft", children: [
            "₹",
            p.cost
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: ["px-4 py-3 font-mono text-[13px] font-semibold", out ? "text-danger" : low ? "text-warn" : "text-brand"].join(" "), children: p.stock }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-[12.5px] text-ink-soft", children: p.unit }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-mono text-[12px] text-ink-soft", children: p.exp || "—" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pill, { state: out ? "out" : low ? "low" : "ok" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => openEdit(p), className: "inline-flex items-center gap-1.5 rounded-md border border-hairline px-3 py-1 text-[11px] text-ink-soft transition-colors hover:border-brand hover:bg-brand-mist hover:text-brand", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-3 w-3", strokeWidth: 1.5 }),
            " Edit"
          ] }) })
        ] }, p.id);
      }) })
    ] }) }) }) }),
    open && /* @__PURE__ */ jsxRuntimeExports.jsx(ProductModal, { editing: editingId !== null, form, setForm, onClose: () => setOpen(false), onSave: save })
  ] });
}
function Pill({
  state
}) {
  const map = {
    ok: {
      label: "In Stock",
      cls: "bg-brand-mist text-brand"
    },
    low: {
      label: "Low Stock",
      cls: "bg-warn-soft text-warn"
    },
    out: {
      label: "Out of Stock",
      cls: "bg-danger-soft text-danger"
    }
  };
  const it = map[state];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `inline-block rounded-full px-3 py-1 text-[10.5px] font-medium ${it.cls}`, children: it.label });
}
function ProductModal({
  editing,
  form,
  setForm,
  onClose,
  onSave
}) {
  const upd = (k, v) => setForm({
    ...form,
    [k]: v
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { onClick: onClose, className: "fixed inset-0 z-40 flex items-center justify-center bg-ink/40 backdrop-blur-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { onClick: (e) => e.stopPropagation(), className: "w-[480px] max-w-[95vw] max-h-[92vh] overflow-y-auto rounded-xl border border-hairline bg-surface p-5 shadow-2xl sm:p-7", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 flex items-start justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-medium uppercase tracking-[0.24em] text-ink-soft", children: "Inventory" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-[20px] text-ink", children: editing ? "Edit Product" : "Add New Product" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, className: "rounded-md p-1 text-ink-soft hover:bg-surface-2 hover:text-ink", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-[1fr_auto] gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Product Name", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: form.name, onChange: (e) => upd("name", e.target.value), placeholder: "e.g. Organic Tomatoes", className: inputCls }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Emoji", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: form.emoji, onChange: (e) => upd("emoji", e.target.value), maxLength: 2, className: "w-16 rounded-md border border-hairline bg-surface px-3 py-2 text-[13px] text-ink focus:border-brand focus:outline-none" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Category", children: /* @__PURE__ */ jsxRuntimeExports.jsx("select", { value: form.cat, onChange: (e) => upd("cat", e.target.value), className: inputCls, children: CATS.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: c }, c)) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Unit", children: /* @__PURE__ */ jsxRuntimeExports.jsx("select", { value: form.unit, onChange: (e) => upd("unit", e.target.value), className: inputCls, children: UNITS.map((u) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: u, children: u }, u)) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Selling Price (₹)", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", value: form.price || "", onChange: (e) => upd("price", parseFloat(e.target.value) || 0), className: inputCls }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Cost Price (₹)", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", value: form.cost || "", onChange: (e) => upd("cost", parseFloat(e.target.value) || 0), className: inputCls }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Current Stock", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", value: form.stock || "", onChange: (e) => upd("stock", parseInt(e.target.value) || 0), className: inputCls }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Reorder Point", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", value: form.reorder || "", onChange: (e) => upd("reorder", parseInt(e.target.value) || 0), className: inputCls }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "MFD Date", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "date", value: form.mfd, onChange: (e) => upd("mfd", e.target.value), className: inputCls }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "EXP Date", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "date", value: form.exp, onChange: (e) => upd("exp", e.target.value), className: inputCls }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex justify-end gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, className: "rounded-md border border-hairline bg-canvas px-5 py-2 text-[13px] text-ink-soft hover:bg-surface-2", children: "Cancel" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onSave, className: "rounded-md bg-brand px-5 py-2 text-[13px] font-medium text-white hover:bg-ink", children: "Save Product" })
    ] })
  ] }) });
}
const inputCls = "w-full rounded-md border border-hairline bg-surface px-3 py-2 text-[13px] text-ink focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/15";
function Field({
  label,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-soft", children: label }),
    children
  ] });
}
export {
  InventoryPage as component
};
