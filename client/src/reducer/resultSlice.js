// src/reducer/resultSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "./api";

/* =====================
   PLACE BET
===================== */
export const placeBet = createAsyncThunk(
  "result/placeBet",
  async (body, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/placed_bets", body);
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to place bet"
      );
    }
  }
);

/* =====================
   GET RESULT
===================== */
export const getResult = createAsyncThunk(
  "result/getResult",
  async (body, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/get-result", body);
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to get result"
      );
    }
  }
);

/* =====================
   PLACE FANCY BET
===================== */
export const placeFancyBet = createAsyncThunk(
  "result/placeFancyBet",
  async (body, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/placed_fancy_bets", body);
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to place fancy bet"
      );
    }
  }
);

/* =====================
   GET FANCY RESULT
===================== */
export const getFancyResult = createAsyncThunk(
  "result/getFancyResult",
  async (body, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/get-fancy-result", body);
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to get fancy result"
      );
    }
  }
);

const resultSlice = createSlice({
  name: "result",

  initialState: {
    placedBet: null,
    result: null,
    placedFancyBet: null,
    fancyResult: null,
    loading: false,
    error: null,
  },

  reducers: {
    clearResultError: (state) => {
      state.error = null;
    },
    clearResultData: (state) => {
      state.placedBet = null;
      state.result = null;
      state.placedFancyBet = null;
      state.fancyResult = null;
    },
  },

  extraReducers: (builder) => {
    builder
      /* ---------- PLACE BET ---------- */
      .addCase(placeBet.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(placeBet.fulfilled, (state, action) => {
        state.loading = false;
        state.placedBet = action.payload;
      })
      .addCase(placeBet.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ---------- GET RESULT ---------- */
      .addCase(getResult.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getResult.fulfilled, (state, action) => {
        state.loading = false;
        state.result = action.payload;
      })
      .addCase(getResult.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ---------- PLACE FANCY BET ---------- */
      .addCase(placeFancyBet.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(placeFancyBet.fulfilled, (state, action) => {
        state.loading = false;
        state.placedFancyBet = action.payload;
      })
      .addCase(placeFancyBet.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ---------- GET FANCY RESULT ---------- */
      .addCase(getFancyResult.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFancyResult.fulfilled, (state, action) => {
        state.loading = false;
        state.fancyResult = action.payload;
      })
      .addCase(getFancyResult.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearResultError, clearResultData } = resultSlice.actions;
export default resultSlice.reducer;