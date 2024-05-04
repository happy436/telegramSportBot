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
		addData: (state, action) => {
			const { chatId, data } = action.payload;
			if (!state[chatId]) {
				state[chatId] = { ...data };
			} else {
				state[chatId] = {
					...(state[chatId] || {}), // Перевіряємо наявність entities[date]
					...data,
				};
			}
		}
	},
});

const { reducer: usersReducer, actions } = usersSlice;
const {
	userStatus,
	chatId,
	userError,
	addData,
} = actions;

export const changeUserStatus = (payload) => (dispatch, getState) => {
	try {
		dispatch(userStatus(payload));
	} catch (error) {
		dispatch(userError({ id: payload.id, error: error.message }));
	}
};

export const logIn = (payload) => async (dispatch) => {
	try {
		await dispatch(chatId(payload));
	} catch (error) {
		dispatch(userError({ id: payload.id, error: error.message }));
	}
};

export const inputData = (payload) => (dispatch) => {
	try {
		dispatch(addData(payload));
	} catch (error) {
		dispatch(userError({ id: payload.id, error: error.message }));
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
