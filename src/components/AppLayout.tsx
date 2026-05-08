import { Link, useLocation } from "react-router-dom";
import {
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
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const NAV = [
  { label: "Dashboard", icon: LayoutDashboard, to: "/" },
  { label: "Point of Sale", icon: ShoppingBag, to: "/pos" },
  { label: "Inventory", icon: Package, to: "/inventory" },
  { label: "Customers", icon: Users, to: "/customers" },
  { label: "Reports", icon: BarChart3, to: "/reports" },
  { label: "Alerts", icon: Bell, to: "/alerts" },
];

export function AppLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();
  const [time, setTime] = useState("");
  const pathname = location.pathname;

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

  // Close mobile sidebar on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

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

  const META: Record<string, { title: string; sub: string }> = {
    "/": { title: "Dashboard", sub: "Today's overview at a glance" },
    "/pos": { title: "Point of Sale", sub: "Complete sales" },
    "/inventory": {
      title: "Inventory",
      sub: "Manage products and stock levels",
    },
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

  const meta = META[pathname] ?? { title: "Ira", sub: "" };

  return (
    <div className="flex h-screen bg-canvas overflow-hidden">
      {/* Mobile Backdrop */}
      {isMobile && mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-ink/40 backdrop-blur-sm transition-opacity"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex flex-col border-r border-hairline bg-surface transition-all duration-300 ease-in-out lg:relative lg:z-20",
          collapsed ? "lg:w-20" : "lg:w-64",
          isMobile
            ? mobileOpen
              ? "w-64 translate-x-0"
              : "w-64 -translate-x-full"
            : "translate-x-0"
        )}
      >
        <div className="flex h-20 items-center justify-between px-6">
          {(!collapsed || isMobile) && (
            <div className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center text-white">
                <img
                  src="/ira_logo.png"
                  alt="Ira Logo"
                  className="h-full w-full object-contain"
                />
              </div>
              <span className="font-display text-xl font-extrabold tracking-tight text-ink">
                Ira
              </span>
            </div>
          )}
          {collapsed && !isMobile && (
            <div className="mx-auto flex h-8 w-8 items-center justify-center text-white">
              <img
                src="/ira_logo.png"
                alt="Ira Logo"
                className="h-full w-full object-contain"
              />
            </div>
          )}

          {/* Collapse Toggle - Desktop Only (Large screens) */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setCollapsed(!collapsed);
            }}
            className="absolute -right-3 top-7 z-30 hidden h-6 w-6 items-center justify-center rounded-full border border-hairline bg-surface text-ink-soft shadow-sm hover:text-brand lg:flex"
          >
            {collapsed ? (
              <ChevronRight className="h-3.5 w-3.5" />
            ) : (
              <ChevronLeft className="h-3.5 w-3.5 " />
            )}
          </button>

          {/* Close Button - Mobile Only */}
          {isMobile && (
            <button
              onClick={() => setMobileOpen(false)}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-hairline text-ink-soft"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <nav className="flex-1 space-y-1 px-3 py-4">
          {NAV.map((item) => {
            const active = location.pathname === item.to;
            return (
              <Link
                key={item.label}
                to={item.to}
                className={cn(
                  "flex items-center rounded-xl px-4 py-3 transition-all duration-200 group",
                  active
                    ? "bg-brand-mist text-brand shadow-sm"
                    : "text-ink-soft hover:bg-surface-2 hover:text-ink"
                )}
              >
                <item.icon
                  className={cn(
                    "h-5 w-5 shrink-0 transition-transform group-hover:scale-110",
                    active
                      ? "text-brand"
                      : "text-ink-faint group-hover:text-ink"
                  )}
                  strokeWidth={active ? 2.4 : 2}
                />
                {(!collapsed || isMobile) && (
                  <span className="ml-3.5 text-[13.5px] font-semibold tracking-tight">
                    {item.label}
                  </span>
                )}
                {active && (!collapsed || isMobile) && (
                  <div className="ml-auto h-1.5 w-1.5 rounded-full bg-brand shadow-glow" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-hairline p-4 space-y-1">
          <Link
            to="/"
            className={cn(
              "flex items-center rounded-xl px-4 py-3 text-ink-soft hover:bg-surface-2 hover:text-ink transition-all",
              collapsed && !isMobile && "justify-center"
            )}
          >
            <Settings className="h-5 w-5 shrink-0" />
            {(!collapsed || isMobile) && (
              <span className="ml-3.5 text-[13.5px] font-semibold">
                Settings
              </span>
            )}
          </Link>
          <div className="pt-2">
            <div
              className={cn(
                "flex items-center gap-3 px-3 py-3 rounded-2xl bg-surface-2/60 border border-hairline/50",
                collapsed && !isMobile ? "justify-center px-1" : "px-4"
              )}
            >
              <div className="h-8 w-8 rounded-full bg-brand/10 flex items-center justify-center text-brand shrink-0">
                <UserCircle className="h-5 w-5" />
              </div>
              {(!collapsed || isMobile) && (
                <div className="min-w-0 flex-1">
                  <p className="text-[12px] font-bold text-ink truncate leading-none">
                    Admin User
                  </p>
                  <p className="text-[10px] text-ink-faint truncate mt-1">
                    Super Admin
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col min-w-0 bg-canvas relative z-10 overflow-hidden">
        {/* Mobile Header */}
        {isMobile && (
          <header className="h-16 border-b border-hairline bg-surface flex items-center px-6 justify-between shrink-0">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileOpen(true)}
                className="h-9 w-9 flex items-center justify-center rounded-xl bg-surface-2 text-ink active:scale-95 transition-transform"
              >
                <Menu className="h-5 w-5" />
              </button>
              <div className="flex items-center gap-2">
                <div className="h-7 w-7 bg-brand rounded-lg flex items-center justify-center text-white text-sm font-bold">
                  <img
                    src="/ira_logo.png"
                    alt="I"
                    className="h-4 w-4 object-contain brightness-0 invert"
                  />
                </div>
                <span className="font-display font-bold text-lg">Ira</span>
              </div>
            </div>
            <button className="h-9 w-9 flex items-center justify-center rounded-xl bg-surface-2 text-ink">
              <LogOut className="h-4 w-4" />
            </button>
          </header>
        )}

        {/* Sub Header / Breadcrumb Header */}
        <header className="flex h-16 shrink-0 items-center gap-2 border-b border-hairline bg-surface px-4 sm:gap-3 sm:px-6 lg:h-17 lg:px-8">
          <div className="min-w-0 flex-1">
            <h1 className="truncate font-display text-[17px] font-bold leading-tight text-ink sm:text-[20px]">
              {meta.title}
            </h1>
            <p className="hidden truncate text-[12px] text-ink-soft sm:block">
              {meta.sub}
            </p>
          </div>
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

        <div className="flex-1 overflow-auto">{children}</div>
      </main>
    </div>
  );
}
