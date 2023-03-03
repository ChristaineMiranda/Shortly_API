import { Router } from "express";
import { checkUrl } from "../middlewares/urlMiddlewares.js";
import { shortener, getUrlById, redirect } from "../controllers/urlControllers.js";

const urlRouter = Router();


urlRouter.post("/urls/shorten", checkUrl, shortener);
urlRouter.get("/urls/:id", getUrlById);
urlRouter.get("/urls/open/:shortUrl", redirect);
export default urlRouter;