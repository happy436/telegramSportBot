// * Розділ result

import { BOTCALLBACKCOMMANDS } from "../../constants/bot_commands.constants.js";

const { saveResult, notSaveResult, backToMeasurementMenu } =
	BOTCALLBACKCOMMANDS;

const saveData = {
	text: "Зберігти данні",
	callback_data: saveResult,
};

const saveDataOnChat = {
	text: "Виписати в окреме повідомлення",
	callback_data: notSaveResult,
};

const back = { text: "Назад", callback_data: backToMeasurementMenu };

export const resultCommand = [/* [saveData], */ [saveDataOnChat], [back]];
