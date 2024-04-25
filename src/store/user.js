import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	status: null,
	chatId: null,
	name: null,
	surname: null,
	error: null,
	gender: null,
	activity: null,
};
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
		gender: (state, action) => {
			state.gender = action.payload;
		},
		sportActivity: (state, action) => {
			state.activity = action.payload;
		},
	},
});

const { reducer: userReducer, actions } = userSlice;
const { userStatus, chatId, userError, gender, sportActivity } = actions;

export const changeUserStatus = (payload) => (dispatch, getState) => {
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

export const inputGender = (payload) => (dispatch) => {
	try {
		dispatch(gender(payload));
	} catch (error) {
		dispatch(userError(error.message));
	}
};

export const inputSportActivity = (payload) => (dispatch) => {
	try {
		dispatch(sportActivity(payload));
	} catch (error) {
		dispatch(userError(error.message));
	}
};

// * getters

export const getGender = () => (dispatch, getState) => getState().user.gender;
export const getSportActivity = () => (dispatch, getState) =>
	getState().user.activity;

export const getUserStatus = () => (dispatch, getState) =>
	getState().user.status;

export const getUserData = () => (dispatch, getState) => getState().user;

export const getChatId = () => (dispatch, getState) => getState().user.chatId;

export default userReducer;
