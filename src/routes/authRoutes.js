import { Router } from "express";
import { checkSignUp } from "../middlewares/authMiddlewares.js";
import { signUp } from "../controllers/authControllers.js";

const authRoutes = Router();

authRoutes.post("/signup", checkSignUp, signUp);

export default authRoutes;