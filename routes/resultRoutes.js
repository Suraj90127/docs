import express from "express";
import { getFancyResultForBet, getResultForBet, placeBetForUser, placeFancyBetForUser } from "../controller/resultController.js";
import { cricketGameValidate } from "../middelware/validateGameAccess.js";

const router = express.Router();


router.post("/placed_bets",cricketGameValidate, placeBetForUser);
router.post("/get-result",cricketGameValidate, getResultForBet);
router.post("/placed_fancy_bets",cricketGameValidate, placeFancyBetForUser);
router.post("/get-fancy-result",cricketGameValidate, getFancyResultForBet);

export default router;
