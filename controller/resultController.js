
import fancyResult from "../models/fancyResult.js";
import Result from "../models/Result.js";
import { io } from "../server.js";



export const placeBetForUser = async (req, res) => {
// const {key} = req.query;
const {user} = req;
const { gameId,event_id, event_name, market_name, gameName, market_id } = req.body;
// console.log("/cricket", req.body);
try {
    const existBet = await Result.findOne({ gameId, marketName:market_name, eventName: event_name });
    
    if (!existBet) {

        const newResult = new Result({
            gameId: Number(gameId),
            event_id: Number(event_id),
            eventName: event_name, 
            gameName: gameName,
            marketName: market_name,
            market_id: Number(market_id),
            status: 0
        });
        await newResult.save();
        // 🔥 EMIT EVENT
        io.emit("pending_update", {
        type: "normal",
        gameId: gameId
        });
        res.json({ message: "Result created" });
    } else {
        res.json({ message: "Result created" });
    }
} catch (error) {
    // console.error("Error fetching result:", error);
    res.status(500).json({ message: "Server error" });  
}
}


export const placeFancyBetForUser = async (req, res) => {
// const {key} = req.query;
const {user} = req;
const { gameId,event_id, event_name, market_name, market_id } = req.body;
// console.log("/cricket", req.body);
try {
    const existBet = await fancyResult.findOne({ gameId, marketName:market_name, eventName: event_name });
    
    if (!existBet) {

        const newResult = new fancyResult({
            gameId: Number(gameId),
            event_id: Number(event_id),
            eventName: event_name, 
            marketName: market_name,
            market_id: Number(market_id),
            status: 0
        });
        await newResult.save();
        io.emit("pending_update", {
        type: "fancy",
        gameId: gameId
        });
        res.json({ message: "Result created" });
    } else {
        res.json({ message: "Result created" });
    }
} catch (error) {
    // console.error("Error fetching result:", error);
    res.status(500).json({ message: "Server error" });  
}
}



export const getFancyResultForBet = async (req, res) => {
    // console.log("call function");
    
    const  { gameId, market_id,event_name, market_name } = req.body;

    // console.log(" req.body", req.body);
    


    try {
        const existBet = await fancyResult.findOne({ 
            gameId: Number(gameId), 
            market_id: Number(market_id), 
            eventName: event_name, 
            marketName: market_name 
        });

        if (existBet) {
            res.json({ 
                final_result: existBet.final_result, 
                status: existBet.status,
                message: "Result fetched" 
            });
        } else {
            res.status(404).json({ message: "Result not found" });
        }   
    } catch (error) {
        // console.error("Error fetching result:", error);
        res.status(500).json({ message: "Server error" });  
    }
}

export const getResultForBet = async (req, res) => {
    // console.log("call function");
    
    const  { gameId, market_id,event_name, market_name } = req.body;

    // console.log(" req.body", req.body);
    


    try {
        const existBet = await Result.findOne({ 
            gameId: Number(gameId), 
            market_id: Number(market_id), 
            eventName: event_name, 
            marketName: market_name 
        });

        if (existBet) {
            res.json({ 
                final_result: existBet.final_result, 
                status: existBet.status,
                message: "Result fetched" 
            });
        } else {
            res.status(404).json({ message: "Result not found" });
        }   
    } catch (error) {
        // console.error("Error fetching result:", error);
        res.status(500).json({ message: "Server error" });  
    }
}
