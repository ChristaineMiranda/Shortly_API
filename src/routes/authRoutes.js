import { Router } from "express";
import { checkSignIn, checkSignUp } from "../middlewares/authMiddlewares.js";
import { signUp, signIn } from "../controllers/authControllers.js";

const authRoutes = Router();

authRoutes.post("/signup", checkSignUp, signUp);
authRoutes.post("/signin", checkSignIn, signIn);

export default authRoutes;