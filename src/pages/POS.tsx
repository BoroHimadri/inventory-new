import { Link } from "react-router-dom";
import { useStore, actions, type Product, CATEGORIES } from "@/lib/store";
import { toast } from "@/components/Toast";
import { 
  Search, ShoppingBasket, Minus, Plus, Trash2, ArrowRight, X, Printer, CheckCircle2, 
  LayoutDashboard, Package, Users, BarChart3, Bell, Settings, LogOut, ChevronLeft, ChevronRight, 
  UserCircle, TrendingUp, TrendingDown, AlertTriangle, ArrowUpRight, Wallet, Receipt, Boxes, 
  AlertCircle, Ban, Clock, History, User, Phone, Pencil 
} from "lucide-react";

import { useMemo, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const PAY_METHODS = [
  { id: "Cash", label: "Cash" },
  { id: "Card", label: "Card" },
  { id: "UPI", label: "UPI" },
] as const;

type ReceiptData = {
  inv: string;
  items: { product: Product; qty: number }[];
  subtotal: number;
  gst: number;
  discount: number;
  total: number;
  payMethod: string;
  customer: string;
  custPhone?: string;
  time: string;
};

export default function POSPage() {
  const products = useStore((s) => s.products);
  const cart = useStore((s) => s.cart);
  const selectedPay = useStore((s) => s.selectedPay);
  const discountPct = useStore((s) => s.discountPct);
  const customer = useStore((s) => s.customer);
  const custPhone = useStore((s) => s.custPhone);

  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("All");
  const [coupon, setCoupon] = useState("");
  const [cartOpen, setCartOpen] = useState(false);
  const [lastReceipt, setLastReceipt] = useState<ReceiptData | null>(null);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return products.filter(
      (p) =>
        (cat === "All" || p.cat === cat) &&
        (p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q))
    );
  }, [products, query, cat]);

  const lines = Object.values(cart);
  const subtotal = lines.reduce(
    (s, { product, qty }) => s + product.price * qty,
    0
  );
  const gst = subtotal * 0.05;
  const discount = subtotal * discountPct;
  const total = subtotal + gst - discount;

  return (
    <div className="relative grid h-full grid-cols-1 overflow-hidden lg:grid-cols-[1fr_360px] xl:grid-cols-[1fr_400px]">
      {/* PRODUCTS */}
      <section className="flex flex-col overflow-hidden">
        <div className="border-b border-hairline bg-surface px-4 py-4 sm:px-6 sm:py-5 lg:px-8">
          <div className="relative">
            <Search
              className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint"
              strokeWidth={2}
            />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products or scan SKU…"
              className="w-full rounded-xl border border-hairline bg-surface-2 px-4 py-3 pl-11 text-[13.5px] text-ink placeholder:text-ink-faint focus:border-brand focus:bg-surface focus:outline-none focus:ring-2 focus:ring-brand/15"
            />
          </div>
          <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
            {CATEGORIES.map((c) => {
              const active = c === cat;
              return (
                <button
                  key={c}
                  onClick={() => setCat(c)}
                  className={[
                    "shrink-0 rounded-full border px-4 py-1.5 text-[12px] font-semibold tracking-tight transition-all",
                    active
                      ? "border-brand bg-brand text-white shadow-sm"
                      : "border-hairline bg-surface text-ink-soft hover:border-ink-faint hover:text-ink",
                  ].join(" ")}
                >
                  {c}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-5 pb-28 sm:px-6 sm:py-6 lg:px-8 lg:pb-6">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-[repeat(auto-fill,minmax(150px,1fr))] sm:gap-4">
            {filtered.map((p) => {
              const out = p.stock === 0;
              const low = p.stock > 0 && p.stock <= p.reorder;
              return (
                <button
                  key={p.id}
                  disabled={out}
                  onClick={() => actions.addToCart(p.id)}
                  className={[
                    "group relative flex flex-col items-start rounded-2xl border border-hairline bg-surface p-4 text-left shadow-card transition-all",
                    out
                      ? "opacity-40"
                      : "hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-pop",
                  ].join(" ")}
                >
                  {low && (
                    <span className="absolute right-3 top-3 rounded-md bg-warn-soft px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-warn">
                      Low
                    </span>
                  )}
                  <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-xl bg-surface-2 text-[28px]">
                    {p.emoji}
                  </div>
                  <div className="text-[13px] font-semibold leading-snug text-ink">
                    {p.name}
                  </div>
                  <div className="mt-2 font-display text-[16px] font-bold text-ink">
                    ₹{p.price}
                  </div>
                  <div
                    className={[
                      "mt-1 text-[10.5px] font-medium",
                      out
                        ? "text-danger"
                        : low
                          ? "text-warn"
                          : "text-ink-faint",
                    ].join(" ")}
                  >
                    {out
                      ? "Out of stock"
                      : low
                        ? `Only ${p.stock} left`
                        : `${p.stock} in stock`}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* CART — desktop sidebar / mobile bottom sheet */}
      {cartOpen && (
        <div
          onClick={() => setCartOpen(false)}
          className="fixed inset-0 z-30 bg-ink/40 backdrop-blur-sm lg:hidden"
          aria-hidden
        />
      )}
      <aside
        className={[
          "z-40 flex flex-col overflow-hidden border-hairline bg-surface transition-transform lg:relative lg:translate-y-0 lg:border-l",
          "fixed inset-x-0 bottom-0 max-h-[88vh] rounded-t-2xl border-t shadow-pop lg:max-h-none lg:rounded-none lg:shadow-none",
          cartOpen ? "translate-y-0" : "translate-y-full lg:translate-y-0",
        ].join(" ")}
      >
        <div className="flex items-center justify-between border-b border-hairline px-5 py-4 sm:px-6 sm:py-5">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-ink-faint">
              Active ticket
            </p>
            <h2 className="font-display text-[18px] font-bold text-ink">
              Current Sale
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => actions.clearCart()}
              className="inline-flex items-center gap-1.5 rounded-lg border border-hairline bg-surface px-3 py-1.5 text-[11px] font-medium text-ink-soft transition-colors hover:border-danger/40 hover:bg-danger-soft hover:text-danger"
            >
              <Trash2 className="h-3 w-3" strokeWidth={2} /> Clear
            </button>
            <button
              onClick={() => setCartOpen(false)}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-hairline text-ink-soft hover:text-ink lg:hidden"
              aria-label="Close cart"
            >
              <X className="h-4 w-4" strokeWidth={2} />
            </button>
          </div>
        </div>

        <div className="border-b border-hairline px-6 py-4 space-y-3">
          <div>
            <label className="text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-faint">
              Customer Name
            </label>
            <input
              value={customer}
              onChange={(e) => actions.setCustomer(e.target.value)}
              placeholder="e.g. John Doe"
              className="mt-1.5 w-full rounded-lg border border-hairline bg-surface-2 px-3 py-2 text-[13px] text-ink focus:border-brand focus:outline-none"
            />
          </div>
          <div>
            <label className="text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-faint">
              Phone Number
            </label>
            <input
              value={custPhone}
              onChange={(e) => actions.setCustPhone(e.target.value)}
              placeholder="e.g. 9876543210"
              className="mt-1.5 w-full rounded-lg border border-hairline bg-surface-2 px-3 py-2 text-[13px] text-ink focus:border-brand focus:outline-none"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {lines.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-surface-2">
                <ShoppingBasket
                  className="h-7 w-7 text-ink-faint"
                  strokeWidth={1.5}
                />
              </div>
              <p className="font-display text-[15px] font-semibold text-ink">
                No items yet
              </p>
              <p className="mt-1 text-[12px] text-ink-faint">
                Tap a product to begin a sale
              </p>
            </div>
          ) : (
            <ul className="space-y-2">
              {lines.map(({ product, qty }) => (
                <li
                  key={product.id}
                  className="flex items-center gap-3 rounded-xl border border-hairline bg-surface-2 px-3 py-2.5"
                >
                  <span className="text-xl">{product.emoji}</span>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-[13px] font-semibold text-ink">
                      {product.name}
                    </div>
                    <div className="mt-0.5 font-mono text-[10.5px] text-ink-faint">
                      ₹{product.price} × {qty} ={" "}
                      <span className="font-semibold text-ink">
                        ₹{(product.price * qty).toFixed(0)}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => actions.updateQty(product.id, -1)}
                      className="flex h-7 w-7 items-center justify-center rounded-md border border-hairline bg-surface text-ink-soft hover:border-brand hover:text-brand"
                    >
                      <Minus className="h-3 w-3" strokeWidth={2.2} />
                    </button>
                    <span className="w-5 text-center font-mono text-[12px] font-semibold">
                      {qty}
                    </span>
                    <button
                      onClick={() => actions.updateQty(product.id, 1)}
                      className="flex h-7 w-7 items-center justify-center rounded-md border border-hairline bg-surface text-ink-soft hover:border-brand hover:text-brand"
                    >
                      <Plus className="h-3 w-3" strokeWidth={2.2} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="border-t border-hairline px-6 pb-6 pt-4">
          <div className="mb-4 flex gap-2">
            <input
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              placeholder="COUPON CODE"
              className="flex-1 rounded-lg border border-hairline bg-surface-2 px-3 py-2 font-mono text-[11px] uppercase tracking-[0.12em] text-ink placeholder:text-ink-faint focus:border-brand focus:outline-none"
            />
            <button
              onClick={() => {
                if (actions.applyCoupon(coupon))
                  toast(`✓ Coupon ${coupon.toUpperCase()} applied`);
                else toast("Invalid coupon code");
              }}
              className="rounded-lg border border-hairline bg-surface px-4 text-[12px] font-semibold text-ink-soft transition-colors hover:border-brand hover:bg-brand-mist hover:text-brand-deep"
            >
              Apply
            </button>
          </div>

          <div className="space-y-1.5 text-[13px]">
            <Row label="Subtotal" value={`₹${subtotal.toFixed(2)}`} />
            <Row label="GST (5%)" value={`₹${gst.toFixed(2)}`} />
            {discountPct > 0 && (
              <Row
                label="Discount"
                value={`−₹${discount.toFixed(2)}`}
                accent="text-success"
              />
            )}
            <div className="mt-3 flex items-baseline justify-between border-t border-hairline pt-3">
              <span className="font-display text-[15px] font-semibold text-ink">
                Total
              </span>
              <span className="font-display text-[22px] font-bold text-ink">
                ₹{total.toFixed(2)}
              </span>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-3 gap-2">
            {PAY_METHODS.map((m) => {
              const active = selectedPay === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => actions.setPay(m.id)}
                  className={[
                    "rounded-lg border py-2.5 text-[12.5px] font-semibold transition-all",
                    active
                      ? "border-ink bg-ink text-white"
                      : "border-hairline bg-surface text-ink-soft hover:border-ink hover:text-ink",
                  ].join(" ")}
                >
                  {m.label}
                </button>
              );
            })}
          </div>

          <button
            disabled={lines.length === 0}
            onClick={() => {
              const receiptData: ReceiptData = {
                inv: "", // will be set from checkout return
                items: [...lines],
                subtotal,
                gst,
                discount,
                total,
                payMethod: selectedPay,
                customer: customer.trim() || "Walk-in Customer",
                custPhone: custPhone.trim(),
                time: new Date().toLocaleTimeString("en-IN", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                }),
              };
              const inv = actions.checkout();
              if (inv) {
                setLastReceipt({ ...receiptData, inv });
                toast(`✓ Sale complete · ${inv}`);
              }
            }}
            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand py-3.5 text-[14px] font-bold tracking-tight text-white shadow-sm transition-all hover:bg-brand-deep disabled:cursor-not-allowed disabled:opacity-30"
          >
            Charge ₹{total.toFixed(2)}
            <ArrowRight className="h-4 w-4" strokeWidth={2.4} />
          </button>
        </div>
      </aside>

      {/* Mobile cart FAB */}
      {!cartOpen && lines.length > 0 && (
        <button
          onClick={() => setCartOpen(true)}
          className="fixed bottom-5 left-1/2 z-20 flex -translate-x-1/2 items-center gap-3 rounded-full bg-ink px-5 py-3 text-[13px] font-semibold text-white shadow-pop lg:hidden"
        >
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand text-[11px] font-bold">
            {lines.reduce((a, l) => a + l.qty, 0)}
          </span>
          View cart
          <span className="font-display text-[14px] font-bold">
            ₹{total.toFixed(0)}
          </span>
        </button>
      )}

      {/* Receipt Modal */}
      <Dialog
        open={!!lastReceipt}
        onOpenChange={(open) => !open && setLastReceipt(null)}
      >
        <DialogContent className="max-w-md border-none bg-transparent p-0 shadow-none [&>button]:hidden">
          {lastReceipt && (
            <div className="flex flex-col items-center rounded-3xl bg-surface p-8 shadow-pop">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-success-soft text-success">
                <CheckCircle2 className="h-10 w-10" strokeWidth={2.5} />
              </div>
              <h3 className="mb-1 font-display text-[22px] font-bold text-ink">
                Payment Successful
              </h3>
              <p className="mb-8 text-[14px] text-ink-soft">
                Receipt {lastReceipt.inv} has been generated
              </p>

              <div
                id="receipt-content"
                className="w-full rounded-2xl border border-hairline bg-surface-2 p-6 font-mono text-[12px] shadow-sm print:border-none print:bg-white print:p-0 print:shadow-none"
              >
                <div className="mb-5 text-center">
                  <h4 className="font-display text-[15px] font-bold uppercase tracking-wider text-ink">
                    Ira
                  </h4>
                  <p className="mt-0.5 text-[11px] text-ink-faint">
                    Guwahati,Assam
                  </p>
                  <div className="my-3 border-t border-dashed border-hairline" />
                  <div className="flex justify-between text-[11px] text-ink-soft font-bold">
                    <span>#{lastReceipt.inv}</span>
                    <span>{lastReceipt.time}</span>
                  </div>
                  <div className="mt-1 text-left text-[11px] text-ink-soft">
                    <div>Cust: {lastReceipt.customer}</div>
                    {lastReceipt.custPhone && (
                      <div>Phone: {lastReceipt.custPhone}</div>
                    )}
                  </div>
                </div>

                <div className="space-y-2.5">
                  {lastReceipt.items.map(({ product, qty }) => (
                    <div key={product.id} className="flex justify-between">
                      <span className="flex-1 truncate">
                        {product.name} x {qty}
                      </span>
                      <span className="ml-2 font-semibold">
                        ₹{(product.price * qty).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="my-4 border-t border-dashed border-hairline" />

                <div className="space-y-1.5">
                  <div className="flex justify-between text-ink-soft">
                    <span>Subtotal</span>
                    <span>₹{lastReceipt.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-ink-soft">
                    <span>GST (5%)</span>
                    <span>₹{lastReceipt.gst.toFixed(2)}</span>
                  </div>
                  {lastReceipt.discount > 0 && (
                    <div className="flex justify-between text-success font-medium">
                      <span>Discount</span>
                      <span>−₹{lastReceipt.discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between border-t border-hairline pt-2 text-[15px] font-bold text-ink">
                    <span>Total</span>
                    <span>₹{lastReceipt.total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="mt-6 border-t border-dashed border-hairline pt-4 text-center">
                  <p className="text-[13px] font-bold text-ink">
                    Paid via {lastReceipt.payMethod}
                  </p>
                  <p className="mt-1.5 text-[11px] text-ink-faint">
                    Thank you for shopping!
                  </p>
                </div>
              </div>

              <div className="mt-8 flex w-full gap-3 print:hidden">
                <button
                  onClick={() => window.print()}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-hairline bg-surface py-3.5 text-[14px] font-bold text-ink transition-colors hover:bg-surface-2"
                >
                  <Printer className="h-4 w-4" strokeWidth={2.4} />
                  Print
                </button>
                <button
                  onClick={() => setLastReceipt(null)}
                  className="flex flex-1 items-center justify-center rounded-xl bg-ink py-3.5 text-[14px] font-bold text-white transition-opacity hover:opacity-90"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function Row({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: string;
}) {
  return (
    <div className="flex justify-between">
      <span className={accent ?? "text-ink-soft"}>{label}</span>
      <span className={`font-mono font-medium ${accent ?? "text-ink"}`}>
        {value}
      </span>
    </div>
  );
}
