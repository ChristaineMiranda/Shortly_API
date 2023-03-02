import { Router } from "express";
import { checkUrl } from "../middlewares/urlMiddlewares.js";
import { shortener, getUrlById, redirect } from "../controllers/urlControllers.js";

const urlRoutes = Router();


urlRoutes.post("/urls/shorten", checkUrl, shortener);
urlRoutes.get("/urls/:id", getUrlById);
urlRoutes.get("/urls/open/:shortUrl", redirect);

export default urlRoutes;