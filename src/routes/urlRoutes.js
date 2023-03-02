import { Router } from "express";
import { checkUrl } from "../middlewares/urlMiddlewares.js";
import { shortener } from "../controllers/urlControllers.js";

const urlRoutes = Router();


urlRoutes.post("/urls/shorten", checkUrl, shortener);

export default urlRoutes;