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
        await bot.deleteMessage(id, message_id);
        await bot.sendMessage(
            id,
            messageText,
            buttons
        );
    }
}