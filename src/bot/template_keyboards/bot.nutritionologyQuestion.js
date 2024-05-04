import { BOTCALLBACKCOMMANDS } from "../../constants/bot_commands.constants.js";

const { male, female, genderQuestion, activityQuestion, ageCalcKcal, weightCalcKcal } = BOTCALLBACKCOMMANDS;

const man = "👨 Чоловік 🚹";
const woman = "👩 Жінка 🚺";
export const gender = "Стать";
export const age = "Вік";
export const activ = "Активність";
export const weight = "Вага";
export const activParam = "activityParam_"

// Определение уровня активности
const activityLevel = [
	{ value: activParam + 1.2, text: "немає фіз.нагрузки" },
	{ value: activParam + 1.375, text: "1-3 рази на тиждень" },
	{ value: activParam + 1.55, text: "3-5 рази на тиждень" },
	{ value: activParam + 1.725, text: "6-7 рази на тиждень" },
	{ value: activParam + 1.9, text: "2 рази на день" },
];

export const manButton = { text: man, callback_data: male };
export const womanButton = { text: woman, callback_data: female };

//soon
export const chooseActivityButtons = activityLevel.map((b) => [
	{ text: b.text, callback_data: b.value },
]);
export const genderButton = { text: gender, callback_data: genderQuestion };
export const ageButton = { text: age, callback_data: ageCalcKcal };
export const activityButton = { text: activ, callback_data: activityQuestion };
export const weightButton = { text: weight, callback_data: weightCalcKcal };
