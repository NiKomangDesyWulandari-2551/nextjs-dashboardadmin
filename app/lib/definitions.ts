// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.
export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'customer' | 'admin';
};


export type Customer = {
  id: string;
  name: string;
  email: string;
  // image_url: string;
};

export type Admin = {
  id: string;
  name: string;
  username: string;
  password: string;
  role: 'admin';
};

export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: 'food' | 'drink';
};

export type InvoiceItem = {
  name: string;
  quantity: number;
  price: number;
};

export type Invoice = {
  id: string;
  customer_id: string;
  amount: number;
  date: string;
  status: 'pending' | 'paid' | 'cancelled';
  items: InvoiceItem[];
};

export type LatestInvoice = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  amount: string;
  items: InvoiceItem[];
};


export type LatestInvoiceRaw = Omit<LatestInvoice, 'amount'> & {
  amount: number;
};


export type InvoicesTable = {
  id: string;
  customer_id: string;
  name: string;
  email: string;
  image_url: string;
  date: string;
  amount: number;
  status: 'pending' | 'paid' | 'cancelled';
};


export type CustomersTableType = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: number;
  total_paid: number;
};


export type FormattedCustomersTable = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: string;
  total_paid: string;
};


export type CustomerField = {
  id: string;
  name: string;
};


export type InvoiceForm = {
  id: string;
  customer_id: string;
  amount: number;
  status: 'pending' | 'paid' | 'cancelled';
};


export type Revenue = {
  week: string;
  revenue: number;
};
