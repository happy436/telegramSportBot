import { BOTCALLBACKCOMMANDS } from "../constants/bot_commands.constants.js";
import { dispatch } from "../store/createStore.js";
import { createMeasurement, getTodayMeasurements } from "../store/measurement.js";
import { changeUserStatus, getUserData, getUserStatusById, inputData, logIn } from "../store/user.js";
import { calcKcal } from "../utils/kcalCalc.js";
import { measurementsMenuKeyboardUp, nutritionologyMenu } from "./bot.keyboards.js";

const {
	waiting_for_confirmation,
} = BOTCALLBACKCOMMANDS;

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
	const messageText = (id) => {
		let msgText = `${date}\n`;
		const userDataMeasurements = dispatch(getTodayMeasurements(id));
		for (const key in userDataMeasurements) {
			if (userDataMeasurements[key] !== null) {
				const { value, units } = MEASUREMENTS[key];
				msgText += `${
					value.charAt(0).toUpperCase() + value.slice(1)
				}: ${userDataMeasurements[key]} ${units}\n`;
			}
		}
		return msgText;
	};
	const conditionForCalcKcal =
		currentState && currentState === "calc_kcal_age";
	const conditionForHeight =
		currentState && currentState === "calc_kcal_weight";
	const conditionForResultKcal =
		currentState && currentState === "calc_kcal_height";
	const measurementType = currentState && currentState.split("_")[2];
	const msgID = dispatch(getUserData(chat.id)).messageId;
	let msgText;

	//condition for input in measurements
	if (conditionForMeasurements) {
		dispatch(createMeasurement(chat.id, { [measurementType]: `${text}` }));
		dispatch(
			changeUserStatus({
				chatId: chat.id,
				status: waiting_for_confirmation,
			})
		);
		await bot.editMessageText(messageText(chat.id), {
			chat_id: chat.id,
			message_id: msgID,
			...measurementsMenuKeyboardUp(),
		});
		bot.deleteMessage(chat.id, msg.message_id);
	}
	// condition for input in calckcal
	else if (conditionForCalcKcal) {
		// Записую данні в стейс
		dispatch(
			inputData({
				chatId: chat.id,
				data: { [measurementType]: `${text}` },
			})
		);
		//міняю статус в стейті
		dispatch(
			changeUserStatus({
				chatId: chat.id,
				status: "calc_kcal_weight",
			})
		);
		bot.deleteMessage(chat.id, msg.message_id);

		await bot.editMessageText("Вкажіть вашу вагу в кг.", {
			chat_id: chat.id,
			message_id: msgID,
		});
	} else if (conditionForHeight) {
		dispatch(
			inputData({
				chatId: chat.id,
				data: { [measurementType]: `${text}` },
			})
		);
		dispatch(
			changeUserStatus({
				chatId: chat.id,
				status: `calc_kcal_height`,
			})
		);
		bot.deleteMessage(chat.id, msg.message_id);

		await bot.editMessageText("Вкажіть ваш зріст в см.", {
			chat_id: chat.id,
			message_id: msgID,
		});
	} else if (conditionForResultKcal) {
		dispatch(
			inputData({
				chatId: chat.id,
				data: { [measurementType]: `${text}` },
			})
		);
		dispatch(
			changeUserStatus({
				chatId: chat.id,
				status: waiting_for_confirmation,
			})
		);
		const user = dispatch(getUserData(chat.id));
		const userGender = user.gender;
		const userActivities = user.activity;
		const userAge = user.age;
		const userWeight = user.weight;
		const userHeight = user.height;

		const result = calcKcal(
			userGender,
			userWeight,
			userHeight,
			userAge,
			userActivities
		);
		msgText = `Ось ващі данні! Споживча добова норма:\nКкал: ${result.calories}\nБілків: ${result.protein} г.\nЖирів: ${result.fat} г.\nВуглеводів: ${result.carbohydrate} г.`;
		bot.deleteMessage(chat.id, msg.message_id);
		await bot.editMessageText(msgText, {
			chat_id: chat.id,
			message_id: msgID,
			...nutritionologyMenu,
		});
	} else {
		// видаляє усі повідомлення які не відповідають статусу користувача навість /start
		bot.deleteMessage(chat.id, msg.message_id);
		console.log("МИМО");
	}
};