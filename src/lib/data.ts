export interface Category {
  id: string;
  name: string;
  parentId?: string;
}

export interface Batch {
  batchId: string;
  lotNumber: string;
  quantity: number;
  expiryDate: string;
  dateReceived: string;
}

export interface Product {
  id: string;
  name: string;
  categoryId: string;
  subcategoryId?: string;
  unit: "kg" | "pcs" | "liter" | "dozen" | "box";
  costPrice: number;
  sellingPrice: number;
  quantity: number;
  lowStockThreshold: number;
  batches: Batch[];
  supplierId: string;
}

export interface Supplier {
  id: string;
  name: string;
  contactPerson: string;
  phone: string;
  email: string;
  address: string;
}

export interface SaleItem {
  productId: string;
  name: string;
  qty: number;
  unitPrice: number;
  subtotal: number;
}

export interface Sale {
  id: string;
  date: string;
  items: SaleItem[];
  totalAmount: number;
  tax: number;
  grandTotal: number;
  receiptNumber: string;
  paymentMethod: "cash" | "card" | "mobile";
}

export interface PurchaseOrderItem {
  productId: string;
  name: string;
  qty: number;
  costPrice: number;
}

export interface PurchaseOrder {
  id: string;
  supplierId: string;
  date: string;
  items: PurchaseOrderItem[];
  totalCost: number;
  notes: string;
}

export const initialCategories: Category[] = [
  { id: "cat_fresh", name: "Fresh Produce" },
  { id: "cat_veg", name: "Vegetables", parentId: "cat_fresh" },
  { id: "cat_fruit", name: "Fruits", parentId: "cat_fresh" },
  { id: "cat_grocery", name: "Groceries" },
  { id: "cat_cereal", name: "Cereals", parentId: "cat_grocery" },
  { id: "cat_spices", name: "Spices", parentId: "cat_grocery" },
  { id: "cat_dairy", name: "Dairy" },
  { id: "cat_milk", name: "Milk", parentId: "cat_dairy" },
  { id: "cat_cheese", name: "Cheese", parentId: "cat_dairy" },
  { id: "cat_beverage", name: "Beverages" },
  { id: "cat_household", name: "Household" },
];

export const initialSuppliers: Supplier[] = [
  {
    id: "sup_1",
    name: "Valley Farms",
    contactPerson: "John Doe",
    phone: "555-0101",
    email: "john@valleyfarms.com",
    address: "123 Farm Road, Countryside",
  },
  {
    id: "sup_2",
    name: "Global Groceries",
    contactPerson: "Jane Smith",
    phone: "555-0102",
    email: "orders@globalgroceries.com",
    address: "456 Warehouse Ave, Metro City",
  },
  {
    id: "sup_3",
    name: "Dairy Best",
    contactPerson: "Mike Johnson",
    phone: "555-0103",
    email: "sales@dairybest.com",
    address: "789 Milk Street, Uptown",
  },
];

const today = new Date();
const addDays = (date: Date, days: number) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result.toISOString().split("T")[0];
};
const subDays = (date: Date, days: number) => {
  const result = new Date(date);
  result.setDate(result.getDate() - days);
  return result.toISOString().split("T")[0];
};
const subDaysISO = (date: Date, days: number, time = "T08:00:00Z") => {
  return subDays(date, days) + time;
};

export const initialProducts: Product[] = [
  {
    id: "prod_1",
    name: "Tomatoes (Roma)",
    categoryId: "cat_fresh",
    subcategoryId: "cat_veg",
    unit: "kg",
    costPrice: 1.5,
    sellingPrice: 3.0,
    quantity: 15,
    lowStockThreshold: 20,
    supplierId: "sup_1",
    batches: [
      {
        batchId: "b_1a",
        lotNumber: "L100",
        quantity: 15,
        expiryDate: addDays(today, 5),
        dateReceived: subDays(today, 2),
      },
    ],
  },
  {
    id: "prod_2",
    name: "Whole Milk 1L",
    categoryId: "cat_dairy",
    subcategoryId: "cat_milk",
    unit: "liter",
    costPrice: 0.8,
    sellingPrice: 1.5,
    quantity: 45,
    lowStockThreshold: 10,
    supplierId: "sup_3",
    batches: [
      {
        batchId: "b_2a",
        lotNumber: "M201",
        quantity: 20,
        expiryDate: addDays(today, 3),
        dateReceived: subDays(today, 5),
      },
      {
        batchId: "b_2b",
        lotNumber: "M202",
        quantity: 25,
        expiryDate: addDays(today, 10),
        dateReceived: subDays(today, 1),
      },
    ],
  },
  {
    id: "prod_3",
    name: "Basmati Rice 5kg",
    categoryId: "cat_grocery",
    subcategoryId: "cat_cereal",
    unit: "pcs",
    costPrice: 6.0,
    sellingPrice: 10.0,
    quantity: 8,
    lowStockThreshold: 10,
    supplierId: "sup_2",
    batches: [
      {
        batchId: "b_3a",
        lotNumber: "R500",
        quantity: 8,
        expiryDate: addDays(today, 180),
        dateReceived: subDays(today, 30),
      },
    ],
  },
  {
    id: "prod_4",
    name: "Cheddar Cheese 200g",
    categoryId: "cat_dairy",
    subcategoryId: "cat_cheese",
    unit: "pcs",
    costPrice: 2.5,
    sellingPrice: 4.5,
    quantity: 0,
    lowStockThreshold: 5,
    supplierId: "sup_3",
    batches: [],
  },
  {
    id: "prod_5",
    name: "Bananas",
    categoryId: "cat_fresh",
    subcategoryId: "cat_fruit",
    unit: "kg",
    costPrice: 0.6,
    sellingPrice: 1.2,
    quantity: 30,
    lowStockThreshold: 10,
    supplierId: "sup_1",
    batches: [
      {
        batchId: "b_5a",
        lotNumber: "F300",
        quantity: 30,
        expiryDate: addDays(today, 4),
        dateReceived: subDays(today, 3),
      },
    ],
  },
  {
    id: "prod_6",
    name: "Cooking Oil 1L",
    categoryId: "cat_grocery",
    unit: "liter",
    costPrice: 1.8,
    sellingPrice: 3.5,
    quantity: 24,
    lowStockThreshold: 12,
    supplierId: "sup_2",
    batches: [
      {
        batchId: "b_6a",
        lotNumber: "O600",
        quantity: 24,
        expiryDate: addDays(today, 365),
        dateReceived: subDays(today, 10),
      },
    ],
  },
  {
    id: "prod_7",
    name: "Eggs (Tray/30)",
    categoryId: "cat_dairy",
    unit: "dozen",
    costPrice: 4.0,
    sellingPrice: 7.0,
    quantity: 6,
    lowStockThreshold: 5,
    supplierId: "sup_3",
    batches: [
      {
        batchId: "b_7a",
        lotNumber: "E700",
        quantity: 6,
        expiryDate: addDays(today, 14),
        dateReceived: subDays(today, 2),
      },
    ],
  },
  {
    id: "prod_8",
    name: "Wheat Flour 2kg",
    categoryId: "cat_grocery",
    subcategoryId: "cat_cereal",
    unit: "pcs",
    costPrice: 1.2,
    sellingPrice: 2.5,
    quantity: 35,
    lowStockThreshold: 15,
    supplierId: "sup_2",
    batches: [
      {
        batchId: "b_8a",
        lotNumber: "W800",
        quantity: 35,
        expiryDate: addDays(today, 120),
        dateReceived: subDays(today, 20),
      },
    ],
  },
  {
    id: "prod_9",
    name: "Mineral Water 500ml",
    categoryId: "cat_beverage",
    unit: "pcs",
    costPrice: 0.3,
    sellingPrice: 0.7,
    quantity: 4,
    lowStockThreshold: 24,
    supplierId: "sup_2",
    batches: [
      {
        batchId: "b_9a",
        lotNumber: "W900",
        quantity: 4,
        expiryDate: addDays(today, 730),
        dateReceived: subDays(today, 5),
      },
    ],
  },
  {
    id: "prod_10",
    name: "Turmeric Powder 100g",
    categoryId: "cat_grocery",
    subcategoryId: "cat_spices",
    unit: "pcs",
    costPrice: 0.5,
    sellingPrice: 1.2,
    quantity: 22,
    lowStockThreshold: 10,
    supplierId: "sup_2",
    batches: [
      {
        batchId: "b_10a",
        lotNumber: "S100",
        quantity: 22,
        expiryDate: addDays(today, 365),
        dateReceived: subDays(today, 15),
      },
    ],
  },
  {
    id: "prod_11",
    name: "Yogurt 500g",
    categoryId: "cat_dairy",
    subcategoryId: "cat_milk",
    unit: "pcs",
    costPrice: 1.0,
    sellingPrice: 2.0,
    quantity: 12,
    lowStockThreshold: 8,
    supplierId: "sup_3",
    batches: [
      {
        batchId: "b_11a",
        lotNumber: "Y100",
        quantity: 12,
        expiryDate: addDays(today, 6),
        dateReceived: subDays(today, 3),
      },
    ],
  },
  {
    id: "prod_12",
    name: "Dishwashing Liquid 500ml",
    categoryId: "cat_household",
    unit: "pcs",
    costPrice: 0.9,
    sellingPrice: 1.8,
    quantity: 18,
    lowStockThreshold: 10,
    supplierId: "sup_2",
    batches: [
      {
        batchId: "b_12a",
        lotNumber: "H100",
        quantity: 18,
        expiryDate: addDays(today, 730),
        dateReceived: subDays(today, 7),
      },
    ],
  },
  {
    id: "prod_13",
    name: "Potatoes",
    categoryId: "cat_fresh",
    subcategoryId: "cat_veg",
    unit: "kg",
    costPrice: 0.4,
    sellingPrice: 0.9,
    quantity: 50,
    lowStockThreshold: 20,
    supplierId: "sup_1",
    batches: [
      {
        batchId: "b_13a",
        lotNumber: "P200",
        quantity: 50,
        expiryDate: addDays(today, 30),
        dateReceived: subDays(today, 4),
      },
    ],
  },
  {
    id: "prod_14",
    name: "Orange Juice 1L",
    categoryId: "cat_beverage",
    unit: "liter",
    costPrice: 1.5,
    sellingPrice: 2.8,
    quantity: 2,
    lowStockThreshold: 8,
    supplierId: "sup_2",
    batches: [
      {
        batchId: "b_14a",
        lotNumber: "J100",
        quantity: 2,
        expiryDate: addDays(today, 7),
        dateReceived: subDays(today, 8),
      },
    ],
  },
  {
    id: "prod_15",
    name: "Onions",
    categoryId: "cat_fresh",
    subcategoryId: "cat_veg",
    unit: "kg",
    costPrice: 0.5,
    sellingPrice: 1.1,
    quantity: 40,
    lowStockThreshold: 15,
    supplierId: "sup_1",
    batches: [
      {
        batchId: "b_15a",
        lotNumber: "O100",
        quantity: 40,
        expiryDate: addDays(today, 45),
        dateReceived: subDays(today, 5),
      },
    ],
  },
  {
    id: "prod_16",
    name: "Sugar 1kg",
    categoryId: "cat_grocery",
    unit: "pcs",
    costPrice: 0.7,
    sellingPrice: 1.4,
    quantity: 3,
    lowStockThreshold: 10,
    supplierId: "sup_2",
    batches: [
      {
        batchId: "b_16a",
        lotNumber: "S200",
        quantity: 3,
        expiryDate: addDays(today, 365),
        dateReceived: subDays(today, 20),
      },
    ],
  },
  {
    id: "prod_17",
    name: "Apples (Red) 1kg",
    categoryId: "cat_fresh",
    subcategoryId: "cat_fruit",
    unit: "kg",
    costPrice: 1.2,
    sellingPrice: 2.4,
    quantity: 20,
    lowStockThreshold: 10,
    supplierId: "sup_1",
    batches: [
      {
        batchId: "b_17a",
        lotNumber: "A100",
        quantity: 10,
        expiryDate: addDays(today, 14),
        dateReceived: subDays(today, 7),
      },
      {
        batchId: "b_17b",
        lotNumber: "A101",
        quantity: 10,
        expiryDate: addDays(today, 21),
        dateReceived: subDays(today, 2),
      },
    ],
  },
  {
    id: "prod_18",
    name: "Butter 250g",
    categoryId: "cat_dairy",
    unit: "pcs",
    costPrice: 1.5,
    sellingPrice: 3.0,
    quantity: 9,
    lowStockThreshold: 8,
    supplierId: "sup_3",
    batches: [
      {
        batchId: "b_18a",
        lotNumber: "B100",
        quantity: 9,
        expiryDate: addDays(today, 30),
        dateReceived: subDays(today, 3),
      },
    ],
  },
  {
    id: "prod_19",
    name: "Laundry Detergent 1kg",
    categoryId: "cat_household",
    unit: "pcs",
    costPrice: 2.0,
    sellingPrice: 4.0,
    quantity: 14,
    lowStockThreshold: 6,
    supplierId: "sup_2",
    batches: [
      {
        batchId: "b_19a",
        lotNumber: "L200",
        quantity: 14,
        expiryDate: addDays(today, 1095),
        dateReceived: subDays(today, 12),
      },
    ],
  },
  {
    id: "prod_20",
    name: "Coffee 200g",
    categoryId: "cat_beverage",
    unit: "pcs",
    costPrice: 2.5,
    sellingPrice: 5.0,
    quantity: 11,
    lowStockThreshold: 6,
    supplierId: "sup_2",
    batches: [
      {
        batchId: "b_20a",
        lotNumber: "C100",
        quantity: 11,
        expiryDate: addDays(today, 180),
        dateReceived: subDays(today, 8),
      },
    ],
  },
];

export const initialSales: Sale[] = [
  {
    id: "sale_1",
    date: subDaysISO(today, 0, "T09:15:00Z"),
    items: [
      {
        productId: "prod_1",
        name: "Tomatoes (Roma)",
        qty: 2,
        unitPrice: 3.0,
        subtotal: 6.0,
      },
      {
        productId: "prod_2",
        name: "Whole Milk 1L",
        qty: 3,
        unitPrice: 1.5,
        subtotal: 4.5,
      },
      {
        productId: "prod_8",
        name: "Wheat Flour 2kg",
        qty: 1,
        unitPrice: 2.5,
        subtotal: 2.5,
      },
    ],
    totalAmount: 13.0,
    tax: 0.65,
    grandTotal: 13.65,
    receiptNumber: "REC-1001",
    paymentMethod: "cash",
  },
  {
    id: "sale_2",
    date: subDaysISO(today, 0, "T11:30:00Z"),
    items: [
      {
        productId: "prod_5",
        name: "Bananas",
        qty: 1.5,
        unitPrice: 1.2,
        subtotal: 1.8,
      },
      {
        productId: "prod_7",
        name: "Eggs (Tray/30)",
        qty: 1,
        unitPrice: 7.0,
        subtotal: 7.0,
      },
      {
        productId: "prod_12",
        name: "Dishwashing Liquid 500ml",
        qty: 1,
        unitPrice: 1.8,
        subtotal: 1.8,
      },
    ],
    totalAmount: 10.6,
    tax: 0.53,
    grandTotal: 11.13,
    receiptNumber: "REC-1002",
    paymentMethod: "card",
  },
  {
    id: "sale_3",
    date: subDaysISO(today, 0, "T14:45:00Z"),
    items: [
      {
        productId: "prod_3",
        name: "Basmati Rice 5kg",
        qty: 2,
        unitPrice: 10.0,
        subtotal: 20.0,
      },
      {
        productId: "prod_10",
        name: "Turmeric Powder 100g",
        qty: 2,
        unitPrice: 1.2,
        subtotal: 2.4,
      },
    ],
    totalAmount: 22.4,
    tax: 1.12,
    grandTotal: 23.52,
    receiptNumber: "REC-1003",
    paymentMethod: "mobile",
  },
  {
    id: "sale_4",
    date: subDaysISO(today, 1, "T10:00:00Z"),
    items: [
      {
        productId: "prod_2",
        name: "Whole Milk 1L",
        qty: 2,
        unitPrice: 1.5,
        subtotal: 3.0,
      },
      {
        productId: "prod_11",
        name: "Yogurt 500g",
        qty: 1,
        unitPrice: 2.0,
        subtotal: 2.0,
      },
      {
        productId: "prod_18",
        name: "Butter 250g",
        qty: 1,
        unitPrice: 3.0,
        subtotal: 3.0,
      },
    ],
    totalAmount: 8.0,
    tax: 0.4,
    grandTotal: 8.4,
    receiptNumber: "REC-1004",
    paymentMethod: "cash",
  },
  {
    id: "sale_5",
    date: subDaysISO(today, 1, "T13:20:00Z"),
    items: [
      {
        productId: "prod_13",
        name: "Potatoes",
        qty: 3,
        unitPrice: 0.9,
        subtotal: 2.7,
      },
      {
        productId: "prod_15",
        name: "Onions",
        qty: 2,
        unitPrice: 1.1,
        subtotal: 2.2,
      },
      {
        productId: "prod_1",
        name: "Tomatoes (Roma)",
        qty: 1,
        unitPrice: 3.0,
        subtotal: 3.0,
      },
      {
        productId: "prod_6",
        name: "Cooking Oil 1L",
        qty: 1,
        unitPrice: 3.5,
        subtotal: 3.5,
      },
    ],
    totalAmount: 11.4,
    tax: 0.57,
    grandTotal: 11.97,
    receiptNumber: "REC-1005",
    paymentMethod: "cash",
  },
  {
    id: "sale_6",
    date: subDaysISO(today, 2, "T09:00:00Z"),
    items: [
      {
        productId: "prod_20",
        name: "Coffee 200g",
        qty: 1,
        unitPrice: 5.0,
        subtotal: 5.0,
      },
      {
        productId: "prod_9",
        name: "Mineral Water 500ml",
        qty: 6,
        unitPrice: 0.7,
        subtotal: 4.2,
      },
    ],
    totalAmount: 9.2,
    tax: 0.46,
    grandTotal: 9.66,
    receiptNumber: "REC-1006",
    paymentMethod: "card",
  },
  {
    id: "sale_7",
    date: subDaysISO(today, 2, "T15:10:00Z"),
    items: [
      {
        productId: "prod_17",
        name: "Apples (Red) 1kg",
        qty: 2,
        unitPrice: 2.4,
        subtotal: 4.8,
      },
      {
        productId: "prod_5",
        name: "Bananas",
        qty: 1,
        unitPrice: 1.2,
        subtotal: 1.2,
      },
      {
        productId: "prod_2",
        name: "Whole Milk 1L",
        qty: 4,
        unitPrice: 1.5,
        subtotal: 6.0,
      },
    ],
    totalAmount: 12.0,
    tax: 0.6,
    grandTotal: 12.6,
    receiptNumber: "REC-1007",
    paymentMethod: "mobile",
  },
  {
    id: "sale_8",
    date: subDaysISO(today, 3, "T11:00:00Z"),
    items: [
      {
        productId: "prod_8",
        name: "Wheat Flour 2kg",
        qty: 3,
        unitPrice: 2.5,
        subtotal: 7.5,
      },
      {
        productId: "prod_16",
        name: "Sugar 1kg",
        qty: 2,
        unitPrice: 1.4,
        subtotal: 2.8,
      },
      {
        productId: "prod_10",
        name: "Turmeric Powder 100g",
        qty: 3,
        unitPrice: 1.2,
        subtotal: 3.6,
      },
    ],
    totalAmount: 13.9,
    tax: 0.7,
    grandTotal: 14.6,
    receiptNumber: "REC-1008",
    paymentMethod: "cash",
  },
  {
    id: "sale_9",
    date: subDaysISO(today, 3, "T16:30:00Z"),
    items: [
      {
        productId: "prod_7",
        name: "Eggs (Tray/30)",
        qty: 2,
        unitPrice: 7.0,
        subtotal: 14.0,
      },
      {
        productId: "prod_11",
        name: "Yogurt 500g",
        qty: 2,
        unitPrice: 2.0,
        subtotal: 4.0,
      },
    ],
    totalAmount: 18.0,
    tax: 0.9,
    grandTotal: 18.9,
    receiptNumber: "REC-1009",
    paymentMethod: "card",
  },
  {
    id: "sale_10",
    date: subDaysISO(today, 4, "T10:45:00Z"),
    items: [
      {
        productId: "prod_3",
        name: "Basmati Rice 5kg",
        qty: 1,
        unitPrice: 10.0,
        subtotal: 10.0,
      },
      {
        productId: "prod_6",
        name: "Cooking Oil 1L",
        qty: 2,
        unitPrice: 3.5,
        subtotal: 7.0,
      },
      {
        productId: "prod_19",
        name: "Laundry Detergent 1kg",
        qty: 1,
        unitPrice: 4.0,
        subtotal: 4.0,
      },
    ],
    totalAmount: 21.0,
    tax: 1.05,
    grandTotal: 22.05,
    receiptNumber: "REC-1010",
    paymentMethod: "mobile",
  },
  {
    id: "sale_11",
    date: subDaysISO(today, 5, "T09:30:00Z"),
    items: [
      {
        productId: "prod_1",
        name: "Tomatoes (Roma)",
        qty: 3,
        unitPrice: 3.0,
        subtotal: 9.0,
      },
      {
        productId: "prod_13",
        name: "Potatoes",
        qty: 5,
        unitPrice: 0.9,
        subtotal: 4.5,
      },
      {
        productId: "prod_15",
        name: "Onions",
        qty: 3,
        unitPrice: 1.1,
        subtotal: 3.3,
      },
    ],
    totalAmount: 16.8,
    tax: 0.84,
    grandTotal: 17.64,
    receiptNumber: "REC-1011",
    paymentMethod: "cash",
  },
  {
    id: "sale_12",
    date: subDaysISO(today, 5, "T14:00:00Z"),
    items: [
      {
        productId: "prod_20",
        name: "Coffee 200g",
        qty: 2,
        unitPrice: 5.0,
        subtotal: 10.0,
      },
      {
        productId: "prod_12",
        name: "Dishwashing Liquid 500ml",
        qty: 2,
        unitPrice: 1.8,
        subtotal: 3.6,
      },
    ],
    totalAmount: 13.6,
    tax: 0.68,
    grandTotal: 14.28,
    receiptNumber: "REC-1012",
    paymentMethod: "card",
  },
  {
    id: "sale_13",
    date: subDaysISO(today, 6, "T11:15:00Z"),
    items: [
      {
        productId: "prod_17",
        name: "Apples (Red) 1kg",
        qty: 3,
        unitPrice: 2.4,
        subtotal: 7.2,
      },
      {
        productId: "prod_5",
        name: "Bananas",
        qty: 2,
        unitPrice: 1.2,
        subtotal: 2.4,
      },
      {
        productId: "prod_2",
        name: "Whole Milk 1L",
        qty: 2,
        unitPrice: 1.5,
        subtotal: 3.0,
      },
    ],
    totalAmount: 12.6,
    tax: 0.63,
    grandTotal: 13.23,
    receiptNumber: "REC-1013",
    paymentMethod: "mobile",
  },
  {
    id: "sale_14",
    date: subDaysISO(today, 6, "T16:00:00Z"),
    items: [
      {
        productId: "prod_18",
        name: "Butter 250g",
        qty: 2,
        unitPrice: 3.0,
        subtotal: 6.0,
      },
      {
        productId: "prod_7",
        name: "Eggs (Tray/30)",
        qty: 1,
        unitPrice: 7.0,
        subtotal: 7.0,
      },
    ],
    totalAmount: 13.0,
    tax: 0.65,
    grandTotal: 13.65,
    receiptNumber: "REC-1014",
    paymentMethod: "cash",
  },
  {
    id: "sale_15",
    date: subDaysISO(today, 7, "T09:00:00Z"),
    items: [
      {
        productId: "prod_8",
        name: "Wheat Flour 2kg",
        qty: 2,
        unitPrice: 2.5,
        subtotal: 5.0,
      },
      {
        productId: "prod_16",
        name: "Sugar 1kg",
        qty: 3,
        unitPrice: 1.4,
        subtotal: 4.2,
      },
      {
        productId: "prod_6",
        name: "Cooking Oil 1L",
        qty: 1,
        unitPrice: 3.5,
        subtotal: 3.5,
      },
    ],
    totalAmount: 12.7,
    tax: 0.64,
    grandTotal: 13.34,
    receiptNumber: "REC-1015",
    paymentMethod: "card",
  },
];

export const initialPurchaseOrders: PurchaseOrder[] = [
  {
    id: "po_1",
    supplierId: "sup_1",
    date: subDays(today, 3),
    items: [
      { productId: "prod_1", name: "Tomatoes (Roma)", qty: 30, costPrice: 1.5 },
      { productId: "prod_5", name: "Bananas", qty: 25, costPrice: 0.6 },
    ],
    totalCost: 60.0,
    notes: "Regular weekly restock",
  },
  {
    id: "po_2",
    supplierId: "sup_3",
    date: subDays(today, 5),
    items: [
      { productId: "prod_2", name: "Whole Milk 1L", qty: 50, costPrice: 0.8 },
      { productId: "prod_7", name: "Eggs (Tray/30)", qty: 10, costPrice: 4.0 },
    ],
    totalCost: 80.0,
    notes: "Dairy restock - fresh batch",
  },
  {
    id: "po_3",
    supplierId: "sup_2",
    date: subDays(today, 10),
    items: [
      {
        productId: "prod_3",
        name: "Basmati Rice 5kg",
        qty: 20,
        costPrice: 6.0,
      },
      { productId: "prod_8", name: "Wheat Flour 2kg", qty: 40, costPrice: 1.2 },
      { productId: "prod_6", name: "Cooking Oil 1L", qty: 30, costPrice: 1.8 },
    ],
    totalCost: 228.0,
    notes: "Monthly grocery bulk order",
  },
  {
    id: "po_4",
    supplierId: "sup_2",
    date: subDays(today, 15),
    items: [
      {
        productId: "prod_9",
        name: "Mineral Water 500ml",
        qty: 48,
        costPrice: 0.3,
      },
      { productId: "prod_20", name: "Coffee 200g", qty: 15, costPrice: 2.5 },
    ],
    totalCost: 51.9,
    notes: "Beverage restock",
  },
  {
    id: "po_5",
    supplierId: "sup_1",
    date: subDays(today, 7),
    items: [
      { productId: "prod_13", name: "Potatoes", qty: 60, costPrice: 0.4 },
      { productId: "prod_15", name: "Onions", qty: 50, costPrice: 0.5 },
      {
        productId: "prod_17",
        name: "Apples (Red) 1kg",
        qty: 25,
        costPrice: 1.2,
      },
    ],
    totalCost: 79.0,
    notes: "Fresh produce restock",
  },
];
