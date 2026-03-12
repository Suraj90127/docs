import axios from "axios";


export const fetchSoccerData = async (req, res) => {
  try {
    // 🔥 BACKEND → BACKEND CALL
    const response = await axios.get(
      "https://aura444.org/api/soccer",
      {
        timeout: 10000, // safety
      }
    );

    const data = response.data;

    /**
     * Expected aura444 soccer API format:
     * {
     *   success: true,
     *   data: [...]
     * }
     */

    if (data?.success) {
      return res.status(200).json({
        success: true,
        data: data.data, // 👈 direct forward
      });
    }

    return res.status(400).json({
      success: false,
      message: "Invalid response from aura soccer API",
    });
  } catch (error) {
    console.error("Error fetching soccer data from aura API:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch soccer data",
    });
  }
};


export const fetchsoccerBettingData = async (req, res) => {
  const { gameid } = req.query;

  if (!gameid) {
    return res.status(400).json({
      success: false,
      message: "Missing gameid",
    });
  }

  try {
    // 🔥 BACKEND → BACKEND CALL
    const response = await axios.get(
      `https://aura444.org/api/soccer/betting?gameid=${gameid}`,
      {
        timeout: 10000,
      }
    );

    const data = response.data;

    /**
     * Expected aura444 soccer betting format:
     * {
     *   success: true,
     *   data: {...}
     * }
     */

    if (data?.success) {
      return res.status(200).json({
        success: true,
        data: data.data, // 👈 sirf betting data forward
      });
    }

    return res.status(400).json({
      success: false,
      message: "Invalid response from aura soccer betting API",
    });
  } catch (error) {
    console.error("Error in fetchsoccerBettingData:", error.message);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
