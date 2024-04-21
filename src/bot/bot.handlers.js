import { welcomeText } from "../constants/welcome_text.constants.js";
import {
	startMenuKeyboard,
	measurementsMenuKeyboardDown,
	measurementsMenuKeyboardUp,
	measurementsMenuKeyboardMiddle,
	resultMenu,
	measurementMenuKeyboard,
} from "./bot.keyboards.js";
import { formatDateToDayMonthYear } from "../utils/common/formatDate.js";
import { MEASUREMENTS } from "../constants/measurements.contants.js";
import {
	changeUserStatus,
	getChatId,
	getUserStatus,
	logIn,
} from "../store/user.js";
import { dispatch, getState } from "../store/createStore.js";
import {
	getMeasurementMenu,
	updateMeasurementMenuButtons,
} from "../store/buttons.js";
import {
	createMeasurement,
	getTodayMeasurements,
} from "../store/measurement.js";
import {
	BOTCALLBACKCOMMANDS,
	chooseTheOptions,
    chooseThePartOfBody,
    IDK,
} from "../constants/bot_commands.constants.js";
import { updateMessage } from "../utils/updateMessage.js";

const {
	results,
	measurement,
	addMeasure,
	backToMainMenu,
	next2,
	back1,
	next3,
	back2,
	backToMeasurementMenu,
	saveResult,
	notSaveResult,
	message,
	waiting_for_confirmation,
} = BOTCALLBACKCOMMANDS;

const {
	weight,
	height,
	neck,
	shoulders,
	leftBiceps,
	chest,
	rightBiceps,
	leftForearm,
	underBust,
	rightForearm,
	waist,
	butt,
	thigh,
	leftThigh,
	rightThigh,
	leftShin,
	rightShin,
} = MEASUREMENTS;

export const onStart = (bot) => async (msg) => {
	await dispatch(changeUserStatus("start"));
	await dispatch(logIn(msg.chat.id));
	const chatId = await dispatch(getChatId());

	// await bot.sendMessage(chatId, welcomeText);
	await bot.sendMessage(chatId, welcomeText + WDUW, startMenuKeyboard);
};

export const handleInlineButtonForMeasurement = (bot) => async (query) => {
	const date = formatDateToDayMonthYear(Date.now());
	let messageText = `${date} в тебе ось такі результати: \n`;

	const {
		message: {
			chat: { id },
			message_id,
			text,
		},
		data,
	} = query;

	const [status, bodyPart] = data.split(" | ");

	await dispatch(changeUserStatus(status));
	await dispatch(logIn(id));

	const userStatus = await dispatch(getUserStatus());
	const userData = await dispatch(getTodayMeasurements());

	switch (userStatus) {
		case results:
			for (const key in userData) {
				// Проверяем, не является ли значение null
				if (userData[key] !== null) {
					// Если значение не null, добавляем его к сообщению
					const { value, units } = MEASUREMENTS[key];

					messageText += `${
						value.charAt(0).toUpperCase() + value.slice(1)
					} ${userData[key]} ${units}\n`;
				}
			}
			await bot.editMessageText(messageText, {
				chat_id: id,
				message_id: message_id,
				...resultMenu,
			});
			break;
		case saveResult:
			break;
		case notSaveResult:
			for (const key in userData) {
				// Проверяем, не является ли значение null
				if (userData[key] !== null) {
					// Если значение не null, добавляем его к сообщению
					/* MEASUREMENTS[key] */

					const { value, units } = MEASUREMENTS[key];
					messageText += `${
						value.charAt(0).toUpperCase() + value.slice(1)
					} ${userData[key]} ${units}\n`;
				}
			}
			await bot.deleteMessage(id, message_id);
			await bot.sendMessage(id, messageText);
			await bot.sendMessage(
				id,
				chooseTheOptions,
				measurementMenuKeyboard()
			);
			break;
		case measurement:
			await dispatch(updateMeasurementMenuButtons());
			console.log(dispatch(getMeasurementMenu()));
			await bot.editMessageText(chooseTheOptions, {
				chat_id: id,
				message_id: message_id,
				...measurementMenuKeyboard(),
			});
			break;
		case addMeasure:
			await bot.editMessageText(
				chooseThePartOfBody,
				{
					chat_id: id,
					message_id: message_id,
					...measurementsMenuKeyboardUp(),
				}
			);
			break;

		case backToMainMenu:
			await bot.editMessageText(WDUW, {
				chat_id: id,
				message_id: message_id,
				...startMenuKeyboard,
			});
			break;
		case weight.param:
		case height.param:
		case neck.param:
		case shoulders.param:
		case leftBiceps.param:
		case chest.param:
		case rightBiceps.param:
		case leftForearm.param:
		case underBust.param:
		case rightForearm.param:
		case waist.param:
		case butt.param:
		case thigh.param:
		case leftThigh.param:
		case rightThigh.param:
		case leftShin.param:
		case rightShin.param:
			dispatch(changeUserStatus(`waiting_for_${status}`));
			messageText = `Введіть ваш розмір (${bodyPart.toUpperCase()}), потрібно вводити в ${
				userStatus === weight.param ? weight.units : height.units
			}`;
			await updateMessage(
				bot,
				query,
				messageText,
				measurementsMenuKeyboardUp()
			);
			break;
		case next2:
			await bot.editMessageText(text, {
				chat_id: id,
				message_id: message_id,
				...measurementsMenuKeyboardMiddle(),
			});
			break;
		case back1:
			await bot.editMessageText(text, {
				chat_id: id,
				message_id: message_id,
				...measurementsMenuKeyboardUp(),
			});
			break;
		case next3:
			await bot.editMessageText(text, {
				chat_id: id,
				message_id: message_id,
				...measurementsMenuKeyboardDown(),
			});
			break;
		case back2:
			await bot.editMessageText(text, {
				chat_id: id,
				message_id: message_id,
				...measurementsMenuKeyboardMiddle(),
			});
			break;
		case backToMeasurementMenu:
			await dispatch(updateMeasurementMenuButtons());
			await bot.editMessageText(chooseTheOptions, {
				chat_id: id,
				message_id: message_id,
				...measurementMenuKeyboard(),
			});
			break;
		default:
			await bot.sendMessage(id, IDK);
			break;
	}
	return;
};

export const onMessage = (bot) => async (msg) => {
	const {
		text,
		chat: { id },
	} = msg;
	const currentState = dispatch(getUserStatus());
	const userData = getState();

	await dispatch(changeUserStatus(message));
	await dispatch(logIn(id));

	userData.measurements = userData.measurements || {};
	if (
		currentState &&
		currentState.startsWith(
			waiting_for_confirmation.slice(0, str.lastIndexOf("_") + 1)
		)
	) {
		const measurementType = currentState.split("_")[2];
		dispatch(createMeasurement({ [measurementType]: `${text}` }));
		dispatch(changeUserStatus(waiting_for_confirmation));
		bot.deleteMessage(id, msg.message_id);
	} else {
		// видаляє усі повідомлення які не відповідають статусу користувача навість /start
		bot.deleteMessage(id, msg.message_id);
		console.log("МИМО");
	}
};
