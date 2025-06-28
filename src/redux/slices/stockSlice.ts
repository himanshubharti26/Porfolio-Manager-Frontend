import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import environment from "../../environments";

export interface Stock {
  _id?: string;
  securityName: string;
  value: number;
}

interface StockState {
  stocks: Stock[];
  selectedStock?: Stock | null;
  isLoading: boolean;
  error?: string | null;
}

const initialState: StockState = {
  stocks: [],
  selectedStock: null,
  isLoading: false,
  error: null,
};

export const fetchStocks = createAsyncThunk(
  "stock/fetchStocks",
  async (payload: { search?: string } = {}, { rejectWithValue }) => {
    try {
      let url = `${environment.apiUrl}securities`;
      if (payload.search) {
        url += `?search=${encodeURIComponent(payload.search)}`;
      }
      const token = localStorage.getItem("token");
      const response = await fetch(url, {
        headers: {
          "Authorization": token ? `Bearer ${token}` : "",
        },
      });
      const data = await response.json();
      if (!response.ok) {
        return rejectWithValue(data.message || "Failed to fetch stocks");
      }
      return data.data;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to fetch stocks");
    }
  }
);

export const fetchStockById = createAsyncThunk(
  "stock/fetchStockById",
  async (securityId: string, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${environment.apiUrl}securities/${securityId}`, {
        headers: {
          "Authorization": token ? `Bearer ${token}` : "",
        },
      });
      const data = await response.json();
      if (!response.ok) {
        return rejectWithValue(data.message || "Failed to fetch stock");
      }
      return data.data;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to fetch stock");
    }
  }
);

export const createStock = createAsyncThunk(
  "stock/createStock",
  async (payload: { securityName: string; value: number }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${environment.apiUrl}securities`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok) {
        return rejectWithValue(data.message || "Failed to create stock");
      }
      return data.data;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to create stock");
    }
  }
);

export const updateStock = createAsyncThunk(
  "stock/updateStock",
  async (payload: { securityId: string; securityName: string; value: number }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${environment.apiUrl}securities`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok) {
        return rejectWithValue(data.message || "Failed to update stock");
      }
      return data.data;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to update stock");
    }
  }
);

const stockSlice = createSlice({
  name: "stock",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStocks.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchStocks.fulfilled, (state, action: PayloadAction<Stock[]>) => {
        state.isLoading = false;
        state.stocks = action.payload;
      })
      .addCase(fetchStocks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchStockById.fulfilled, (state, action: PayloadAction<Stock>) => {
        state.selectedStock = action.payload;
      })
      .addCase(createStock.fulfilled, (state, action: PayloadAction<Stock>) => {
        state.stocks.unshift(action.payload);
      })
      .addCase(updateStock.fulfilled, (state, action: PayloadAction<Stock>) => {
        const idx = state.stocks.findIndex(s => s._id === action.payload._id);
        if (idx !== -1) state.stocks[idx] = action.payload;
      });
  },
});

export const stockReducer = stockSlice.reducer;
