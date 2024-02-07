import { configureStore } from '@reduxjs/toolkit';
import { postsApi } from './api';
import reactions from './reactionsSlice';

export const store = configureStore({
	reducer: {
		reactions,
		[postsApi.reducerPath]: postsApi.reducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(postsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
