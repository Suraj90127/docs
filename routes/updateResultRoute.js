import express from "express";
import { getPendingFancyResults, getPendingFancyResultsByGameId, getPendingResultsByGameId, getPendingResultsWithEvents, updateRresultForBet, updateRresultForFancyBet } from "../controller/updateResultController.js";

const router = express.Router();

router.post("/update_result", updateRresultForBet);
router.post("/update_fancy_result", updateRresultForFancyBet);
router.get("/pending_bets", getPendingResultsByGameId);
router.get("/pending_fancy_bets_by_game", getPendingFancyResultsByGameId);
router.get("/pending_events", getPendingResultsWithEvents);
router.get("/pending_fancy_bets", getPendingFancyResults);

export default router;