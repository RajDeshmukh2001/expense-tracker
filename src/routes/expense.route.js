import { Router } from "express";
import { validate } from "../middleware/validate.middleware.js";
import { createExpenseSchema } from "../validations/expense.validation.js";
import * as controller from "../controllers/expense.controller.js";

const router = Router();

router.post("/", validate(createExpenseSchema), controller.createExpense);

export default router;