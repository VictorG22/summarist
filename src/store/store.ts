import { configureStore } from '@reduxjs/toolkit';
import { booksApi } from '@/services/books';


export const store = configureStore({
  reducer: {
    [booksApi.reducerPath]: booksApi.reducer,
  },

    //middleware
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(booksApi.middleware),

    
    // Add slices here
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
