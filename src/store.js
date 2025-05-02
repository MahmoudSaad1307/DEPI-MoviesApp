import { configureStore } from '@reduxjs/toolkit';
import filtersReducer from './features/filtersSlice';

export const store = configureStore({
    reducer: {
        filters: filtersReducer,
        // Add other reducers here...
    },
});
