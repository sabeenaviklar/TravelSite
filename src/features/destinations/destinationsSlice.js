import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const fetchDestinations = createAsyncThunk(
  'destinations/fetchDestinations',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/destinations');
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchDestinationById = createAsyncThunk(
  'destinations/fetchDestinationById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/destinations/${id}`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  destinations: [],
  selectedDestination: null,
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const destinationsSlice = createSlice({
  name: 'destinations',
  initialState,
  reducers: {
    clearSelectedDestination: (state) => {
      state.selectedDestination = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDestinations.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDestinations.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.destinations = action.payload;
      })
      .addCase(fetchDestinations.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message || 'Failed to fetch destinations';
      })
      .addCase(fetchDestinationById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDestinationById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selectedDestination = action.payload;
      })
      .addCase(fetchDestinationById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message || 'Failed to fetch destination';
      });
  },
});

export const { clearSelectedDestination } = destinationsSlice.actions;
export default destinationsSlice.reducer;
