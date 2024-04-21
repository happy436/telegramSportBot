import { getMainMenu, getMeasurementMenu } from "../store/buttons.js";
import { dispatch } from "../store/createStore.js";
import {
	measurementCommandDown,
	measurementCommandMiddle,
	measurementCommandUp,
} from "./template_keyboards/bot.measure.js";
import { resultCommand } from "./template_keyboards/bot.result.js";

// * Розділ підтвердження

// const YesNoCommand = [[{ text: "Так" }, { text: "Ні" }]];

// * keyboards

export const startMenuKeyboard = {
	reply_markup: {
		inline_keyboard: dispatch(getMainMenu()),
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

// * result menu

export const resultMenu = {
	reply_markup: {
		inline_keyboard: resultCommand,
	},
};

/* export const YesNoMenuKeyboard = {
	reply_markup: {
		keyboard: YesNoCommand,
	},
}; */
