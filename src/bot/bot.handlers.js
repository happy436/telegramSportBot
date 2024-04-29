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
	getUserData,
	getUsersData,
	getUserStatusById,
	inputGender,
	inputSportActivity,
	logIn,
} from "../store/user.js";
import { dispatch, getState } from "../store/createStore.js";
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
import {
	activ,
	activParam,
	gender,
} from "./template_keyboards/bot.nutritionologyQuestion.js";

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

		//* calc kcal
		case questionsForNutriology:
			messageText = "Вкажіть стать, рік, активність, вагу.";
			await bot.editMessageText(messageText, {
				chat_id: chat.id,
				message_id: message_id,
				...nutritionologyQuestions(),
			});
			break;

		case activityQuestion:
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
				inputSportActivity({ chatId: chat.id, activityParam })
			);
			//const condition = await dispatch(getUserData()).activity !== null
			await dispatch(updateNutritiologyQuestionMenu(chat.id));
			messageText = "Вкажіть стать, рік, активність, вагу.";
			await bot.editMessageText(messageText, {
				chat_id: chat.id,
				message_id: message_id,
				...nutritionologyQuestions(),
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
			await dispatch(inputGender({ chatId: chat.id, gender: status }));
			await dispatch(updateNutritiologyQuestionMenu(chat.id));
			messageText = "Вкажіть стать, рік, активність, вагу.";
			await bot.editMessageText(messageText, {
				chat_id: chat.id,
				message_id: message_id,
				...nutritionologyQuestions(),
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
			for (const key in userDataMeasurements) {
				if (userDataMeasurements[key] !== null) {
					const { value, units } = MEASUREMENTS[key];
					messageText = `${date}\n`;
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
			await dispatch(updateMeasurementMenuButtons(chat.id));
			await bot.editMessageText(chooseTheOptions, {
				chat_id: chat.id,
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
	const { text, chat } = msg;
	await dispatch(logIn(chat));
	const currentState = dispatch(getUserStatusById(chat.id));
	const conditionForMeasurements =
		currentState &&
		currentState.startsWith(
			waiting_for_confirmation.slice(
				0,
				waiting_for_confirmation.lastIndexOf("_") + 1
			)
		);
    // TODO condition
	const conditionForCalcKcal = true;

    //condition for input in measurements
	if (conditionForMeasurements) {
		const measurementType = currentState.split("_")[2];
		dispatch(createMeasurement(chat.id, { [measurementType]: `${text}` }));
		dispatch(changeUserStatus(waiting_for_confirmation));
		bot.deleteMessage(chat.id, msg.message_id);
	} 
    // condition for input in calckcal
    else if (conditionForCalcKcal) {
        // TODO write code for calcKcal
        bot.deleteMessage(chat.id, msg.message_id);
	} else {
		// видаляє усі повідомлення які не відповідають статусу користувача навість /start
		bot.deleteMessage(chat.id, msg.message_id);
		console.log("МИМО");
	}
};
