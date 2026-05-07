import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, User, Phone, Receipt, ShoppingBag } from "lucide-react";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/customers")({
  head: () => ({
    meta: [
      { title: "Customers — Ira" },
      {
        name: "description",
        content: "View customer details and their purchase history.",
      },
    ],
  }),
  component: CustomersPage,
});

function CustomersPage() {
  const transactions = useStore((s) => s.transactions);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return transactions.filter(
      (t) =>
        t.cust.toLowerCase().includes(q) ||
        (t.custPhone && t.custPhone.includes(q)) ||
        t.inv.toLowerCase().includes(q)
    );
  }, [transactions, query]);

  return (
    <div className="flex h-full flex-col overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center gap-4 border-b border-hairline bg-surface px-4 py-4 sm:px-6 sm:py-5 lg:px-8">
        <div className="relative flex-1 max-w-md">
          <Search
            className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint"
            strokeWidth={2}
          />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, phone or invoice…"
            className="w-full rounded-xl border border-hairline bg-surface-2 px-4 py-2.5 pl-10 text-[13.5px] text-ink placeholder:text-ink-faint focus:border-brand focus:bg-surface focus:outline-none focus:ring-2 focus:ring-brand/15"
          />
        </div>
        <div className="ml-auto text-[11px] font-bold uppercase tracking-[0.2em] text-ink-faint">
          {filtered.length} Records
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-4">
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-3xl border border-hairline bg-surface py-20 text-center shadow-card">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-surface-2 text-ink-faint">
                  <User className="h-8 w-8" />
                </div>
                <h2 className="font-display text-[18px] font-bold text-ink">No customer records found</h2>
                <p className="mt-1 text-[14px] text-ink-soft">Try adjusting your search query</p>
              </div>
            ) : (
              filtered.map((t) => (
                <div 
                  key={t.inv}
                  className="overflow-hidden rounded-2xl border border-hairline bg-surface shadow-card transition-all hover:shadow-pop"
                >
                  <div className="grid grid-cols-1 md:grid-cols-[240px_1fr_200px] divide-y md:divide-y-0 md:divide-x divide-hairline">
                    {/* Customer Info */}
                    <div className="p-5 flex flex-col justify-center bg-surface-2/30">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand">
                          <User className="h-5 w-5" />
                        </div>
                        <div className="min-w-0">
                          <div className="font-display font-bold text-ink truncate">{t.cust}</div>
                          <div className="flex items-center gap-1.5 text-[11px] text-ink-soft">
                            <Phone className="h-3 w-3" />
                            {t.custPhone || "N/A"}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Purchase Details */}
                    <div className="p-5 flex flex-col justify-center">
                      <div className="flex items-center gap-2 mb-2">
                        <ShoppingBag className="h-4 w-4 text-brand" />
                        <span className="text-[11px] font-bold uppercase tracking-wider text-ink-soft">Items Purchased</span>
                      </div>
                      <div className="text-[13px] text-ink-soft leading-relaxed">
                        {t.itemList}
                      </div>
                      <div className="mt-3 flex items-center gap-4">
                        <div className="flex items-center gap-1.5 text-[11px] font-medium text-ink-faint">
                          <Receipt className="h-3.5 w-3.5" />
                          {t.inv}
                        </div>
                        <div className="text-[11px] font-medium text-ink-faint">
                          {t.time}
                        </div>
                      </div>
                    </div>

                    {/* Payment Info */}
                    <div className="p-5 flex flex-col justify-center items-end bg-surface-2/30">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-ink-faint mb-1">Total Paid</div>
                      <div className="font-display text-[22px] font-bold text-ink">₹{t.amount.toLocaleString("en-IN")}</div>
                      <div className="mt-1 inline-flex items-center rounded-full bg-brand px-2.5 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider">
                        {t.pay}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
