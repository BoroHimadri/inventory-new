import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useStore, C as CATEGORIES, a as actions } from "./store-DdP1yNhv.mjs";
import { t as toast } from "./router-DKWe68IY.mjs";
import { R as Root, P as Portal, C as Content, a as Close, O as Overlay, T as Title, D as Description } from "../_libs/radix-ui__react-dialog.mjs";
import { c as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { a as Search, b as Trash2, X, c as ShoppingBasket, d as Minus, e as Plus, A as ArrowRight, f as CircleCheck, g as Printer } from "../_libs/lucide-react.mjs";
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
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/react-remove-scroll.mjs";
import "tslib";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/aria-hidden.mjs";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const Dialog = Root;
const DialogPortal = Portal;
const DialogOverlay = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Overlay,
  {
    ref,
    className: cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props
  }
));
DialogOverlay.displayName = Overlay.displayName;
const DialogContent = reactExports.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogPortal, { children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx(DialogOverlay, {}),
  /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Content,
    {
      ref,
      className: cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Close" })
        ] })
      ]
    }
  )
] }));
DialogContent.displayName = Content.displayName;
const DialogTitle = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Title,
  {
    ref,
    className: cn("text-lg font-semibold leading-none tracking-tight", className),
    ...props
  }
));
DialogTitle.displayName = Title.displayName;
const DialogDescription = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
DialogDescription.displayName = Description.displayName;
const PAY_METHODS = [{
  id: "Cash",
  label: "Cash"
}, {
  id: "Card",
  label: "Card"
}, {
  id: "UPI",
  label: "UPI"
}];
function POSPage() {
  const products = useStore((s) => s.products);
  const cart = useStore((s) => s.cart);
  const selectedPay = useStore((s) => s.selectedPay);
  const discountPct = useStore((s) => s.discountPct);
  const customer = useStore((s) => s.customer);
  const custPhone = useStore((s) => s.custPhone);
  const [query, setQuery] = reactExports.useState("");
  const [cat, setCat] = reactExports.useState("All");
  const [coupon, setCoupon] = reactExports.useState("");
  const [cartOpen, setCartOpen] = reactExports.useState(false);
  const [lastReceipt, setLastReceipt] = reactExports.useState(null);
  const filtered = reactExports.useMemo(() => {
    const q = query.toLowerCase();
    return products.filter((p) => (cat === "All" || p.cat === cat) && (p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q)));
  }, [products, query, cat]);
  const lines = Object.values(cart);
  const subtotal = lines.reduce((s, {
    product,
    qty
  }) => s + product.price * qty, 0);
  const gst = subtotal * 0.05;
  const discount = subtotal * discountPct;
  const total = subtotal + gst - discount;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative grid h-full grid-cols-1 overflow-hidden lg:grid-cols-[1fr_360px] xl:grid-cols-[1fr_400px]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "flex flex-col overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-b border-hairline bg-surface px-4 py-4 sm:px-6 sm:py-5 lg:px-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint", strokeWidth: 2 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: query, onChange: (e) => setQuery(e.target.value), placeholder: "Search products or scan SKU…", className: "w-full rounded-xl border border-hairline bg-surface-2 px-4 py-3 pl-11 text-[13.5px] text-ink placeholder:text-ink-faint focus:border-brand focus:bg-surface focus:outline-none focus:ring-2 focus:ring-brand/15" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 flex gap-2 overflow-x-auto pb-1", children: CATEGORIES.map((c) => {
          const active = c === cat;
          return /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setCat(c), className: ["shrink-0 rounded-full border px-4 py-1.5 text-[12px] font-semibold tracking-tight transition-all", active ? "border-brand bg-brand text-white shadow-sm" : "border-hairline bg-surface text-ink-soft hover:border-ink-faint hover:text-ink"].join(" "), children: c }, c);
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-y-auto px-4 py-5 pb-28 sm:px-6 sm:py-6 lg:px-8 lg:pb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3 sm:grid-cols-[repeat(auto-fill,minmax(150px,1fr))] sm:gap-4", children: filtered.map((p) => {
        const out = p.stock === 0;
        const low = p.stock > 0 && p.stock <= p.reorder;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { disabled: out, onClick: () => actions.addToCart(p.id), className: ["group relative flex flex-col items-start rounded-2xl border border-hairline bg-surface p-4 text-left shadow-card transition-all", out ? "opacity-40" : "hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-pop"].join(" "), children: [
          low && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute right-3 top-3 rounded-md bg-warn-soft px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-warn", children: "Low" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-3 flex h-14 w-14 items-center justify-center rounded-xl bg-surface-2 text-[28px]", children: p.emoji }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[13px] font-semibold leading-snug text-ink", children: p.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 font-display text-[16px] font-bold text-ink", children: [
            "₹",
            p.price
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: ["mt-1 text-[10.5px] font-medium", out ? "text-danger" : low ? "text-warn" : "text-ink-faint"].join(" "), children: out ? "Out of stock" : low ? `Only ${p.stock} left` : `${p.stock} in stock` })
        ] }, p.id);
      }) }) })
    ] }),
    cartOpen && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { onClick: () => setCartOpen(false), className: "fixed inset-0 z-30 bg-ink/40 backdrop-blur-sm lg:hidden", "aria-hidden": true }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: ["z-40 flex flex-col overflow-hidden border-hairline bg-surface transition-transform lg:relative lg:translate-y-0 lg:border-l", "fixed inset-x-0 bottom-0 max-h-[88vh] rounded-t-2xl border-t shadow-pop lg:max-h-none lg:rounded-none lg:shadow-none", cartOpen ? "translate-y-0" : "translate-y-full lg:translate-y-0"].join(" "), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between border-b border-hairline px-5 py-4 sm:px-6 sm:py-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-semibold uppercase tracking-[0.2em] text-ink-faint", children: "Active ticket" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-[18px] font-bold text-ink", children: "Current Sale" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => actions.clearCart(), className: "inline-flex items-center gap-1.5 rounded-lg border border-hairline bg-surface px-3 py-1.5 text-[11px] font-medium text-ink-soft transition-colors hover:border-danger/40 hover:bg-danger-soft hover:text-danger", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3 w-3", strokeWidth: 2 }),
            " Clear"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setCartOpen(false), className: "flex h-8 w-8 items-center justify-center rounded-lg border border-hairline text-ink-soft hover:text-ink lg:hidden", "aria-label": "Close cart", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4", strokeWidth: 2 }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-b border-hairline px-6 py-4 space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-faint", children: "Customer Name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: customer, onChange: (e) => actions.setCustomer(e.target.value), placeholder: "e.g. John Doe", className: "mt-1.5 w-full rounded-lg border border-hairline bg-surface-2 px-3 py-2 text-[13px] text-ink focus:border-brand focus:outline-none" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-faint", children: "Phone Number" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: custPhone, onChange: (e) => actions.setCustPhone(e.target.value), placeholder: "e.g. 9876543210", className: "mt-1.5 w-full rounded-lg border border-hairline bg-surface-2 px-3 py-2 text-[13px] text-ink focus:border-brand focus:outline-none" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-y-auto px-5 py-4", children: lines.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-full flex-col items-center justify-center text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-surface-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBasket, { className: "h-7 w-7 text-ink-faint", strokeWidth: 1.5 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-[15px] font-semibold text-ink", children: "No items yet" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-[12px] text-ink-faint", children: "Tap a product to begin a sale" })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2", children: lines.map(({
        product,
        qty
      }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-3 rounded-xl border border-hairline bg-surface-2 px-3 py-2.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl", children: product.emoji }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "truncate text-[13px] font-semibold text-ink", children: product.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-0.5 font-mono text-[10.5px] text-ink-faint", children: [
            "₹",
            product.price,
            " × ",
            qty,
            " =",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-ink", children: [
              "₹",
              (product.price * qty).toFixed(0)
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => actions.updateQty(product.id, -1), className: "flex h-7 w-7 items-center justify-center rounded-md border border-hairline bg-surface text-ink-soft hover:border-brand hover:text-brand", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "h-3 w-3", strokeWidth: 2.2 }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-5 text-center font-mono text-[12px] font-semibold", children: qty }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => actions.updateQty(product.id, 1), className: "flex h-7 w-7 items-center justify-center rounded-md border border-hairline bg-surface text-ink-soft hover:border-brand hover:text-brand", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3 w-3", strokeWidth: 2.2 }) })
        ] })
      ] }, product.id)) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-hairline px-6 pb-6 pt-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: coupon, onChange: (e) => setCoupon(e.target.value), placeholder: "COUPON CODE", className: "flex-1 rounded-lg border border-hairline bg-surface-2 px-3 py-2 font-mono text-[11px] uppercase tracking-[0.12em] text-ink placeholder:text-ink-faint focus:border-brand focus:outline-none" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
            if (actions.applyCoupon(coupon)) toast(`✓ Coupon ${coupon.toUpperCase()} applied`);
            else toast("Invalid coupon code");
          }, className: "rounded-lg border border-hairline bg-surface px-4 text-[12px] font-semibold text-ink-soft transition-colors hover:border-brand hover:bg-brand-mist hover:text-brand-deep", children: "Apply" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5 text-[13px]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Subtotal", value: `₹${subtotal.toFixed(2)}` }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "GST (5%)", value: `₹${gst.toFixed(2)}` }),
          discountPct > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Discount", value: `−₹${discount.toFixed(2)}`, accent: "text-success" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-baseline justify-between border-t border-hairline pt-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-[15px] font-semibold text-ink", children: "Total" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display text-[22px] font-bold text-ink", children: [
              "₹",
              total.toFixed(2)
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5 grid grid-cols-3 gap-2", children: PAY_METHODS.map((m) => {
          const active = selectedPay === m.id;
          return /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => actions.setPay(m.id), className: ["rounded-lg border py-2.5 text-[12.5px] font-semibold transition-all", active ? "border-ink bg-ink text-white" : "border-hairline bg-surface text-ink-soft hover:border-ink hover:text-ink"].join(" "), children: m.label }, m.id);
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { disabled: lines.length === 0, onClick: () => {
          const receiptData = {
            inv: "",
            // will be set from checkout return
            items: [...lines],
            subtotal,
            gst,
            discount,
            total,
            payMethod: selectedPay,
            customer: customer.trim() || "Walk-in Customer",
            custPhone: custPhone.trim(),
            time: (/* @__PURE__ */ new Date()).toLocaleTimeString("en-IN", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true
            })
          };
          const inv = actions.checkout();
          if (inv) {
            setLastReceipt({
              ...receiptData,
              inv
            });
            toast(`✓ Sale complete · ${inv}`);
          }
        }, className: "mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand py-3.5 text-[14px] font-bold tracking-tight text-white shadow-sm transition-all hover:bg-brand-deep disabled:cursor-not-allowed disabled:opacity-30", children: [
          "Charge ₹",
          total.toFixed(2),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4", strokeWidth: 2.4 })
        ] })
      ] })
    ] }),
    !cartOpen && lines.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setCartOpen(true), className: "fixed bottom-5 left-1/2 z-20 flex -translate-x-1/2 items-center gap-3 rounded-full bg-ink px-5 py-3 text-[13px] font-semibold text-white shadow-pop lg:hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-6 w-6 items-center justify-center rounded-full bg-brand text-[11px] font-bold", children: lines.reduce((a, l) => a + l.qty, 0) }),
      "View cart",
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display text-[14px] font-bold", children: [
        "₹",
        total.toFixed(0)
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: !!lastReceipt, onOpenChange: (open) => !open && setLastReceipt(null), children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogContent, { className: "max-w-md border-none bg-transparent p-0 shadow-none [&>button]:hidden", children: lastReceipt && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center rounded-3xl bg-surface p-8 shadow-pop", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-success-soft text-success", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-10 w-10", strokeWidth: 2.5 }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mb-1 font-display text-[22px] font-bold text-ink", children: "Payment Successful" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mb-8 text-[14px] text-ink-soft", children: [
        "Receipt ",
        lastReceipt.inv,
        " has been generated"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { id: "receipt-content", className: "w-full rounded-2xl border border-hairline bg-surface-2 p-6 font-mono text-[12px] shadow-sm print:border-none print:bg-white print:p-0 print:shadow-none", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-display text-[15px] font-bold uppercase tracking-wider text-ink", children: "Ira" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 text-[11px] text-ink-faint", children: "Guwahati,Assam" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "my-3 border-t border-dashed border-hairline" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-[11px] text-ink-soft font-bold", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "#",
              lastReceipt.inv
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: lastReceipt.time })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 text-left text-[11px] text-ink-soft", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              "Cust: ",
              lastReceipt.customer
            ] }),
            lastReceipt.custPhone && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              "Phone: ",
              lastReceipt.custPhone
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2.5", children: lastReceipt.items.map(({
          product,
          qty
        }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex-1 truncate", children: [
            product.name,
            " x ",
            qty
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-2 font-semibold", children: [
            "₹",
            (product.price * qty).toFixed(2)
          ] })
        ] }, product.id)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "my-4 border-t border-dashed border-hairline" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-ink-soft", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Subtotal" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "₹",
              lastReceipt.subtotal.toFixed(2)
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-ink-soft", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "GST (5%)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "₹",
              lastReceipt.gst.toFixed(2)
            ] })
          ] }),
          lastReceipt.discount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-success font-medium", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Discount" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "−₹",
              lastReceipt.discount.toFixed(2)
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between border-t border-hairline pt-2 text-[15px] font-bold text-ink", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Total" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "₹",
              lastReceipt.total.toFixed(2)
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 border-t border-dashed border-hairline pt-4 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[13px] font-bold text-ink", children: [
            "Paid via ",
            lastReceipt.payMethod
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1.5 text-[11px] text-ink-faint", children: "Thank you for shopping!" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 flex w-full gap-3 print:hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => window.print(), className: "flex flex-1 items-center justify-center gap-2 rounded-xl border border-hairline bg-surface py-3.5 text-[14px] font-bold text-ink transition-colors hover:bg-surface-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Printer, { className: "h-4 w-4", strokeWidth: 2.4 }),
          "Print"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setLastReceipt(null), className: "flex flex-1 items-center justify-center rounded-xl bg-ink py-3.5 text-[14px] font-bold text-white transition-opacity hover:opacity-90", children: "Done" })
      ] })
    ] }) }) })
  ] });
}
function Row({
  label,
  value,
  accent
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: accent ?? "text-ink-soft", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `font-mono font-medium ${accent ?? "text-ink"}`, children: value })
  ] });
}
export {
  POSPage as component
};
