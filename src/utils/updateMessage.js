import { dispatch, getState } from "../store/createStore.js";
import { inputData } from "../store/user.js";

export const updateMessage = async (bot, query, messageText,buttons) => {
    const {
		message: {
			chat: { id },
			message_id,
			text,
		}
	} = query;
    if (text !== messageText) {
        await bot.editMessageText(messageText, {
            chat_id: id,
            message_id: message_id,
            ...buttons,
        });
    } else {
        dispatch(
            inputData({
                chatId: id,
                data: { messageId: message_id },
            })
        );
        await bot.deleteMessage(id, message_id);
        await bot.sendMessage(
            id,
            messageText,
            buttons
        );
    }
}