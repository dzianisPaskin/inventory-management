import { Router } from "express";
import { getExpensesByCategory } from "../controllers/expenseController";

export const expenseRouter = Router();

expenseRouter.get("/", getExpensesByCategory);
