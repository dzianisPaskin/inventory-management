import { Router } from "express";
import { getProducts, createProduct } from "../controllers/productController";

export const productsRouter = Router();

productsRouter.get("/", getProducts);
productsRouter.post("/", createProduct);
