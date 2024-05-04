import { createSlice } from "@reduxjs/toolkit";
import { formatDateToDayMonthYear } from "../utils/common/formatDate.js";
import {
	addMeasureButton,
	backButton,
	historyButton,
	resultButton,
} from "../bot/template_keyboards/bot.measurementMenu.js";
import {
	activ,
	activityButton,
	age,
	ageButton,
	gender,
	genderButton,
	weight,
	weightButton,
} from "../bot/template_keyboards/bot.nutritionologyQuestion.js";
import { getTodayMeasurements } from "./measurement.js";

const initialState = {
	menus: {
		measurementMenu: [
			[addMeasureButton],
			[historyButton],
			[resultButton, backButton],
		],
		nutritionologyQuestionsMenu: [
			[genderButton, ageButton],
			[activityButton, weightButton],
			[backButton],
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
		changeNutritionologyQuestionsMenu: (state, action) => {
			state.menus.nutritionologyQuestionsMenu = action.payload;
		},
	},
});

const { reducer: buttonsReducer, actions } = buttonSlice;

const { changeMeasurementMenu, changeNutritionologyQuestionsMenu } = actions;

export const updateMeasurementMenuButtons =
	(chatId) => async (dispatch, getState) => {
		const measurementData = dispatch(getTodayMeasurements(chatId))
		const isAllNull = Object.values(measurementData).every(
			(value) => value === null
		);
		const newMenu = [
			[addMeasureButton],
			// !isAllNull ? [historyButton] : [],
			!isAllNull ? [resultButton, backButton] : [backButton],
		];

		await dispatch(changeMeasurementMenu(newMenu));
	};

export const updateMeasurementButtons = () => async (dispatch, getState) => {};

export const updateNutritiologyQuestionMenu =
	(chatId) => async (dispatch, getState) => {
		const keyboard = getState().buttons.menus.nutritionologyQuestionsMenu;
		const user = getState().users[chatId];
		const newMenu = keyboard.map((row) =>
			row.map((button) => {
				if (button.text === gender) {
					if (user.hasOwnProperty("gender")) {
						return { ...button, text: "✅ " + button.text };
					}
				}
				if (button.text === age) {
					if (user.hasOwnProperty("ageCalcKcal")) {
						return { ...button, text: "✅ " + button.text };
					}
				}
				if (button.text === activ) {
					if (user.hasOwnProperty("activity")) {
						return { ...button, text: "✅ " + button.text };
					}
				}
				if (button.text === weight) {
					if (user.hasOwnProperty("weightCalcKcal")) {
						return { ...button, text: "✅ " + button.text };
					}
				}
				return button;
			})
		);
		await dispatch(changeNutritionologyQuestionsMenu(newMenu));
	};

export const getMeasurementMenu = () => (dispatch, getState) =>
	getState().buttons.menus.measurementMenu;

export const getnutritionologyQuestionsMenu = () => (dispatch, getState) =>
	getState().buttons.menus.nutritionologyQuestionsMenu;

export default buttonsReducer;
