import { z } from "zod";

const paymentMethod = ["CASH", "DEBIT_CARD", "UPI", "CREDIT_CARD"];

const isWithinYear = (date) => {
    const now = new Date();
    const currentMonth = now.getUTCMonth();
    const currentYear = now.getUTCFullYear();

    const fyStartYear = currentMonth >= 3 ? currentYear : currentYear - 1;
    const fyEndYear = fyStartYear + 1;

    const fyStart = new Date(fyStartYear, 3, 1);
    const fyEnd = new Date(fyEndYear, 2, 31);

    return date >= fyStart && date <= fyEnd;
};

export const createExpenseSchema = z.object({
    title: z.string("Title must be a string").trim().min(1, "Title is required").max(100, "Title cannot exceed 100 characters"),
    description: z.string("Description must be a string").min(1, "Description is required").max(1000, "Description cannot exceed 1000 characters"),
    amount: z.number("Amount must be a number").min(1, "Amount is required").max(999,999,999,999,999.99, "Amount is too large").positive("Amount must be greater than zero"),
    category: z.string("Category must be a string").trim().min(1, "Category is required").toUpperCase(),
    paymentMethod: z.refine((val) => paymentMethod.includes(val.toUpperCase()), { message: `Invalid payment method. Must be ${paymentMethod.join(", ")}` }),
    transactionDate: z.coerce.date("Transaction date must be a valid date").refine(isWithinYear, "Transaction date must be within the current financial year"),
    userId: z.number("User ID must be a number").int("User ID must be a whole number").positive("User ID must be a positive number")
});