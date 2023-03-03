import { Router } from "express";
import { checkUrl, checkDelete } from "../middlewares/urlMiddlewares.js";
import { shortener, getUrlById, redirect, deleteById, ranking } from "../controllers/urlControllers.js";

const urlRouter = Router();


urlRouter.post("/urls/shorten", checkUrl, shortener);
urlRouter.get("/urls/:id", getUrlById);
urlRouter.get("/urls/open/:shortUrl", redirect);
urlRouter.delete("/urls/:id", checkDelete, deleteById);
urlRouter.get("/ranking", ranking);
export default urlRouter;