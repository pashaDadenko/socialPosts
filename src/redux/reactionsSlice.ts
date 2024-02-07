import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Reaction {
	likes: number;
	dislikes: number;
	recentlyLiked: boolean;
	recentlyDisliked: boolean;
}

interface ReactionsState {
	[postId: number]: Reaction;
}

const reactionsSlice = createSlice({
	name: 'reactions',
	initialState: <ReactionsState>{},
	reducers: {
		toggleReaction(state, action: PayloadAction<{ postId: number; reaction: 'like' | 'dislike' }>) {
			const { postId, reaction } = action.payload;
			const currentReaction = state[postId];

			if (!currentReaction) {
				state[postId] = { likes: 0, dislikes: 0, recentlyLiked: false, recentlyDisliked: false };
			}

			if (reaction === 'like' && !currentReaction.recentlyLiked && !currentReaction.recentlyDisliked) {
				state[postId].likes++;
				state[postId].recentlyLiked = true;
			} else if (reaction === 'dislike' && !currentReaction.recentlyDisliked && !currentReaction.recentlyLiked) {
				state[postId].dislikes++;
				state[postId].recentlyDisliked = true;
			} else if (reaction === 'like' && currentReaction.recentlyLiked) {
				state[postId].likes--;
				state[postId].recentlyLiked = false;
			} else if (reaction === 'like' && currentReaction.recentlyDisliked) {
				state[postId].likes++;
				state[postId].dislikes--;
				state[postId].recentlyLiked = true;
				state[postId].recentlyDisliked = false;
			} else if (reaction === 'dislike' && currentReaction.recentlyDisliked) {
				state[postId].dislikes--;
				state[postId].recentlyDisliked = false;
			} else if (reaction === 'dislike' && currentReaction.recentlyLiked) {
				state[postId].dislikes++;
				state[postId].likes--;
				state[postId].recentlyDisliked = true;
				state[postId].recentlyLiked = false;
			}
		},
		setReactions: (state, action: PayloadAction<{ postId: number; likes: number; dislikes: number }>) => {
			const { postId, likes, dislikes } = action.payload;
			state[postId] = { ...state[postId], likes, dislikes };
		},
	},
});

export const { toggleReaction, setReactions } = reactionsSlice.actions;

export default reactionsSlice.reducer;
