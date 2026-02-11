import { z } from "zod";

const paymentMethod = ["CASH", "DEBIT_CARD", "UPI", "CREDIT_CARD"];

const isWithinYear = (date) => {
    const now = new Date();
    const year = now.getFullYear();
    const yearStart = new Date(year, 0, 1);
    const yearEnd = new Date(year, 11, 31);

    return date >= yearStart && date <= yearEnd;
};

export const createExpenseSchema = z.object({
    id: z.undefined("Expense ID cannot be set manually"),
    title: z.string("Title must be a string").trim().min(1, "Title is required").max(100, "Title cannot exceed 100 characters"),
    description: z.string("Description must be a string").min(1, "Description is required").max(1000, "Description cannot exceed 1000 characters"),
    amount: z.number("Amount must be a number").min(1, "Amount is required").positive("Amount must be greater than zero"),
    category: z.string("Category must be a string").trim().min(1, "Category is required").toUpperCase(),
    paymentMethod: z.refine((val) => paymentMethod.includes(val.toUpperCase()), { message: `Invalid payment method. Must be ${paymentMethod.join(", ")}` }),
    transactionDate: z.coerce.date("Transaction date must be a valid date").refine(isWithinYear, "Transaction date must be within the current year"),
    userId: z.number("User ID must be a number").int("User ID must be a whole number").positive("User ID must be a positive number")
});

export const updateExpenseSchema = createExpenseSchema
    .extend({ id: z.undefined("Expense ID cannot be updated") })
    .required({ userId: true })
    .partial()
    .refine((data) => Object.keys(data).length > 0, { message: "At least one field must be provided for update" });