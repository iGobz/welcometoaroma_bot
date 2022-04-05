// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
import Telegram from 'node-telegram-bot-api';
import fetch from 'node-fetch';


const token = process.env.BOT_TOKEN || 'token';

const bot = new Telegram(token)



bot.onText(/hello/, async (msg, match) => {
    const chatId = msg.chat.id;
    console.log('Got hello at ', chatId, msg);
    // await bot.sendChatAction(chatId, 'typing');
    const res = await bot.sendMessage(chatId, 'Привет!');
    console.log('Hello res: ', res);
});

bot.onText(/\/start/, async (msg, match) => {
    const chatId = msg.chat.id;

    var options = {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{ text: 'Аптечка', callback_data: '1' }],
                [{ text: 'Some button text 2', callback_data: '2' }],
                [{ text: 'Some button text 3', callback_data: '3' }]
            ],
            keyboard: [
                [{text: "Cards", value: 'cards'}, {text: "Progress"}],
                [{text: "Warning"}, {text: "Help"}],                 
                ['Аптечка'],
                ['Что-то ещё']
            ]
        })
    };

    const res = await bot.sendMessage(chatId, 'Привет! Я Арома Бот!', options);
});

bot.on('callback_query', (query) => {
    bot.answerCallbackQuery(query.id, { text: `Pressed ${query.data}`, });
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
