### telegramSportBot

This Telegram bot includes features for calculating calories based on user input and recording body measurements.

#### Usage

1. **Create Telegram Bot:**
   - Create a bot on Telegram using BotFather.
   - Obtain the token for your bot.

2. **Set up .env file:**
   - In the root directory of the repository, create a file named `.env`.
   - Inside the `.env` file, add the following line:
     ```
     TOKEN_BOT=your_bot_token_here
     ```
     Replace `your_bot_token_here` with the token obtained from BotFather.

3. **Run the Bot:**
   - To start the bot, use the command:
     ```
     npm run start
     ```
   This command will execute the bot and connect it to Telegram using the provided token.

4. **Using the Bot:**
   - Once the bot is running, interact with it on Telegram by sending commands or messages according to its functionalities, such as calculating calories or recording body measurements.
