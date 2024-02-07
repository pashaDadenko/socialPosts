import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Reaction {
	postId: number;
	reactionType: 'like' | 'dislike';
}

interface ReactionsState {
	reactions: Reaction[];
}

const initialState: ReactionsState = {
	reactions: [],
};

const reactionsSlice = createSlice({
	name: 'reactions',
	initialState,
	reducers: {
		addReaction(state, action: PayloadAction<Reaction>) {
			const existingReactionIndex = state.reactions.findIndex((reaction) => reaction.postId === action.payload.postId);
			if (existingReactionIndex !== -1) {
				const existingReaction = state.reactions[existingReactionIndex];
				if (existingReaction.reactionType === action.payload.reactionType) {
					state.reactions.splice(existingReactionIndex, 1);
				} else {
					state.reactions[existingReactionIndex] = action.payload;
				}
			} else {
				state.reactions.push(action.payload);
			}
		},
	},
});

export const { addReaction } = reactionsSlice.actions;

export default reactionsSlice.reducer;
