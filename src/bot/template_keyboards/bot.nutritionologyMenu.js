import { BOTCALLBACKCOMMANDS } from "../../constants/bot_commands.constants.js";

const { genderQuestion } = BOTCALLBACKCOMMANDS;

const kcalTitle = "🧮 Розрахунок Ккал";

export const kcalCalc = { text: kcalTitle, callback_data: genderQuestion };
