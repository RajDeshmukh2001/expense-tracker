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