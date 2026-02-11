import express from "express";
import expenseRoutes from "./routes/expense.route.js";
import { errorMiddleware } from "./middleware/error.middleware.js";

const app = express();
app.use(express.json());

app.use("/api/expenses", expenseRoutes);
app.use(errorMiddleware);

export default app;