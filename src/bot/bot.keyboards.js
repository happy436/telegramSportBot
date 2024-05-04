import { getMeasurementMenu, getnutritionologyQuestionsMenu } from "../store/buttons.js";
import { dispatch } from "../store/createStore.js";
import {
	measurementCommandDown,
	measurementCommandMiddle,
	measurementCommandUp,
} from "./template_keyboards/bot.measure.js";
import { backButton } from "./template_keyboards/bot.measurementMenu.js";
import { kcalCalc } from "./template_keyboards/bot.nutritionologyMenu.js";
import {
	chooseActivityButtons,
	manButton,
	womanButton,
} from "./template_keyboards/bot.nutritionologyQuestion.js";
import { resultCommand } from "./template_keyboards/bot.result.js";
import {
	measurementButton,
	nutritionologyButton,
} from "./template_keyboards/bot.startMenu.js";

// * Розділ підтвердження

// const YesNoCommand = [[{ text: "Так" }, { text: "Ні" }]];

// * keyboards

export const startMenuKeyboard = {
	reply_markup: {
		inline_keyboard: [
			[
				measurementButton,
				/* trainingButton */
			],
			[nutritionologyButton],
		],
	},
};

export const measurementMenuKeyboard = () => {
	return {
		reply_markup: {
			inline_keyboard: dispatch(getMeasurementMenu()),
		},
	};
};

// * measure menu

export const measurementsMenuKeyboardUp = () => {
	return {
		reply_markup: {
			inline_keyboard: measurementCommandUp,
		},
	};
};
export const measurementsMenuKeyboardMiddle = () => {
	return {
		reply_markup: {
			inline_keyboard: measurementCommandMiddle,
		},
	};
};
export const measurementsMenuKeyboardDown = () => {
	return {
		reply_markup: {
			inline_keyboard: measurementCommandDown,
		},
	};
};

// * result menu for measurements

export const resultMenu = {
	reply_markup: {
		inline_keyboard: resultCommand,
	},
};

// * nutritionology Menu

export const nutritionologyMenu = {
	reply_markup: {
		inline_keyboard: [[kcalCalc], [backButton]],
	},
};

export const nutritionologyQuestions = () => {return {
	reply_markup: {
		inline_keyboard: dispatch(getnutritionologyQuestionsMenu()),
	},
}}

export const genderQuestionMenu = {
	reply_markup: {
		inline_keyboard: [[manButton], [womanButton]],
	},
};

export const activityQuestionMenu = {
	reply_markup: {
		inline_keyboard: [...chooseActivityButtons],
	},
};

/* export const YesNoMenuKeyboard = {
	reply_markup: {
		keyboard: YesNoCommand,
	},
}; */
