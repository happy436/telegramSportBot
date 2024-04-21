//* Стартове меню

import { BOTCALLBACKCOMMANDS } from "../../constants/bot_commands.constants.js";

const { measurement, training, nutritionology } = BOTCALLBACKCOMMANDS;

const measurementTitle = "📏 Вимір тіла"
const trainingTitle = "🏃‍♂️ Тренування"
const nutritionologyTitle = "🍗 Харчування"

//* Стартове меню

export const measurementButton = {
	text: measurementTitle,
	callback_data: measurement,
};

export const trainingButton = {
	text: trainingTitle,
	callback_data: training,
};

export const nutritionologyButton = {
	text: nutritionologyTitle,
	callback_data: nutritionology,
};
