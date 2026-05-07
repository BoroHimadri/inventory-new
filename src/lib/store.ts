// Lightweight global store with subscribe model. No external deps.
import { useSyncExternalStore } from "react";

export type Product = {
  id: number;
  name: string;
  cat: string;
  emoji: string;
  price: number;
  cost: number;
  stock: number;
  reorder: number;
  sku: string;
  mfd?: string;
  exp?: string;
  unit: "kg" | "pcs" | "liter" | "dozen" | "box";
};

export type CartLine = { product: Product; qty: number };

export type Transaction = {
  time: string;
  inv: string;
  cust: string;
  custPhone?: string;
  items: number;
  itemList: string;
  pay: string;
  amount: number;
};

type State = {
  products: Product[];
  cart: Record<number, CartLine>;
  transactions: Transaction[];
  txnCtr: number;
  selectedPay: "Cash" | "Card" | "UPI";
  discountPct: number;
  customer: string;
  custPhone: string;
};

const initial: State = {
  products: [
    {
      id: 1,
      name: "Tomatoes",
      cat: "Vegetables",
      emoji: "🍅",
      price: 30,
      cost: 18,
      stock: 85,
      reorder: 20,
      sku: "VEG-001",
      unit: "kg",
    },
    {
      id: 2,
      name: "Whole Milk 1L",
      cat: "Dairy",
      emoji: "🥛",
      price: 68,
      cost: 50,
      stock: 42,
      reorder: 30,
      sku: "DAI-001",
      unit: "liter",
    },
    {
      id: 3,
      name: "Basmati Rice 1kg",
      cat: "Grains",
      emoji: "🌾",
      price: 95,
      cost: 72,
      stock: 120,
      reorder: 40,
      sku: "GRN-001",
      unit: "kg",
    },
    {
      id: 4,
      name: "Banana Bunch",
      cat: "Fruits",
      emoji: "🍌",
      price: 45,
      cost: 28,
      stock: 8,
      reorder: 15,
      sku: "FRT-001",
      unit: "dozen",
    },
    {
      id: 5,
      name: "Amul Butter",
      cat: "Dairy",
      emoji: "🧈",
      price: 58,
      cost: 44,
      stock: 30,
      reorder: 15,
      sku: "DAI-002",
      unit: "pcs",
    },
    {
      id: 6,
      name: "Onions 500g",
      cat: "Vegetables",
      emoji: "🧅",
      price: 25,
      cost: 14,
      stock: 200,
      reorder: 50,
      sku: "VEG-002",
      unit: "kg",
    },
    {
      id: 7,
      name: "Mango (Alphonso)",
      cat: "Fruits",
      emoji: "🥭",
      price: 120,
      cost: 80,
      stock: 0,
      reorder: 10,
      sku: "FRT-002",
      unit: "dozen",
    },
    {
      id: 8,
      name: "Aashirvaad Atta 5kg",
      cat: "Grains",
      emoji: "🌾",
      price: 285,
      cost: 220,
      stock: 55,
      reorder: 20,
      sku: "GRN-002",
      unit: "pcs",
    },
    {
      id: 9,
      name: "Lay's Classic 26g",
      cat: "Snacks",
      emoji: "🥔",
      price: 20,
      cost: 13,
      stock: 150,
      reorder: 50,
      sku: "SNK-001",
      unit: "pcs",
    },
    {
      id: 10,
      name: "Bisleri Water 1L",
      cat: "Beverages",
      emoji: "💧",
      price: 20,
      cost: 12,
      stock: 7,
      reorder: 30,
      sku: "BEV-001",
      unit: "pcs",
    },
    {
      id: 11,
      name: "Orange",
      cat: "Fruits",
      emoji: "🍊",
      price: 80,
      cost: 55,
      stock: 60,
      reorder: 20,
      sku: "FRT-003",
      unit: "kg",
    },
    {
      id: 12,
      name: "Paneer 200g",
      cat: "Dairy",
      emoji: "🧀",
      price: 90,
      cost: 70,
      stock: 18,
      reorder: 15,
      sku: "DAI-003",
      unit: "pcs",
    },
    {
      id: 13,
      name: "Coke 750ml",
      cat: "Beverages",
      emoji: "🥤",
      price: 45,
      cost: 32,
      stock: 80,
      reorder: 30,
      sku: "BEV-002",
      unit: "pcs",
    },
    {
      id: 14,
      name: "Spinach Bunch",
      cat: "Vegetables",
      emoji: "🥬",
      price: 22,
      cost: 12,
      stock: 35,
      reorder: 20,
      sku: "VEG-003",
      unit: "pcs",
    },
    {
      id: 15,
      name: "Eggs (12 pcs)",
      cat: "Dairy",
      emoji: "🥚",
      price: 84,
      cost: 65,
      stock: 5,
      reorder: 20,
      sku: "DAI-004",
      unit: "dozen",
    },
    {
      id: 16,
      name: "Apple (Shimla)",
      cat: "Fruits",
      emoji: "🍎",
      price: 160,
      cost: 110,
      stock: 40,
      reorder: 15,
      sku: "FRT-004",
      unit: "kg",
    },
  ],
  cart: {},
  transactions: [
    {
      time: "09:14 AM",
      inv: "INV-1041",
      cust: "Rahul Sharma",
      custPhone: "9876543210",
      items: 5,
      itemList: "Tomatoes x 2, Whole Milk x 1, Basmati Rice x 2",
      pay: "UPI",
      amount: 462,
    },
    {
      time: "09:31 AM",
      inv: "INV-1042",
      cust: "Walk-in",
      custPhone: "",
      items: 2,
      itemList: "Amul Butter x 1, Onions x 1",
      pay: "Cash",
      amount: 88,
    },
    {
      time: "10:05 AM",
      inv: "INV-1043",
      cust: "Priya Nath",
      custPhone: "9123456789",
      items: 8,
      itemList: "Mango x 3, Orange x 5",
      pay: "Card",
      amount: 890,
    },
    {
      time: "10:48 AM",
      inv: "INV-1044",
      cust: "Walk-in",
      custPhone: "",
      items: 3,
      itemList: "Lay's Classic x 2, Bisleri Water x 1",
      pay: "Cash",
      amount: 130,
    },
  ],
  txnCtr: 1045,
  selectedPay: "Cash",
  discountPct: 0,
  customer: "",
  custPhone: "",
};

let state: State = initial;
const listeners = new Set<() => void>();

function setState(updater: (s: State) => State) {
  state = updater(state);
  listeners.forEach((l) => l());
}

export function useStore<T>(selector: (s: State) => T): T {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    () => selector(state),
    () => selector(state),
  );
}

export const actions = {
  addToCart(id: number) {
    setState((s) => {
      const p = s.products.find((x) => x.id === id);
      if (!p || p.stock === 0) return s;
      const existing = s.cart[id];
      const qty = existing ? Math.min(existing.qty + 1, p.stock) : 1;
      return { ...s, cart: { ...s.cart, [id]: { product: p, qty } } };
    });
  },
  updateQty(id: number, delta: number) {
    setState((s) => {
      const line = s.cart[id];
      if (!line) return s;
      const next = { ...s.cart };
      const newQty = line.qty + delta;
      if (newQty <= 0) delete next[id];
      else next[id] = { ...line, qty: Math.min(newQty, line.product.stock) };
      return { ...s, cart: next };
    });
  },
  clearCart() {
    setState((s) => ({ ...s, cart: {}, discountPct: 0 }));
  },
  setPay(pay: State["selectedPay"]) {
    setState((s) => ({ ...s, selectedPay: pay }));
  },
  setCustomer(c: string) {
    setState((s) => ({ ...s, customer: c }));
  },
  setCustPhone(p: string) {
    setState((s) => ({ ...s, custPhone: p }));
  },
  applyCoupon(code: string): boolean {
    const codes: Record<string, number> = { SAVE10: 0.1, FRESH20: 0.2, WELCOME5: 0.05 };
    const pct = codes[code.trim().toUpperCase()];
    if (!pct) return false;
    setState((s) => ({ ...s, discountPct: pct }));
    return true;
  },
  checkout() {
    let invNum = "";
    setState((s) => {
      const lines = Object.values(s.cart);
      if (!lines.length) return s;
      const sub = lines.reduce((acc, { product, qty }) => acc + product.price * qty, 0);
      const total = Math.round(sub * 1.05 * (1 - s.discountPct));
      const products = s.products.map((p) => {
        const line = s.cart[p.id];
        return line ? { ...p, stock: Math.max(0, p.stock - line.qty) } : p;
      });
      invNum = "INV-" + s.txnCtr;
      const itemList = lines.map((l) => `${l.product.name} x ${l.qty}`).join(", ");
      const txn: Transaction = {
        time: new Date().toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
        inv: invNum,
        cust: s.customer.trim() || "Walk-in",
        custPhone: s.custPhone.trim(),
        items: lines.reduce((a, { qty }) => a + qty, 0),
        itemList,
        pay: s.selectedPay,
        amount: total,
      };
      return {
        ...s,
        products,
        cart: {},
        discountPct: 0,
        customer: "",
        custPhone: "",
        txnCtr: s.txnCtr + 1,
        transactions: [txn, ...s.transactions],
      };
    });
    return invNum;
  },
  upsertProduct(data: Omit<Product, "id" | "sku">, editingId: number | null) {
    setState((s) => {
      if (editingId) {
        return {
          ...s,
          products: s.products.map((p) => (p.id === editingId ? { ...p, ...data } : p)),
        };
      }
      const sku =
        data.cat.toUpperCase().slice(0, 3) + "-" + String(s.products.length + 1).padStart(3, "0");
      return {
        ...s,
        products: [...s.products, { ...data, id: Date.now(), sku }],
      };
    });
  },
};

export const CATEGORIES = ["All", "Fruits", "Vegetables", "Dairy", "Grains", "Beverages", "Snacks"];
