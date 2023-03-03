import { Router } from "express";
import { checkUser } from "../middlewares/userMiddleware.js";
import { dataUser } from "../controllers/userControllers.js";

const userRouter = Router();

userRouter.get("/users/me", checkUser, dataUser);

export default userRouter;