// src/reducer/zilliSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "./api";

/* =====================
   GET GAME DETAILS
===================== */
export const getGameDetails = createAsyncThunk(
  "zilli/getGameDetails",
  async (params = {}, { rejectWithValue }) => {
    // console.log("params",params);
    
    try {
      const { data } = await api.get("/getgamedetails", { params });
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch game details"
      );
    }
  }
);

/* =====================
   GET ACTIVE PROVIDERS
===================== */
export const getActiveProviders = createAsyncThunk(
  "zilli/getActiveProviders",
  async (params = {}, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/lunches-providers", { params });
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch active providers"
      );
    }
  }
);

/* =====================
   LAUNCH GAME
===================== */
export const launchGame = createAsyncThunk(
  "zilli/launchGame",
  async (body, { rejectWithValue }) => {
    console.log("body",body);
    
    try {
      const { data } = await api.post("/launch-game", body);
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to launch game"
      );
    }
  }
);

/* =====================
   GET USER BALANCE
===================== */
export const getUserBalance = createAsyncThunk(
  "zilli/getUserBalance",
  async (body, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/Userbalance", body);
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to get user balance"
      );
    }
  }
);

/* =====================
   SET USER BALANCE
===================== */
export const setUserBalance = createAsyncThunk(
  "zilli/setUserBalance",
  async (body, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/Setbalance", body);
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to set user balance"
      );
    }
  }
);

/* =====================
   GET BET HISTORY
===================== */
export const getBetHistory = createAsyncThunk(
  "zilli/getBetHistory",
  async (body, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/history", body);
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch bet history"
      );
    }
  }
);

/* =====================
   SEAMLESS CALLBACK (for admin/internal use)
===================== */
export const seamlessCallback = createAsyncThunk(
  "zilli/seamlessCallback",
  async (body, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/huidu/seamless-callback", body);
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to process callback"
      );
    }
  }
);

const zilliSlice = createSlice({
  name: "zilli",

  initialState: {
    gameDetails: null,
    providers: [],
    launchUrl: null,
    userBalance: null,
    setBalanceResult: null,
    betHistory: [],
    callbackResult: null,
    totalGames: 0,
    currentPage: 1,
    perPage: 10,
    loading: false,
    error: null,
  },

  reducers: {
    clearZilliError: (state) => {
      state.error = null;
    },
    clearZilliData: (state) => {
      state.gameDetails = null;
      state.providers = [];
      state.launchUrl = null;
      state.userBalance = null;
      state.setBalanceResult = null;
      state.betHistory = [];
      state.callbackResult = null;
    },
  },

  extraReducers: (builder) => {
    builder
      /* ---------- GET GAME DETAILS ---------- */
      .addCase(getGameDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getGameDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.gameDetails = action.payload;
        if (action.payload.data) {
          state.totalGames = action.payload.total_games || 0;
          state.currentPage = action.payload.current_page || 1;
          state.perPage = action.payload.per_page || 20;
        }
      })
      .addCase(getGameDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ---------- GET ACTIVE PROVIDERS ---------- */
      .addCase(getActiveProviders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getActiveProviders.fulfilled, (state, action) => {
        state.loading = false;
        state.providers = action.payload.providers || [];
      })
      .addCase(getActiveProviders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ---------- LAUNCH GAME ---------- */
      .addCase(launchGame.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(launchGame.fulfilled, (state, action) => {
        state.loading = false;
        state.launchUrl = action.payload;
      })
      .addCase(launchGame.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ---------- GET USER BALANCE ---------- */
      .addCase(getUserBalance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserBalance.fulfilled, (state, action) => {
        state.loading = false;
        state.userBalance = action.payload;
      })
      .addCase(getUserBalance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ---------- SET USER BALANCE ---------- */
      .addCase(setUserBalance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(setUserBalance.fulfilled, (state, action) => {
        state.loading = false;
        state.setBalanceResult = action.payload;
      })
      .addCase(setUserBalance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ---------- GET BET HISTORY ---------- */
      .addCase(getBetHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBetHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.betHistory = action.payload;
      })
      .addCase(getBetHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ---------- SEAMLESS CALLBACK ---------- */
      .addCase(seamlessCallback.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(seamlessCallback.fulfilled, (state, action) => {
        state.loading = false;
        state.callbackResult = action.payload;
      })
      .addCase(seamlessCallback.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearZilliError, clearZilliData } = zilliSlice.actions;
export default zilliSlice.reducer;