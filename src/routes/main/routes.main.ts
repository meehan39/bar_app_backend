import { Router } from "express";
import { postBars } from "./bars/data.bars.main";

export const main = Router();

main.post('/main/bars', postBars);
