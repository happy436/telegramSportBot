// * Розділ вимірювання тіла

import { BOTCALLBACKCOMMANDS } from "../../constants/bot_commands.constants.js";

const { addMeasure, historyMeasurements, results, backToMainMenu } =
	BOTCALLBACKCOMMANDS;

const addMeasureTitle = "✅ Додати заміри тіла"
const historyTitle = "📑 Дивитись історію замірів"
const resultTitle = "🎯 Результати"
const backTitle = "Назад"

export const addMeasureButton = {
	text: addMeasureTitle,
	callback_data: addMeasure,
};
export const historyButton = {
	text: historyTitle,
	callback_data: historyMeasurements,
};
export const resultButton = {
	text: resultTitle,
	callback_data: results,
};
export const backButton = {
	text: backTitle,
	callback_data: backToMainMenu,
};
