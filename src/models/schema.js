import { bigint, decimal, mysqlEnum, mysqlTable, serial, timestamp, varchar } from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 100 }).notNull(),
    email: varchar("email", { length: 150 }).notNull().unique(),
    createdAt: timestamp("created_at").defaultNow(),
});

export const categories = mysqlTable("categories", {
    id: serial("id").primaryKey(),
    category: varchar("category", { length: 50 }).notNull().unique()
});

export const expenses = mysqlTable("expenses", {
    id: serial("id").primaryKey(),
    title: varchar("title", { length: 100 }).notNull(),
    description: varchar("description", { length: 1000 }).notNull(),
    amount: decimal("amount", { precision: 20, scale: 2 }).notNull(),
    paymentMethod: mysqlEnum("payment_method", ["CASH", "DEBIT_CARD", "UPI", "CREDIT_CARD"]).notNull(),
    transactionDate: timestamp("transaction_date").notNull(),
    categoryId: bigint("category_id", { mode: "number", unsigned: true }).notNull().references(() => categories.id),
    userId: bigint("user_id", { mode: "number", unsigned: true }).notNull().references(() => users.id),
});