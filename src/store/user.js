import { createSlice } from "@reduxjs/toolkit";

const initialState = { status: null, chatId: null, error: null };
const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		userStatus: (state, action) => {
			state.status = action.payload;
		},
		userError: (state, action) => {
			state.error = action.payload;
		},
		chatId: (state, action) => {
			state.chatId = action.payload;
		},
	},
});

const { reducer: userReducer, actions } = userSlice;
const { userStatus, chatId, userError } = actions;

export const changeUserStatus = (payload) => (dispatch,getState) => {
	try {
        //console.log(getState().user.chatId ,getState().user.status)
		dispatch(userStatus(payload));
	} catch (error) {
		dispatch(userError(error.message));
	}
};

export const logIn = (payload) => (dispatch) => {
	try {
		dispatch(chatId(payload));
	} catch (error) {
		dispatch(userError(error.message));
	}
};

export const getUserStatus = () => (dispatch, getState) =>
	getState().user.status;

export const getChatId = () => (dispatch, getState) =>
	getState().user.chatId;

export default userReducer;
