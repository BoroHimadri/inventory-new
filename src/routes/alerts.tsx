import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo } from "react";
import {
  AlertTriangle,
  Ban,
  AlertCircle,
  Clock,
  ArrowLeft,
  Package,
  Pencil,
  type LucideIcon,
} from "lucide-react";
import { useStore, type Product } from "@/lib/store";

export const Route = createFileRoute("/alerts")({
  head: () => ({
    meta: [
      { title: "System Alerts — Ira" },
      {
        name: "description",
        content:
          "Detailed view of all inventory alerts: low stock, expired, and more.",
      },
    ],
  }),
  component: AlertsPage,
});

function AlertsPage() {
  const products = useStore((s) => s.products);

  const alerts = useMemo(() => {
    const now = new Date();
    const soon = new Date();
    soon.setDate(now.getDate() + 14);

    return {
      expired: products.filter((p) => p.exp && new Date(p.exp) < now),
      outOfStock: products.filter((p) => p.stock === 0),
      lowStock: products.filter((p) => p.stock > 0 && p.stock <= p.reorder),
      expiringSoon: products.filter((p) => {
        if (!p.exp) return false;
        const expDate = new Date(p.exp);
        return expDate >= now && expDate <= soon;
      }),
    };
  }, [products]);

  const totalCount =
    alerts.expired.length +
    alerts.outOfStock.length +
    alerts.lowStock.length +
    alerts.expiringSoon.length;

  return (
    <div className="h-full overflow-y-auto bg-canvas">
      <div className="mx-auto max-w-250 px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <Link
              to="/"
              className="mb-4 inline-flex items-center gap-1.5 text-[12px] font-semibold text-ink-soft hover:text-brand"
            >
              {/* Wrap content in a fragment if TS is being stubborn */}
              <>
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>Back to Dashboard</span>
              </>
            </Link>
            <h1 className="font-display text-[28px] font-bold tracking-tight text-ink">
              System Alerts
            </h1>
            <p className="mt-1 text-[14px] text-ink-soft">
              Showing {totalCount} items that require attention.
            </p>
          </div>
          <Link
            to="/inventory"
            className="inline-flex items-center gap-2 rounded-xl bg-brand px-5 py-2.5 text-[14px] font-bold text-white shadow-sm transition-all hover:bg-brand-deep"
          >
            <Package className="h-4 w-4" /> Manage Inventory
          </Link>
        </div>

        <div className="space-y-8 pb-12">
          <AlertSection
            title="Expired Products"
            description="These items have passed their expiry date and must be removed from stock immediately."
            items={alerts.expired}
            type="danger"
            icon={Ban}
          />

          <AlertSection
            title="Out of Stock"
            description="These products are currently unavailable for sale. Consider reordering soon."
            items={alerts.outOfStock}
            type="danger"
            icon={AlertTriangle}
          />

          <AlertSection
            title="Low Stock"
            description="Inventory levels are below the reorder point. Check if a new order is needed."
            items={alerts.lowStock}
            type="warn"
            icon={AlertCircle}
          />

          <AlertSection
            title="Expiring Soon"
            description="Products reaching their expiration date within the next 14 days."
            items={alerts.expiringSoon}
            type="warn"
            icon={Clock}
          />

          {totalCount === 0 && (
            <div className="flex flex-col items-center justify-center rounded-3xl border border-hairline bg-surface py-20 text-center shadow-card">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-success-soft text-success">
                <AlertCircle className="h-8 w-8" />
              </div>
              <h2 className="font-display text-[20px] font-bold text-ink">
                Everything looks good!
              </h2>
              <p className="mt-2 text-[14px] text-ink-soft">
                No active alerts at the moment.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function AlertSection({
  title,
  description,
  items,
  type,
  icon: Icon,
}: {
  title: string;
  description: string;
  items: Product[];
  type: "danger" | "warn";
  icon: LucideIcon;
}) {
  if (items.length === 0) return null;

  const colorCls = type === "danger" ? "text-danger" : "text-warn";
  const bgCls = type === "danger" ? "bg-danger-soft/30" : "bg-warn-soft/30";

  return (
    <section>
      <div className="mb-4 flex items-center gap-3">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl ${bgCls} ${colorCls}`}
        >
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <h2 className="font-display text-[18px] font-bold text-ink">
            {title}
          </h2>
          <p className="text-[12.5px] text-ink-soft">{description}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((p) => (
          <div
            key={p.id}
            className="group relative flex flex-col rounded-2xl border border-hairline bg-surface p-4 shadow-card transition-all hover:border-brand/30 hover:shadow-pop"
          >
            <div className="flex items-start justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-surface-2 text-[24px]">
                {p.emoji}
              </div>
              <div className="text-right">
                <div className="font-mono text-[11px] font-medium text-ink-faint">
                  {p.sku}
                </div>
                <div className={`mt-1 text-[13px] font-bold ${colorCls}`}>
                  {title === "Expired" || title === "Expiring Soon"
                    ? p.exp
                    : `${p.stock} ${p.unit}`}
                </div>
              </div>
            </div>

            <div className="mt-4 flex-1">
              <h3 className="text-[14px] font-bold text-ink transition-colors group-hover:text-brand">
                {p.name}
              </h3>
              <p className="mt-0.5 text-[11.5px] text-ink-faint">
                {p.cat} · ₹{p.price}
              </p>
            </div>

            <div className="mt-4 flex gap-2 border-t border-hairline pt-4">
              <Link
                to="/inventory"
                className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-surface-2 py-2 text-[12px] font-semibold text-ink-soft transition-colors hover:bg-brand-mist hover:text-brand"
              >
                <Pencil className="h-3 w-3" /> Edit
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
