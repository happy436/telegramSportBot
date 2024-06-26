// index.js
import TelegramBot from "node-telegram-bot-api";
import { config } from "dotenv";
import { botCommands } from "./constants/bot_commands.constants.js";
import {
	handleInlineButtonsAction,
	onStart,
} from "./bot/bot.handlers.js";
import mongoose from "mongoose";
import { onMessage } from "./bot/bot.onMessage.js";

config();

export const userData = {};

const token = process.env.TOKEN_BOT;
const bot = new TelegramBot(token, { polling: true });

const start = async () => {
	await bot.setMyCommands(botCommands);

	//* Старт
	await bot.onText(`/start`, onStart(bot));

	//* Слухач
	await bot.on("callback_query", handleInlineButtonsAction(bot));

	//* Слухач усіх повідомлень
	await bot.on("message", onMessage(bot));
};

start();
