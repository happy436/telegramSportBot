import { createSlice } from "@reduxjs/toolkit";
import { formatDateToDayMonthYear } from "../utils/common/formatDate.js";
import {
	addMeasureButton,
	backButton,
	historyButton,
	resultButton,
} from "../bot/template_keyboards/bot.measurementMenu.js";
import {
	measurementButton,
	trainingButton,
	nutritionologyButton,
} from "../bot/template_keyboards/bot.startMenu.js";

const initialState = {
	menus: {
		measurementMenu: [
			[addMeasureButton],
			[historyButton],
			[resultButton, backButton],
		],
		mainMenu: [
			[
				measurementButton,
				/* trainingButton */
			]
			/* [nutritionologyButton], */
		],
	},
};

const buttonSlice = createSlice({
	name: "buttons",
	initialState,
	reducers: {
		// Используйте функциональное обновление для изменения состояния
		changeMeasurementMenu: (state, action) => {
			state.menus.measurementMenu = action.payload;
		},
	},
});

const { reducer: buttonsReducer, actions } = buttonSlice;

const { changeMeasurementMenu } = actions;

export const updateMeasurementMenuButtons =
	() => async (dispatch, getState) => {
		const state = getState();

		const date = formatDateToDayMonthYear(Date.now());
		const measurementData = state.measurements.entities[date];
		const isAllNull = Object.values(measurementData).every(
			(value) => value === null
		);
		const newMenu = [
			[addMeasureButton],
			!isAllNull ? [historyButton] : [],
			!isAllNull ? [resultButton, backButton] : [backButton],
		];

		await dispatch(changeMeasurementMenu(newMenu));
	};

export const getMeasurementMenu = () => (dispatch, getState) =>
	getState().buttons.menus.measurementMenu;

export const getMainMenu = () => (dispatch, getState) =>
	getState().buttons.menus.mainMenu;

export default buttonsReducer;
