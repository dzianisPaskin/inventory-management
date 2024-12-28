import { Router } from "express";
import { getDashboardMetrics } from "../controllers/dashboardController";

export const dashboardRouter = Router();

dashboardRouter.get("/", getDashboardMetrics);
