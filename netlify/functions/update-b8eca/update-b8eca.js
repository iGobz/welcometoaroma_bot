// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
import Telegram from 'node-telegram-bot-api';
import fetch from 'node-fetch';


const token = process.env.BOT_TOKEN || 'token';

const bot = new Telegram(token)



bot.onText(/hello/, async (msg, match) => {
    const chatId = msg.chat.id;
    console.log('Got hello at ', chatId, msg);
    const res = await bot.sendMessage(chatId, 'Привет!');
    console.log('Hello res: ', res);
});

bot.onText(/\/start/, async (msg, match) => {
    const chatId = msg.chat.id;
    const res = await bot.sendMessage(chatId, 'Привет! Я Арома Бот!');
});


exports.handler = async (event, context) => {
    try {
        bot.processUpdate(JSON.parse(event.body));
        return {
            statusCode: 200,
            body: JSON.stringify({ message: `Hello` }),
        }
    } catch (error) {
        console.log(error);
        return { statusCode: 500, body: error.toString() }
    }
}
