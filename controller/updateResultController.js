import fancyResult from "../models/fancyResult.js";
import Result from "../models/Result.js";
import FancyResult from "../models/fancyResult.js";
import { io } from "../server.js";


// export const updateRresultForBet = async (req, res) => {

    
//     const {status, team_name, gameId, market_id} = req.body;
//     try {
//         const existBet = await Result.findOne({ gameId: Number(gameId), market_id: Number(market_id) });
//         if (existBet) {
//             existBet.final_result = team_name;
//             existBet.status = status;
//             await existBet.save();
//             res.json({ message: "Result updated" });
//         } else {
//             res.status(404).json({ message: "Result not found" });
//         }
//     } catch (error) {
//         console.error("Error updating result:", error);
//         res.status(500).json({ message: "Server error" });  
//     }
// }
export const updateRresultForBet = async (req, res) => {

    
    const {status, team_name, gameId, market_id} = req.body;
    try {
        const existBet = await Result.findOne({ gameId: Number(gameId), market_id: Number(market_id) });
        if (existBet) {
            existBet.final_result = team_name;
            existBet.status = status;
            await existBet.save();
            io.emit("result_updated", {
              type: "normal",
              gameId: gameId
            });
            res.json({ message: "Result updated" });
        } else {
            res.status(404).json({ message: "Result not found" });
        }
    } catch (error) {
        console.error("Error updating result:", error);
        res.status(500).json({ message: "Server error" });  
    }
}



// export const updateRresultForFancyBet = async (req, res) => {
//     const {status, score, gameId, market_id} = req.body;
//     try {
//         const existBet = await fancyResult.findOne({ gameId: Number(gameId), market_id: Number(market_id) });
//         if (existBet) {
//             existBet.final_result = score;
//             existBet.status = status;
//             await existBet.save();
//             res.json({ message: "Result updated" });
//         } else {
//             res.status(404).json({ message: "Result not found" });
//         }
//     } catch (error) {
//         console.error("Error updating result:", error);
//         res.status(500).json({ message: "Server error" });  
//     }
// }
export const updateRresultForFancyBet = async (req, res) => {
    const {status, score, gameId, market_id} = req.body;
    try {
        const existBet = await fancyResult.findOne({ gameId: Number(gameId), market_id: Number(market_id) });
        if (existBet) {
            existBet.final_result = score;
            existBet.status = status;
            await existBet.save();
            io.emit("result_updated", {
            type: "fancy",
            gameId: gameId
          });
            res.json({ message: "Result updated" });
        } else {
            res.status(404).json({ message: "Result not found" });
        }
    } catch (error) {
        console.error("Error updating result:", error);
        res.status(500).json({ message: "Server error" });  
    }
}



export const getPendingResultsWithEvents = async (req, res) => {
  try {
    const data = await Result.aggregate([
      {
        $match: {
          status: 0, // only pending bets
        },
      },
      {
        $group: {
          _id: {
            gameName: "$gameName",
            eventName: "$eventName",
            gameId: "$gameId",
          },
          pendingBetCount: { $sum: 1 },
          pendingBetAmount: { $sum: "$price" },
        },
      },
      {
        $group: {
          _id: "$_id.gameName",
          events: {
            $push: {
              eventName: "$_id.eventName",
              pendingBetCount: "$pendingBetCount",
              pendingBetAmount: "$pendingBetAmount",
              gameId: "$_id.gameId",
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          gameName: "$_id",
          events: 1,
        },
      },
      {
        $sort: { gameName: 1 },
      },
    ]);

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: err.message,
    });
  }
};


export const getPendingFancyResults = async (req, res) => {
  try {
    const data = await FancyResult.aggregate([
      {
        $match: {
          status: 0, // only pending
        },
      },
      {
        $group: {
          _id: {
            eventName: "$eventName",
            marketName: "$marketName",
            gameId: "$gameId",
          },
          pendingMarketCount: { $sum: 1 },
        },
      },
      {
        $group: {
          _id: "$_id.eventName",
          markets: {
            $push: {
              marketName: "$_id.marketName",
              pendingMarketCount: "$pendingMarketCount",
              gameId: "$_id.gameId",
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          eventName: "$_id",
          markets: 1,
        },
      },
      {
        $sort: { eventName: 1 },
      },
    ]);

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: err.message,
    });
  }
};


export const getPendingResultsByGameId = async (req, res) => {
  const { gameId } = req.query;

  if (!gameId) {
    return res.status(400).json({
    success: false,
    message: "gameId is required",
    });
  }

  try {
   const data = await Result.find({ gameId: Number(gameId), status: 0 }); // only pending bets
    return res.status(200).json({
    success: true,
    data,
   });
  } catch (err) {
    return res.status(500).json({
    success: false,
    message: "Server Error",
    error: err.message,
    });
  }
};

    
export const getPendingFancyResultsByGameId = async (req, res) => {
  const { gameId } = req.query;

  if (!gameId) {
    return res.status(400).json({
      success: false,
      message: "gameId is required",
    });
  }

  try {
    const data = await FancyResult.find({ gameId: Number(gameId), status: 0 }); // only pending bets
    return res.status(200).json({
      success: true,
      data,
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: err.message,
    });
  }
};