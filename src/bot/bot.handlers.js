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
	nutritionologyQuestions,
	activityQuestionMenu,
} from "./bot.keyboards.js";
import { formatDateToDayMonthYear } from "../utils/common/formatDate.js";
import { MEASUREMENTS } from "../constants/measurements.contants.js";
import {
	changeUserStatus,
	getChatId,
	getUserData,
	getUserStatus,
	inputGender,
	inputSportActivity,
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
	WDUW,
} from "../constants/bot_commands.constants.js";
import { updateMessage } from "../utils/updateMessage.js";
import { activParam } from "./template_keyboards/bot.nutritionologyQuestion.js";

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
	nutritionology,
	genderQuestion,
	male,
	female,
	questionsForNutriology,
	activityQuestion,
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
	const userDataMeasurements = await dispatch(getTodayMeasurements());
	const userData = await dispatch(getUserData());
	console.log(userData, userStatus);

	switch (userStatus) {
        case activParam + 1.2:
        case activParam + 1.375:
        case activParam + 1.55:
        case activParam + 1.725:
        case activParam + 1.9:
            const activityParam = Number(userStatus.split("_")[1])
            await dispatch(inputSportActivity(activityParam))
            messageText = "Вкажіть стать, рік, активність, вагу.";
			await bot.editMessageText(messageText, {
				chat_id: id,
				message_id: message_id,
				...nutritionologyQuestions,
			});
            break;
		case nutritionology:
			messageText =
				"Я допоможу тобі розрахувати потрібну кількість ккал для зхуднення дивлячись на твою активність, вік, зріст та вагу.";
			await bot.editMessageText(messageText, {
				chat_id: id,
				message_id: message_id,
				...nutritionologyMenu,
			});
			break;

		case activityQuestion:
			messageText = "Як часто ви тренуетесь?";
			await bot.editMessageText(messageText, {
				chat_id: id,
				message_id: message_id,
				...activityQuestionMenu,
			});
			break;
		case questionsForNutriology:
			messageText = "Вкажіть стать, рік, активність, вагу.";
			await bot.editMessageText(messageText, {
				chat_id: id,
				message_id: message_id,
				...nutritionologyQuestions,
			});
			break;
		case male:
		case female:
			if (status === "female" || status === "male") {
				await dispatch(inputGender(status));
			}
		case genderQuestion:
			messageText = "Вкажи свою стать!";
			await bot.editMessageText(messageText, {
				chat_id: id,
				message_id: message_id,
				...genderQuestionMenu,
			});
			break;
		case results:
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
				chat_id: id,
				message_id: message_id,
				...resultMenu,
			});
			break;
		case saveResult:
			break;
		case notSaveResult:
			for (const key in userDataMeasurements) {
				// Проверяем, не является ли значение null
				if (userDataMeasurements[key] !== null) {
					// Если значение не null, добавляем его к сообщению
					/* MEASUREMENTS[key] */

					const { value, units } = MEASUREMENTS[key];
					messageText += `${
						value.charAt(0).toUpperCase() + value.slice(1)
					} ${userDataMeasurements[key]} ${units}\n`;
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
			//console.log(dispatch(getMeasurementMenu()));
			await bot.editMessageText(chooseTheOptions, {
				chat_id: id,
				message_id: message_id,
				...measurementMenuKeyboard(),
			});
			break;
		case addMeasure:
			await bot.editMessageText(chooseThePartOfBody, {
				chat_id: id,
				message_id: message_id,
				...measurementsMenuKeyboardUp(),
			});
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
	const userDataMeasurements = getState();

	await dispatch(changeUserStatus(message));
	await dispatch(logIn(id));

	userDataMeasurements.measurements = userDataMeasurements.measurements || {};

	if (
		currentState &&
		currentState.startsWith(
			waiting_for_confirmation.slice(
				0,
				waiting_for_confirmation.lastIndexOf("_") + 1
			)
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
