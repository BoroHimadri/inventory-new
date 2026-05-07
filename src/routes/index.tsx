import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo } from "react";
import {
  ShoppingBag,
  Package,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  ArrowUpRight,
  Wallet,
  Receipt,
  Boxes,
  Users,
  AlertCircle,
  Ban,
  Clock,
  History,
  Bell,
} from "lucide-react";
import { useStore, type Product } from "@/lib/store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard — Ira" },
      {
        name: "description",
        content:
          "Today's sales, inventory health and recent activity at a glance.",
      },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  const products = useStore((s) => s.products);
  const transactions = useStore((s) => s.transactions);

  const todayRevenue = useMemo(
    () => transactions.reduce((s, t) => s + t.amount, 0),
    [transactions]
  );
  const txnCount = transactions.length;
  const itemsSold = useMemo(
    () => transactions.reduce((s, t) => s + t.items, 0),
    [transactions]
  );
  const lowStock = useMemo(
    () => products.filter((p) => p.stock > 0 && p.stock <= p.reorder),
    [products]
  );
  const outOfStock = useMemo(
    () => products.filter((p) => p.stock === 0),
    [products]
  );

  const { expired, expiringSoon } = useMemo(() => {
    const now = new Date();
    const soon = new Date();
    soon.setDate(now.getDate() + 14); // 14 days

    return {
      expired: products.filter((p) => p.exp && new Date(p.exp) < now),
      expiringSoon: products.filter((p) => {
        if (!p.exp) return false;
        const expDate = new Date(p.exp);
        return expDate >= now && expDate <= soon;
      }),
    };
  }, [products]);

  const inventoryValue = useMemo(
    () => products.reduce((s, p) => s + p.stock * p.cost, 0),
    [products]
  );

  const totalAlerts =
    lowStock.length + outOfStock.length + expired.length + expiringSoon.length;

  return (
    <div className="h-full overflow-y-auto">
      <div className="mx-auto flex max-w-350 flex-col gap-6 px-8 py-7">
        {/* KPI grid */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-4">
          <Kpi
            icon={Wallet}
            label="Today's Revenue"
            value={`₹${todayRevenue.toLocaleString("en-IN")}`}
            delta="+12.5%"
            trend="up"
            tint="brand"
          />
          <Kpi
            icon={Receipt}
            label="Transactions"
            value={String(txnCount)}
            delta={`Avg ₹${(todayRevenue / Math.max(txnCount, 1)).toFixed(0)}`}
            trend="flat"
          />
          <Kpi
            icon={Boxes}
            label="Inventory Value"
            value={`₹${(inventoryValue / 1000).toFixed(1)}K`}
            delta="+8.2%"
            trend="up"
          />
          <Kpi
            icon={AlertTriangle}
            label="System Alerts"
            value={String(totalAlerts)}
            delta={`${outOfStock.length + expired.length} critical`}
            trend={totalAlerts > 0 ? "down" : "up"}
            tint={totalAlerts > 0 ? "warn" : "brand"}
            to="/alerts"
          />
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
          <ActionCard
            to="/pos"
            icon={ShoppingBag}
            title="Open Point of Sale"
            sub="Start a new sale"
          />
          <ActionCard
            to="/inventory"
            icon={Package}
            title="Manage Inventory"
            sub={`${products.length} active products`}
          />
          <ActionCard
            to="/alerts"
            icon={Bell}
            title="System Alerts"
            sub={`${totalAlerts} items need attention`}
          />
        </div>

        {/* Two column */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_400px]">
          {/* Recent activity */}
          <Card
            title="Recent Transactions"
            action={
              <Link
                to="/reports"
                className="text-[12px] font-semibold text-brand hover:text-brand-deep"
              >
                View all →
              </Link>
            }
          >
            <div className="divide-y divide-hairline">
              {transactions.slice(0, 6).map((t) => (
                <div
                  key={t.inv}
                  className="flex items-center gap-4 px-6 py-3.5"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-mist text-[12px] font-bold text-brand-deep">
                    {t.cust
                      .split(" ")
                      .map((s) => s[0])
                      .slice(0, 2)
                      .join("")}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[13px] font-semibold text-ink">
                      {t.cust}
                    </div>
                    <div className="text-[11.5px] text-ink-faint">
                      {t.inv} · {t.items} items · {t.pay}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-display text-[14px] font-bold text-ink">
                      ₹{t.amount.toLocaleString("en-IN")}
                    </div>
                    <div className="font-mono text-[10.5px] text-ink-faint">
                      {t.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Alerts */}
          <Card
            title="Attention Required"
            action={
              <Link
                to="/alerts"
                className="text-[12px] font-semibold text-brand hover:text-brand-deep"
              >
                View all →
              </Link>
            }
          >
            <div className="divide-y divide-hairline">
              {totalAlerts === 0 ? (
                <div className="px-6 py-10 text-center text-[12.5px] text-ink-faint">
                  All systems healthy ✓
                </div>
              ) : (
                <>
                  <AlertGroup
                    items={expired}
                    label="Expired"
                    type="danger"
                    subLabel="Needs immediate removal"
                  />
                  <AlertGroup
                    items={outOfStock}
                    label="Out of Stock"
                    type="danger"
                    subLabel="Cannot be sold"
                  />
                  <AlertGroup
                    items={lowStock}
                    label="Low Stock"
                    type="warn"
                    subLabel="Reorder suggested"
                  />
                  <AlertGroup
                    items={expiringSoon}
                    label="Expiring Soon"
                    type="warn"
                    subLabel="Within 14 days"
                  />
                </>
              )}
            </div>
          </Card>
        </div>

        {/* Customer band */}
        <Card title="Customer Insights">
          <div className="grid grid-cols-1 divide-y divide-hairline sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            <Stat
              icon={Users}
              label="Today's customers"
              value={String(txnCount)}
            />
            <Stat
              icon={ShoppingBag}
              label="Items sold"
              value={String(itemsSold)}
            />
            <Stat
              icon={TrendingUp}
              label="Avg basket size"
              value={`${(itemsSold / Math.max(txnCount, 1)).toFixed(1)} items`}
            />
          </div>
        </Card>
      </div>
    </div>
  );
}

function AlertGroup({
  items,
  label,
  subLabel,
  type,
}: {
  items: Product[];
  label: string;
  subLabel: string;
  type: "danger" | "warn";
}) {
  if (items.length === 0) return null;

  const Icon = type === "danger" ? Ban : AlertCircle;
  const colorCls = type === "danger" ? "text-danger" : "text-warn";
  const bgCls = type === "danger" ? "bg-danger-soft" : "bg-warn-soft";

  return (
    <div className="py-2">
      <div className="flex items-center gap-2 px-6 py-2">
        <Icon className={`h-3.5 w-3.5 ${colorCls}`} strokeWidth={2.5} />
        <span
          className={`text-[11px] font-bold uppercase tracking-wider ${colorCls}`}
        >
          {label} ({items.length})
        </span>
        <span className="text-[10px] text-ink-faint">— {subLabel}</span>
      </div>
      <div className="space-y-1 px-4 pb-2">
        {items.slice(0, 3).map((p) => (
          <div
            key={p.id}
            className="flex items-center gap-3 rounded-xl px-3 py-2 transition-colors hover:bg-surface-2"
          >
            <div className="text-[16px]">{p.emoji}</div>
            <div className="min-w-0 flex-1">
              <div className="truncate text-[12.5px] font-medium text-ink">
                {p.name}
              </div>
              <div className="text-[10.5px] text-ink-faint">
                {label === "Expired" || label === "Expiring Soon"
                  ? `Exp: ${p.exp}`
                  : `${p.stock} units in stock`}
              </div>
            </div>
          </div>
        ))}
        {items.length > 3 && (
          <div className="px-3 pt-1 text-[10.5px] font-medium text-ink-faint italic">
            + {items.length - 3} more items...
          </div>
        )}
      </div>
    </div>
  );
}

function Kpi({
  icon: Icon,
  label,
  value,
  delta,
  trend,
  tint,
  to,
}: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  label: string;
  value: string;
  delta?: string;
  trend?: "up" | "down" | "flat";
  tint?: "brand" | "warn";
  to?: string;
}) {
  const tintCls =
    tint === "brand"
      ? "bg-brand-mist text-brand-deep"
      : tint === "warn"
        ? "bg-warn-soft text-warn"
        : "bg-surface-2 text-ink-soft";
  const trendCls =
    trend === "up"
      ? "text-success"
      : trend === "down"
        ? "text-danger"
        : "text-ink-faint";
  const TrendIcon =
    trend === "up"
      ? TrendingUp
      : trend === "down"
        ? TrendingDown
        : ArrowUpRight;

  const content = (
    <>
      <div className="flex items-start justify-between">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl ${tintCls}`}
        >
          <Icon className="h-[18px] w-[18px]" strokeWidth={1.8} />
        </div>
      </div>
      <div className="mt-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-faint">
        {label}
      </div>
      <div className="mt-1 font-display text-[26px] font-bold leading-tight tracking-tight text-ink">
        {value}
      </div>
      {delta && (
        <div
          className={`mt-2 inline-flex items-center gap-1 text-[11.5px] font-semibold ${trendCls}`}
        >
          <TrendIcon className="h-3 w-3" strokeWidth={2.4} />
          {delta}
        </div>
      )}
    </>
  );

  if (to) {
    return (
      <Link
        to={to as any}
        className="group rounded-2xl border border-hairline bg-surface p-5 shadow-card transition-all hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-pop"
      >
        {content}
      </Link>
    );
  }

  return (
    <div className="rounded-2xl border border-hairline bg-surface p-5 shadow-card">
      {content}
    </div>
  );
}

function ActionCard({
  to,
  icon: Icon,
  title,
  sub,
}: {
  to: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  title: string;
  sub: string;
}) {
  return (
    <Link
      to={to as any}
      className="group flex items-center gap-4 rounded-2xl border border-hairline bg-surface p-5 shadow-card transition-all hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-pop"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-mist text-brand-deep transition-colors group-hover:bg-brand group-hover:text-white">
        <Icon className="h-5 w-5" strokeWidth={1.8} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-[14px] font-semibold text-ink">{title}</div>
        <div className="text-[11.5px] text-ink-faint">{sub}</div>
      </div>
      <ArrowUpRight
        className="h-4 w-4 text-ink-faint transition-colors group-hover:text-brand"
        strokeWidth={2}
      />
    </Link>
  );
}

function Card({
  title,
  action,
  children,
}: {
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-hairline bg-surface shadow-card">
      <div className="flex items-center justify-between border-b border-hairline px-6 py-4">
        <h3 className="font-display text-[15px] font-bold text-ink">{title}</h3>
        {action}
      </div>
      {children}
    </div>
  );
}

function Stat({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-4 px-6 py-5">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface-2 text-ink-soft">
        <Icon className="h-[18px] w-[18px]" strokeWidth={1.8} />
      </div>
      <div>
        <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-faint">
          {label}
        </div>
        <div className="mt-0.5 font-display text-[20px] font-bold text-ink">
          {value}
        </div>
      </div>
    </div>
  );
}
