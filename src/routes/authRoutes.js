import { Router } from "express";
import { checkSignIn, checkSignUp } from "../middlewares/authMiddlewares.js";
import { signUp, signIn } from "../controllers/authControllers.js";

const authRouter = Router();

authRouter.post("/signup", checkSignUp, signUp);
authRouter.post("/signin", checkSignIn, signIn);

export default authRouter;