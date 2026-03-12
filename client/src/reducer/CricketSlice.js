import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "./api";


/* =====================
   GET GAMES
===================== */
export const getCricketProvider = createAsyncThunk(
  "cricket/getCricketProvider",
  async (params = {}, { rejectWithValue }) => {
    try {
      // params = { page, size, provider, game_type, id }
      const { data } = await api.get("get-cricket-providers",{params});
    //   console.log("data", data);
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch games"
      );
    }
  }
);

/* ================= CREATE CRICKET ACCESS ================= */

export const createCricketAccess = createAsyncThunk(
  "cricketAccess/create",
  async ({ months, price }, { rejectWithValue }) => {
    try {
      const { data } = await api.post(
        "/cricket-game/access",
        { months, price }
      );
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to create access"
      );
    }
  }
);

/* ================= GET CRICKET ACCESS BY USER ================= */
export const getCricketAccessProvider = createAsyncThunk(
  "cricketAccess/provider",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get(
        `/get-cricket/access-provider`,
       
      );
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch access providers"
      );
    }
  }
);

export const getCricketMatches = createAsyncThunk(
  "cricket/getMatches",
  async (params = {}, { rejectWithValue }) => {
    // console.log("pp",params);
    
    try {
      const { data } = await api.get("/cricket/game-data", { params });
      return data;
    } catch (err) {
      return rejectWithValue(

        err.response?.data?.message
      );
    }
  }
);

/* =====================
   GET CRICKET BETTING DATA
===================== */
export const getCricketBettingData = createAsyncThunk(
  "cricket/getBettingData",
  async ({ gameid,key }, { rejectWithValue }) => {
    // console.log("gameid",gameid,key);
    
    try {
      const { data } = await api.get("/cricket-match/game-data", { 
        params: { gameid, key } 
      });
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch cricket betting data"
      );
    }
  }
);

/* =====================
   GET TENNIS MATCHES
===================== */
export const getTennisMatches = createAsyncThunk(
  "cricket/getTennisMatches",
  async (params = {}, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/tannis/game-data", { params });
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch tennis matches"
      );
    }
  }
);

/* =====================
   GET TENNIS BETTING DATA
===================== */
export const getTennisBettingData = createAsyncThunk(
  "cricket/getTennisBettingData",
  async ({ gameid,key }, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/tannis-match/game-data", { 
        params: { gameid,key } 
      });
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch tennis betting data"
      );
    }
  }
);

/* =====================
   GET SOCCER MATCHES
===================== */
export const getSoccerMatches = createAsyncThunk(
  "cricket/getSoccerMatches",
  async (params = {}, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/socer/game-data", { params });
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch soccer matches"
      );
    }
  }
);

/* =====================
   GET SOCCER BETTING DATA
===================== */
export const getSoccerBettingData = createAsyncThunk(
  "cricket/getSoccerBettingData",
  async ({ gameid,key }, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/socer-match/game-data", { 
        params: { gameid, key } 
      });
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch soccer betting data"
      );
    }
  }
);




const cricketSlice = createSlice({
  name: "cricket",

  initialState: {
    currentPage: 1,
    perPage: 10,
    providers: [],
    AccessProviders: [],
    totalPayAmount: null,
    matches: [],
    bettingData: null,
    tennisMatches: [],
    tennisBettingData: null,
    soccerMatches: [],
    soccerBettingData: null,
    loading: false,
    error: null,
  },

  reducers: {
    clearGameError: (state) => {
      state.error = null;
    },
    clearCricketError: (state) => {
      state.error = null;
    },
    clearCricketData: (state) => {
      state.matches = [];
      state.bettingData = null;
      state.tennisMatches = [];
      state.tennisBettingData = null;
      state.soccerMatches = [];
      state.soccerBettingData = null;
    },
  },

  extraReducers: (builder) => {
    builder
      /* ---------- GET CRICKET PROVIDERS ---------- */
      .addCase(getCricketProvider.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCricketProvider.fulfilled, (state, action) => {
        state.loading = false;
        console.log("payload", action.payload);
        state.providers = action.payload.data;
        // state.currentPage = action.payload.current_page;
        // state.perPage = action.payload.per_page;
      })
      .addCase(getCricketProvider.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
       .addCase(createCricketAccess.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCricketAccess.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.totalPayAmount = action.payload.totalPayAmount;
      })
      .addCase(createCricketAccess.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
       .addCase(getCricketAccessProvider.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCricketAccessProvider.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.AccessProviders = action.payload.data;
      })
      .addCase(getCricketAccessProvider.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
       /* ---------- GET CRICKET MATCHES ---------- */
      .addCase(getCricketMatches.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCricketMatches.fulfilled, (state, action) => {
        state.loading = false;
        state.matches = action.payload;
      })
      .addCase(getCricketMatches.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ---------- GET CRICKET BETTING DATA ---------- */
      .addCase(getCricketBettingData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCricketBettingData.fulfilled, (state, action) => {
        state.loading = false;
        state.bettingData = action.payload;
      })
      .addCase(getCricketBettingData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ---------- GET TENNIS MATCHES ---------- */
      .addCase(getTennisMatches.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTennisMatches.fulfilled, (state, action) => {
        state.loading = false;
        state.tennisMatches = action.payload;
      })
      .addCase(getTennisMatches.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ---------- GET TENNIS BETTING DATA ---------- */
      .addCase(getTennisBettingData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTennisBettingData.fulfilled, (state, action) => {
        state.loading = false;
        state.tennisBettingData = action.payload;
      })
      .addCase(getTennisBettingData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ---------- GET SOCCER MATCHES ---------- */
      .addCase(getSoccerMatches.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSoccerMatches.fulfilled, (state, action) => {
        state.loading = false;
        state.soccerMatches = action.payload;
      })
      .addCase(getSoccerMatches.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ---------- GET SOCCER BETTING DATA ---------- */
      .addCase(getSoccerBettingData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSoccerBettingData.fulfilled, (state, action) => {
        state.loading = false;
        state.soccerBettingData = action.payload;
      })
      .addCase(getSoccerBettingData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearGameError } = cricketSlice.actions;
export default cricketSlice.reducer;
