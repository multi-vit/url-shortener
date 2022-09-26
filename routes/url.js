import express from "express";
import { createAndSaveUrl, findUrl } from "../controllers/url.controller.js";

const router = express.Router();

router.post("/", createAndSaveUrl);

router.get("/:number", findUrl);

export default router;
