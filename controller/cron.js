import cron from "node-cron";
import { handleBetLossGGR } from "./GameLaunchController.js";

export const cronJobGame1p = () => {

  // Run every minute
  cron.schedule("*/1 * * * *", async () => {

    console.log("cron runnn")

    try {

    //   console.log("hello suraj sir");

      await handleBetLossGGR();

    } catch (error) {

      console.error("Error in updateFancyBetResult:", error);

    }

  });

};