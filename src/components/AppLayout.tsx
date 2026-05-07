import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  BarChart3,
  Bell,
  Search,
  Sparkles,
  Menu,
  X,
  Users,
} from "lucide-react";

const NAV = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/pos", label: "Point of Sale", icon: ShoppingBag },
  { to: "/inventory", label: "Inventory", icon: Package },
  { to: "/reports", label: "Reports", icon: BarChart3 },
  { to: "/alerts", label: "Alerts", icon: Bell },
  { to: "/customers", label: "Customers", icon: Users },
] as const;

const META: Record<string, { title: string; sub: string }> = {
  "/": { title: "Dashboard", sub: "Today's overview at a glance" },
  "/pos": { title: "Point of Sale", sub: "Complete sales" },
  "/inventory": { title: "Inventory", sub: "Manage products and stock levels" },
  "/reports": { title: "Reports", sub: "Sales analytics and trends" },
  "/alerts": {
    title: "System Alerts",
    sub: "Critical items requiring attention",
  },
  "/customers": {
    title: "Customers",
    sub: "View customer details and history",
  },
};

export function AppLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [time, setTime] = useState("");
  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => {
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  // Close drawer on route change
  useEffect(() => {
    setNavOpen(false);
  }, [pathname]);

  const today = new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  const todayShort = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
  });

  const meta = META[pathname] ?? { title: "Ira", sub: "" };

  const SidebarBody = (
    <>
      {/* Brand */}
      <div className="flex h-17 items-center justify-between gap-3 border-b border-hairline px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center text-white ">
            <img src="/ira_logo.png" />
          </div>
          <div className="leading-tight">
            <div className="font-display text-[15px] font-bold tracking-tight text-ink">
              Ira
            </div>
          </div>
        </div>
        <button
          onClick={() => setNavOpen(false)}
          className="flex h-8 w-8 items-center justify-center rounded-md text-ink-soft hover:bg-surface lg:hidden"
          aria-label="Close menu"
        >
          <X className="h-4 w-4" strokeWidth={2} />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-5">
        <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-faint">
          Workspace
        </p>
        <ul className="space-y-0.5">
          {NAV.map((item) => {
            const active = pathname === item.to;
            const Icon = item.icon;
            return (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className={[
                    "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13.5px] font-medium transition-all",
                    active
                      ? "bg-surface text-ink shadow-card"
                      : "text-ink-soft hover:bg-surface hover:text-ink",
                  ].join(" ")}
                >
                  <Icon
                    className={[
                      "h-4.25 w-4.25 transition-colors",
                      active
                        ? "text-brand"
                        : "text-ink-faint group-hover:text-ink-soft",
                    ].join(" ")}
                    strokeWidth={1.8}
                  />
                  <span className="tracking-tight">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Foot */}
      <div className="border-t border-hairline p-4">
        <div className="flex items-center gap-3 rounded-lg bg-surface px-3 py-2.5 shadow-card">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-linear-to-br from-brand to-brand-deep text-[12px] font-semibold text-white">
            SM
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-[12.5px] font-semibold text-ink">
              Store Manager
            </div>
            <div className="text-[10.5px] text-ink-faint">
              Cashier · Shift 01
            </div>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <div className="flex h-screen w-full overflow-hidden bg-canvas text-ink">
      {/* DESKTOP SIDEBAR */}
      <aside className="hidden w-62 shrink-0 flex-col border-r border-hairline bg-surface-2 lg:flex">
        {SidebarBody}
      </aside>

      {/* MOBILE DRAWER */}
      {navOpen && (
        <>
          <div
            onClick={() => setNavOpen(false)}
            className="fixed inset-0 z-40 bg-ink/40 backdrop-blur-sm lg:hidden"
            aria-hidden
          />
          <aside className="fixed inset-y-0 left-0 z-50 flex w-70 max-w-[85vw] flex-col border-r border-hairline bg-surface-2 shadow-pop lg:hidden">
            {SidebarBody}
          </aside>
        </>
      )}

      {/* MAIN */}
      <main className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <header className="flex h-16 shrink-0 items-center gap-2 border-b border-hairline bg-surface px-4 sm:gap-3 sm:px-6 lg:h-17 lg:px-8">
          {/* Mobile menu */}
          <button
            onClick={() => setNavOpen(true)}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-hairline bg-surface text-ink-soft transition-colors hover:text-ink lg:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-4 w-4" strokeWidth={2} />
          </button>

          <div className="min-w-0 flex-1">
            <h1 className="truncate font-display text-[17px] font-bold leading-tight text-ink sm:text-[20px]">
              {meta.title}
            </h1>
            <p className="hidden truncate text-[12px] text-ink-soft sm:block">
              {meta.sub}
            </p>
          </div>

          {/* Search — desktop only */}
          <div className="relative hidden xl:block">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-ink-faint"
              strokeWidth={2}
            />
            <input
              placeholder="Quick search…"
              className="w-64 rounded-lg border border-hairline bg-surface-2 py-2 pl-8 pr-3 text-[12.5px] text-ink placeholder:text-ink-faint focus:border-brand focus:bg-surface focus:outline-none focus:ring-2 focus:ring-brand/15"
            />
          </div>

          {/* Search icon — tablet */}
          <button
            className="hidden h-9 w-9 items-center justify-center rounded-lg border border-hairline bg-surface text-ink-soft transition-colors hover:text-ink sm:flex xl:hidden"
            aria-label="Search"
          >
            <Search className="h-4 w-4" strokeWidth={1.8} />
          </button>

          <button className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-hairline bg-surface text-ink-soft transition-colors hover:text-ink">
            <Bell className="h-4 w-4" strokeWidth={1.8} />
            <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand px-1 text-[9px] font-bold text-white">
              3
            </span>
          </button>

          {/* Date — full on lg, short on sm */}
          <div className="hidden flex-col items-end leading-tight lg:flex">
            <div className="text-[12px] font-semibold text-ink">{today}</div>
            <div className="font-mono text-[11px] text-ink-faint">
              {time || "--:--"}
            </div>
          </div>
          <div className="hidden flex-col items-end leading-tight sm:flex lg:hidden">
            <div className="text-[11.5px] font-semibold text-ink">
              {todayShort}
            </div>
            <div className="font-mono text-[10.5px] text-ink-faint">
              {time || "--:--"}
            </div>
          </div>
        </header>
        <div className="flex-1 overflow-hidden bg-canvas">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
