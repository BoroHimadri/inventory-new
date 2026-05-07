import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Plus, Pencil, X } from "lucide-react";
import { actions, type Product, useStore } from "@/lib/store";
import { toast } from "@/components/Toast";

export const Route = createFileRoute("/inventory")({
  head: () => ({
    meta: [
      { title: "Inventory — Ira" },
      {
        name: "description",
        content: "Track stock levels, costs and reorder points.",
      },
    ],
  }),
  component: InventoryPage,
});

const CATS = ["Fruits", "Vegetables", "Dairy", "Grains", "Beverages", "Snacks"];
const UNITS = ["kg", "pcs", "liter", "dozen", "box"] as const;

type FormState = Omit<Product, "id" | "sku">;

const empty: FormState = {
  name: "",
  cat: "Fruits",
  emoji: "📦",
  price: 0,
  cost: 0,
  stock: 0,
  reorder: 10,
  mfd: "",
  exp: "",
  unit: "pcs",
};

function InventoryPage() {
  const products = useStore((s) => s.products);
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("");
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<FormState>(empty);

  const list = useMemo(() => {
    const ql = q.toLowerCase();
    return products.filter(
      (p) =>
        (!cat || p.cat === cat) &&
        (p.name.toLowerCase().includes(ql) ||
          p.sku.toLowerCase().includes(ql) ||
          p.cat.toLowerCase().includes(ql))
    );
  }, [products, q, cat]);

  function openAdd() {
    setEditingId(null);
    setForm(empty);
    setOpen(true);
  }

  function openEdit(p: Product) {
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
      unit: p.unit,
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

  return (
    <div className="flex h-full flex-col overflow-hidden">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-2 border-b border-hairline bg-surface px-4 py-3 sm:gap-3 sm:px-6 sm:py-4 lg:px-8">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search products or SKU…"
          className="w-full sm:w-64 rounded-md border border-hairline bg-surface-2 px-4 py-2 text-[13px] text-ink placeholder:text-ink-soft focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/15"
        />
        <select
          value={cat}
          onChange={(e) => setCat(e.target.value)}
          className="rounded-md border border-hairline bg-surface-2 px-3 py-2 text-[13px] text-ink focus:border-brand focus:outline-none"
        >
          <option value="">All Categories</option>
          {CATS.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        <div className="ml-auto text-[11px] uppercase tracking-[0.2em] text-ink-soft">
          {list.length} items
        </div>
        <button
          onClick={openAdd}
          className="inline-flex items-center gap-1.5 rounded-md bg-brand px-4 py-2 text-[13px] font-medium text-white transition-colors hover:bg-ink"
        >
          <Plus className="h-3.5 w-3.5" strokeWidth={2} /> Add Product
        </button>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-y-auto px-4 py-5 sm:px-6 sm:py-6 lg:px-8">
        <div className="overflow-hidden rounded-lg border border-hairline bg-surface">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[960px]">
              <thead>
                <tr className="border-b border-hairline bg-surface-2">
                  {[
                    "Product",
                    "Category",
                    "SKU",
                    "Price",
                    "Cost",
                    "Stock",
                    "Unit",
                    "Exp Date",
                    "Status",
                    "",
                  ].map((h) => (
                    <th
                      key={h}
                      className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-soft"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {list.map((p) => {
                  const out = p.stock === 0;
                  const low = p.stock > 0 && p.stock <= p.reorder;
                  return (
                    <tr
                      key={p.id}
                      className="border-b border-hairline last:border-b-0 transition-colors hover:bg-brand-mist/40"
                    >
                      <td className="px-4 py-3 text-[13px]">
                        <span className="mr-2 text-base">{p.emoji}</span>
                        {p.name}
                      </td>
                      <td className="px-4 py-3 text-[12.5px] text-ink-soft">
                        {p.cat}
                      </td>
                      <td className="px-4 py-3 font-mono text-[11px] text-ink-soft">
                        {p.sku}
                      </td>
                      <td className="px-4 py-3 font-mono text-[12.5px]">
                        ₹{p.price}
                      </td>
                      <td className="px-4 py-3 font-mono text-[12.5px] text-ink-soft">
                        ₹{p.cost}
                      </td>
                      <td
                        className={[
                          "px-4 py-3 font-mono text-[13px] font-semibold",
                          out
                            ? "text-danger"
                            : low
                              ? "text-warn"
                              : "text-brand",
                        ].join(" ")}
                      >
                        {p.stock}
                      </td>
                      <td className="px-4 py-3 text-[12.5px] text-ink-soft">
                        {p.unit}
                      </td>
                      <td className="px-4 py-3 font-mono text-[12px] text-ink-soft">
                        {p.exp || "—"}
                      </td>
                      <td className="px-4 py-3">
                        <Pill state={out ? "out" : low ? "low" : "ok"} />
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button
                          onClick={() => openEdit(p)}
                          className="inline-flex items-center gap-1.5 rounded-md border border-hairline px-3 py-1 text-[11px] text-ink-soft transition-colors hover:border-brand hover:bg-brand-mist hover:text-brand"
                        >
                          <Pencil className="h-3 w-3" strokeWidth={1.5} /> Edit
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal */}
      {open && (
        <ProductModal
          editing={editingId !== null}
          form={form}
          setForm={setForm}
          onClose={() => setOpen(false)}
          onSave={save}
        />
      )}
    </div>
  );
}

function Pill({ state }: { state: "ok" | "low" | "out" }) {
  const map = {
    ok: { label: "In Stock", cls: "bg-brand-mist text-brand" },
    low: { label: "Low Stock", cls: "bg-warn-soft text-warn" },
    out: { label: "Out of Stock", cls: "bg-danger-soft text-danger" },
  } as const;
  const it = map[state];
  return (
    <span
      className={`inline-block rounded-full px-3 py-1 text-[10.5px] font-medium ${it.cls}`}
    >
      {it.label}
    </span>
  );
}

function ProductModal({
  editing,
  form,
  setForm,
  onClose,
  onSave,
}: {
  editing: boolean;
  form: FormState;
  setForm: (f: FormState) => void;
  onClose: () => void;
  onSave: () => void;
}) {
  const upd = <K extends keyof FormState>(k: K, v: FormState[K]) =>
    setForm({ ...form, [k]: v });

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-40 flex items-center justify-center bg-ink/40 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-[480px] max-w-[95vw] max-h-[92vh] overflow-y-auto rounded-xl border border-hairline bg-surface p-5 shadow-2xl sm:p-7"
      >
        <div className="mb-6 flex items-start justify-between">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-ink-soft">
              Inventory
            </p>
            <h3 className="font-display text-[20px] text-ink">
              {editing ? "Edit Product" : "Add New Product"}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="rounded-md p-1 text-ink-soft hover:bg-surface-2 hover:text-ink"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-[1fr_auto] gap-3">
          <Field label="Product Name">
            <input
              value={form.name}
              onChange={(e) => upd("name", e.target.value)}
              placeholder="e.g. Organic Tomatoes"
              className={inputCls}
            />
          </Field>
          <Field label="Emoji">
            <input
              value={form.emoji}
              onChange={(e) => upd("emoji", e.target.value)}
              maxLength={2}
              className="w-16 rounded-md border border-hairline bg-surface px-3 py-2 text-[13px] text-ink focus:border-brand focus:outline-none"
            />
          </Field>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Field label="Category">
            <select
              value={form.cat}
              onChange={(e) => upd("cat", e.target.value)}
              className={inputCls}
            >
              {CATS.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </Field>
          <Field label="Unit">
            <select
              value={form.unit}
              onChange={(e) =>
                upd("unit", e.target.value as FormState["unit"])
              }
              className={inputCls}
            >
              {UNITS.map((u) => (
                <option key={u} value={u}>
                  {u}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Field label="Selling Price (₹)">
            <input
              type="number"
              value={form.price || ""}
              onChange={(e) => upd("price", parseFloat(e.target.value) || 0)}
              className={inputCls}
            />
          </Field>
          <Field label="Cost Price (₹)">
            <input
              type="number"
              value={form.cost || ""}
              onChange={(e) => upd("cost", parseFloat(e.target.value) || 0)}
              className={inputCls}
            />
          </Field>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Field label="Current Stock">
            <input
              type="number"
              value={form.stock || ""}
              onChange={(e) => upd("stock", parseInt(e.target.value) || 0)}
              className={inputCls}
            />
          </Field>
          <Field label="Reorder Point">
            <input
              type="number"
              value={form.reorder || ""}
              onChange={(e) => upd("reorder", parseInt(e.target.value) || 0)}
              className={inputCls}
            />
          </Field>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Field label="MFD Date">
            <input
              type="date"
              value={form.mfd}
              onChange={(e) => upd("mfd", e.target.value)}
              className={inputCls}
            />
          </Field>
          <Field label="EXP Date">
            <input
              type="date"
              value={form.exp}
              onChange={(e) => upd("exp", e.target.value)}
              className={inputCls}
            />
          </Field>
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="rounded-md border border-hairline bg-canvas px-5 py-2 text-[13px] text-ink-soft hover:bg-surface-2"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            className="rounded-md bg-brand px-5 py-2 text-[13px] font-medium text-white hover:bg-ink"
          >
            Save Product
          </button>
        </div>
      </div>
    </div>
  );
}

const inputCls =
  "w-full rounded-md border border-hairline bg-surface px-3 py-2 text-[13px] text-ink focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/15";

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-3">
      <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-soft">
        {label}
      </label>
      {children}
    </div>
  );
}
