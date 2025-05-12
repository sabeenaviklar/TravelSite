// store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import destinationsReducer from '../features/destinations/destinationsSlice';
import housesReducer from '../features/houses/housesSlice';
import bookingsReducer from '../features/bookings/bookingsSlice';

// Create the store first, then export it
const store = configureStore({
  reducer: {
    auth: authReducer,
    destinations: destinationsReducer,
    houses: housesReducer,
    bookings: bookingsReducer,
  },
});

export default store;
