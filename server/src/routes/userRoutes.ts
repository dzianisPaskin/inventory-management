import { Router } from "express";
import { getUsers } from "../controllers/userController";

export const usersRouter = Router();

usersRouter.get("/", getUsers);
