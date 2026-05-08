import { Link } from "react-router-dom";
import { useMemo, useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  LayoutDashboard,
  ShoppingBag,
  Package,
  Users,
  BarChart3,
  Bell,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  UserCircle,
  Search,
  ShoppingBasket,
  Minus,
  Plus,
  Trash2,
  ArrowRight,
  X,
  Printer,
  CheckCircle2,
  AlertTriangle,
  ArrowUpRight,
  Wallet,
  Receipt,
  Boxes,
  AlertCircle,
  Ban,
  Clock,
  History,
  User,
  Phone,
  Pencil,
} from "lucide-react";
import { useStore, actions, type Product, CATEGORIES } from "@/lib/store";
import { toast } from "@/components/Toast";

export default function ReportsPage() {
  const products = useStore((s) => s.products);
  const transactions = useStore((s) => s.transactions);

  const lowCount = useMemo(
    () => products.filter((p) => p.stock <= p.reorder).length,
    [products]
  );

  const tops = [
    { name: "Basmati Rice 1kg", qty: 34, pct: 90 },
    { name: "Whole Milk 1L", qty: 28, pct: 74 },
    { name: "Tomatoes", qty: 25, pct: 66 },
    { name: "Eggs (12 pcs)", qty: 22, pct: 58 },
    { name: "Bisleri Water", qty: 18, pct: 48 },
  ];

  const cats = [
    { name: "Grains", val: 1820, pct: 95 },
    { name: "Dairy", val: 1240, pct: 65 },
    { name: "Vegetables", val: 880, pct: 46 },
    { name: "Fruits", val: 640, pct: 33 },
    { name: "Beverages", val: 420, pct: 22 },
    { name: "Snacks", val: 290, pct: 15 },
  ];

  return (
    <div className="h-full overflow-y-auto px-4 py-5 sm:px-6 sm:py-6 lg:px-8">
      <div className="mx-auto flex max-w-350 flex-col gap-6">
        {/* KPIs */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
          <Kpi
            label="Today's Revenue"
            value="₹4,820"
            sub="↑ 12% vs yesterday"
            tone="up"
          />
          <Kpi label="Transactions" value="38" sub="Avg. ₹126.8 / sale" />
          <Kpi label="Items Sold" value="214" sub="5.6 items / txn" />
          <Kpi
            label="Low Stock Alerts"
            value={String(lowCount)}
            sub="Need reordering"
            tone="warn"
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <Card title="Top Selling Products" subtitle="Today">
            <div className="space-y-3 px-5 py-4">
              {tops.map((s) => (
                <Bar
                  key={s.name}
                  label={s.name}
                  pct={s.pct}
                  value={String(s.qty)}
                  tone="forest"
                />
              ))}
            </div>
          </Card>
          <Card title="Revenue by Category" subtitle="This week">
            <div className="space-y-3 px-5 py-4">
              {cats.map((c) => (
                <Bar
                  key={c.name}
                  label={c.name}
                  pct={c.pct}
                  value={`₹${c.val}`}
                  tone="bronze"
                />
              ))}
            </div>
          </Card>
        </div>

        {/* Transactions */}
        <Card title="Recent Transactions" subtitle="Latest 8">
          <div className="overflow-x-auto">
            <table className="w-full min-w-160">
              <thead>
                <tr className="border-b border-hairline bg-surface-2/60">
                  {[
                    "Time",
                    "Invoice",
                    "Customer",
                    "Items",
                    "Payment",
                    "Amount",
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
                {transactions.slice(0, 8).map((t) => (
                  <tr
                    key={t.inv}
                    className="border-b border-hairline last:border-b-0 hover:bg-brand-mist/40"
                  >
                    <td className="px-4 py-3 font-mono text-[12px] text-ink-soft">
                      {t.time}
                    </td>
                    <td className="px-4 py-3 font-mono text-[11.5px]">
                      {t.inv}
                    </td>
                    <td className="px-4 py-3 text-[12.5px]">{t.cust}</td>
                    <td className="px-4 py-3 text-[12.5px]">{t.items}</td>
                    <td className="px-4 py-3 text-[12.5px] text-ink-soft">
                      {t.pay}
                    </td>
                    <td className="px-4 py-3 font-mono text-[13px] font-semibold text-brand">
                      ₹{t.amount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}

function Kpi({
  label,
  value,
  sub,
  tone,
}: {
  label: string;
  value: string;
  sub?: string;
  tone?: "up" | "warn";
}) {
  return (
    <div className="relative overflow-hidden rounded-lg border border-hairline bg-surface px-6 py-5">
      <div className="absolute left-0 top-0 h-full w-0.75 bg-brand" />
      <div className="flex items-baseline justify-between">
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-soft">
          {label}
        </p>
        {tone === "up" && (
          <TrendingUp className="h-3.5 w-3.5 text-success" strokeWidth={1.5} />
        )}
      </div>
      <div
        className={`mt-2 font-display text-[34px] leading-none ${
          tone === "warn" ? "text-warn" : "text-ink"
        }`}
      >
        {value}
      </div>
      {sub && (
        <div
          className={`mt-2 text-[11px] ${
            tone === "up" ? "text-success" : "text-ink-soft"
          }`}
        >
          {sub}
        </div>
      )}
    </div>
  );
}

function Card({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-lg border border-hairline bg-surface">
      <div className="flex items-baseline justify-between border-b border-hairline px-5 py-3.5">
        <h3 className="font-display text-[16px] text-ink">{title}</h3>
        {subtitle && (
          <span className="text-[10px] uppercase tracking-[0.18em] text-ink-soft">
            {subtitle}
          </span>
        )}
      </div>
      {children}
    </div>
  );
}

function Bar({
  label,
  pct,
  value,
  tone,
}: {
  label: string;
  pct: number;
  value: string;
  tone: "forest" | "bronze";
}) {
  const fill =
    tone === "forest" ? "bg-brand-mist text-brand" : "bg-warn-soft text-warn";
  return (
    <div className="flex items-center gap-3">
      <div className="w-24 shrink-0 truncate text-right text-[11.5px] text-ink-soft">
        {label}
      </div>
      <div className="h-6 flex-1 overflow-hidden rounded-sm border border-hairline bg-surface-2">
        <div
          style={{ width: `${pct}%` }}
          className={`flex h-full items-center justify-end pr-2 font-mono text-[10.5px] font-medium transition-all duration-700 ${fill}`}
        >
          {value}
        </div>
      </div>
    </div>
  );
}
