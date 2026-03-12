import axios from "axios";

export const getCricketData = async (req, res) => {
  try {
    // 🔥 BACKEND → BACKEND API CALL
    const response = await axios.get(
      "https://aura444.org/api/cricket/matches",
      {
        timeout: 10000, // safety
      }
    );

    // console.log("response", response);
    

    // ✅ aura444 API se jo data aata hai
    // expected: { success: true, matches: [...] }
    if (response.data?.success) {
      return res.status(200).json({
        success: true,
        matches: response.data.matches,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Failed to fetch matches from aura API",
      });
    }
  } catch (err) {
    console.error("Error fetching matches from aura API:", err.message);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


export const fetchCrirketBettingData = async (req, res) => {
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
      `https://aura444.org/api/cricket/betting?gameid=${gameid}`,
      {
        timeout: 10000, // safety timeout
      }
    );

    const data = response.data;

    /**
     * aura444 betting API expected format:
     * {
     *   success: true,
     *   data: {...}
     * }
     */

    if (data?.success) {
      return res.status(200).json({
        success: true,
        data: data.data, // 👈 IMPORTANT: sirf betting data bhejo
      });
    }

    return res.status(400).json({
      success: false,
      message: "Invalid response from aura betting API",
    });
  } catch (error) {
    console.error("Error in fetchCrirketBettingData:", error.message);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
