import { Router } from "express";
import { validate } from "../middleware/validate.middleware.js";
import { createExpenseSchema, updateExpenseSchema } from "../validations/expense.validation.js";
import * as controller from "../controllers/expense.controller.js";

const router = Router();

router.post("/", validate(createExpenseSchema), controller.createExpense);
router.get("/:id", controller.getExpenseById);
router.patch("/:id", validate(updateExpenseSchema), controller.updateExpense);

export default router;