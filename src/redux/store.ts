import { configureStore } from '@reduxjs/toolkit';
import { postsApi } from './api';
import reactionsReducer from './reactionsSlice';

export const store = configureStore({
	reducer: {
		reactions: reactionsReducer,
		[postsApi.reducerPath]: postsApi.reducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(postsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
