import { welcomeText } from "../constants/welcome_text.constants.js";
import {
	startMenuKeyboard,
	measurementsMenuKeyboardDown,
	measurementsMenuKeyboardUp,
	measurementsMenuKeyboardMiddle,
	resultMenu,
	measurementMenuKeyboard,
	nutritionologyMenu,
	genderQuestionMenu,
	activityQuestionMenu,
} from "./bot.keyboards.js";
import { formatDateToDayMonthYear } from "../utils/common/formatDate.js";
import { MEASUREMENTS } from "../constants/measurements.contants.js";
import {
	changeUserStatus,
	getUserData,
	getUsersData,
	getUserStatusById,
	inputData,
	logIn,
} from "../store/user.js";
import { dispatch } from "../store/createStore.js";
import {
	updateMeasurementMenuButtons,
	updateNutritiologyQuestionMenu,
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
	WDUW,
} from "../constants/bot_commands.constants.js";
import { updateMessage } from "../utils/updateMessage.js";
import { activParam } from "./template_keyboards/bot.nutritionologyQuestion.js";
import { calcKcal } from "../utils/kcalCalc.js";

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
	waiting_for_confirmation,
	nutritionology,
	genderQuestion,
	male,
	female,
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

const date = formatDateToDayMonthYear(Date.now());

export const onStart = (bot) => async (msg) => {
	const chatId = msg.chat.id;
	await bot.sendMessage(chatId, welcomeText + WDUW, startMenuKeyboard);
};

export const handleInlineButtonsAction = (bot) => async (query) => {
	const {
		message: { chat, message_id, text },
		data,
	} = query;

	let messageText = "";
	const [status, bodyPart] = data.split(" | ");

	await dispatch(logIn(chat));
	await dispatch(changeUserStatus({ chatId: chat.id, status: status }));

	const userStatus = await dispatch(getUserStatusById(chat.id));
	const userDataMeasurements = dispatch(getTodayMeasurements(chat.id));
	console.log(dispatch(getUsersData()));
	switch (userStatus) {
		//! training
		//empty comming soon

		//! NUTRITIOLOGY MENU

		//* first menu
		case nutritionology:
			messageText =
				"Я допоможу тобі розрахувати потрібну кількість ккал для зхуднення дивлячись на твою активність, вік, зріст та вагу.";
			await bot.editMessageText(messageText, {
				chat_id: chat.id,
				message_id: message_id,
				...nutritionologyMenu,
			});
			break;

		case genderQuestion:
			messageText = "Вкажи свою стать!";
			await bot.editMessageText(messageText, {
				chat_id: chat.id,
				message_id: message_id,
				...genderQuestionMenu,
			});
			break;

		case male:
		case female:
			dispatch(inputData({ chatId: chat.id, data: { gender: status } }));
			await dispatch(updateNutritiologyQuestionMenu(chat.id));
			messageText = "Як часто ви тренуетесь?";
			await bot.editMessageText(messageText, {
				chat_id: chat.id,
				message_id: message_id,
				...activityQuestionMenu,
			});
			break;

		case activParam + 1.2:
		case activParam + 1.375:
		case activParam + 1.55:
		case activParam + 1.725:
		case activParam + 1.9:
			const activityParam = Number(userStatus.split("_")[1]);
			await dispatch(
				inputData({
					chatId: chat.id,
					data: { activity: activityParam },
				})
			);
			await dispatch(
				inputData({
					chatId: chat.id,
					data: { messageId: message_id },
				})
			);
			dispatch(
				changeUserStatus({
					chatId: chat.id,
					status: `calc_kcal_age`,
				})
			);
			await dispatch(updateNutritiologyQuestionMenu(chat.id));
			messageText = "Вкажіть у повідомленні ваш ВІК";
			await bot.editMessageText(messageText, {
				chat_id: chat.id,
				message_id: message_id,
			});
			break;

		//! MEASUREMENTS MENU

		//* first menu
		case measurement:
			await dispatch(updateMeasurementMenuButtons(chat.id));
			await bot.editMessageText(chooseTheOptions, {
				chat_id: chat.id,
				message_id: message_id,
				...measurementMenuKeyboard(),
			});
			break;
		case results:
			messageText = `${date} в тебе ось такі результати: \n`;
			for (const key in userDataMeasurements) {
				// Проверяем, не является ли значение null
				if (userDataMeasurements[key] !== null) {
					// Если значение не null, добавляем его к сообщению
					const { value, units } = MEASUREMENTS[key];
					messageText += `${
						value.charAt(0).toUpperCase() + value.slice(1)
					} ${userDataMeasurements[key]} ${units}\n`;
				}
			}
			await bot.editMessageText(messageText, {
				chat_id: chat.id,
				message_id: message_id,
				...resultMenu,
			});
			break;
		case saveResult:
			break;
		case notSaveResult:
			// TODO Зробити видалення данних після виписування в окреме повідомлення
			messageText = `${date}: \n`;
			for (const key in userDataMeasurements) {
				// Проверяем, не является ли значение null
				if (userDataMeasurements[key] !== null) {
					// Если значение не null, добавляем его к сообщению
					const { value, units } = MEASUREMENTS[key];
					messageText += `${
						value.charAt(0).toUpperCase() + value.slice(1)
					} ${userDataMeasurements[key]} ${units}\n`;
				}
			}
			await bot.deleteMessage(chat.id, message_id);
			await bot.sendMessage(chat.id, messageText);
			await bot.sendMessage(
				chat.id,
				chooseTheOptions,
				measurementMenuKeyboard()
			);
			break;
		case addMeasure:
			await bot.editMessageText(chooseThePartOfBody, {
				chat_id: chat.id,
				message_id: message_id,
				...measurementsMenuKeyboardUp(),
			});
			break;
		case backToMainMenu:
			await bot.editMessageText(WDUW, {
				chat_id: chat.id,
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
			dispatch(
				changeUserStatus({
					chatId: chat.id,
					status: `waiting_for_${status}`,
				})
			);
			await dispatch(
				inputData({
					chatId: chat.id,
					data: { messageId: message_id },
				})
			);
			messageText = `Введіть ваш розмір (${bodyPart.toUpperCase()}), потрібно вводити в ${
				userStatus === weight.param ? weight.units : height.units
			} тільки число`;
			await updateMessage(
				bot,
				query,
				messageText,
				measurementsMenuKeyboardUp()
			);
			break;
		case next2:
			await bot.editMessageText(text, {
				chat_id: chat.id,
				message_id: message_id,
				...measurementsMenuKeyboardMiddle(),
			});
			break;
		case back1:
			await bot.editMessageText(text, {
				chat_id: chat.id,
				message_id: message_id,
				...measurementsMenuKeyboardUp(),
			});
			break;
		case next3:
			await bot.editMessageText(text, {
				chat_id: chat.id,
				message_id: message_id,
				...measurementsMenuKeyboardDown(),
			});
			break;
		case back2:
			await bot.editMessageText(text, {
				chat_id: chat.id,
				message_id: message_id,
				...measurementsMenuKeyboardMiddle(),
			});
			break;
		case backToMeasurementMenu:
			await dispatch(updateMeasurementMenuButtons(chat.id));
			await bot.editMessageText(chooseTheOptions, {
				chat_id: chat.id,
				message_id: message_id,
				...measurementMenuKeyboard(),
			});
			break;
		default:
			await bot.sendMessage(chat.id, IDK);
			break;
	}
	return;
};


