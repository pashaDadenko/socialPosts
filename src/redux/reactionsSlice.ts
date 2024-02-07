import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Reaction {
	likes: number;
	dislikes: number;
}

interface ReactionsState {
	[postId: number]: Reaction;
}

const initialState: ReactionsState = {};

const reactionsSlice = createSlice({
	name: 'reactions',
	initialState,
	reducers: {
		toggleReaction(state, action: PayloadAction<{ postId: number; reaction: 'like' | 'dislike' }>) {
			const { postId, reaction } = action.payload;
			const currentReaction = state[postId];

			if (!currentReaction) {
				state[postId] = { likes: 0, dislikes: 0 };
			}

			if (reaction === 'like' && currentReaction?.likes === 1) {
				state[postId].likes = 0;
			} else if (reaction === 'dislike' && currentReaction?.dislikes === 1) {
				state[postId].dislikes = 0;
			} else {
				if (reaction === 'like') {
					state[postId].likes = 1;
					state[postId].dislikes = 0;
				} else {
					state[postId].likes = 0;
					state[postId].dislikes = 1;
				}
			}
		},
	},
});

export const { toggleReaction } = reactionsSlice.actions;

export default reactionsSlice.reducer;
