import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	/* 	status: null,
	chatId: null,
	name: null,
	surname: null,
	error: null,
	gender: null,
	activity: null, */
};

const usersSlice = createSlice({
	name: "users",
	initialState,
	reducers: {
		userStatus: (state, action) => {
			const { chatId, status } = action.payload;
			state[chatId].status = status;
		},
		userError: (state, action) => {
			const { id, error } = action.payload;
			state[id] = { ...state[id], error: error };
		},
		chatId: (state, action) => {
			const { id, first_name, last_name, username } = action.payload;
			state[id] = {
				...state[id],
				userId: id,
				name: first_name,
				surname: last_name,
				username,
			};
		},
		changeGender: (state, action) => {
			const { chatId, gender } = action.payload;
			state[chatId].gender = gender;
		},
		sportActivity: (state, action) => {
			const { chatId, activityParam } = action.payload;
			state[chatId].activity = activityParam;
		},
	},
});

const { reducer: usersReducer, actions } = usersSlice;
const { userStatus, chatId, userError, changeGender, sportActivity } = actions;

export const changeUserStatus = (payload) => (dispatch, getState) => {
	try {
		dispatch(userStatus(payload));
	} catch (error) {
		dispatch(userError(error.message));
	}
};

export const logIn = (payload) => async (dispatch) => {
	try {
		await dispatch(chatId(payload));
	} catch (error) {
		dispatch(userError({ id: payload.id, error: error.message }));
	}
};

export const inputGender = (payload) => (dispatch) => {
	try {
		dispatch(changeGender(payload));
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

export const getUserStatusById = (chatId) => (dispatch, getState) =>
	getState().users[chatId].status;

export const getUsersData = () => (dispatch, getState) => getState().users;
export const getUserData = (chatId) => (dispatch, getState) =>
	getState().users[chatId];

export default usersReducer;
