// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
import Telegram from 'node-telegram-bot-api';
import fetch from 'node-fetch';


const token = process.env.BOT_TOKEN || 'token';
process.env.NTBA_FIX_319 = 1;

// console.log(process.env.BOT_TOKEN);
const bot = new Telegram(token)

// console.log(token)

// const start = async () => {
//     try {
//         // const resp = await axios.post(`https://api.telegram.org/bot${token}/sendMessage`, {
//         //     chat_id : 218026127,
//         //     text: 'Тест axios!',
//         // });
//         // console.log('First response: ', resp);

//         const res = await bot.sendMessage(218026127, 'Тест sendMessage!');
//         console.log('Hello res: ', res);

//     } catch(error) {
//         console.log(error);
//     }   
// };

// start();



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

// bot.on('message', async (msg, meta) => {
//     const chatId = msg.chat.id;
//     console.log('Got message at ', chatId);
//     bot.sendMessage(chatId, 'Got message');
//     const res = await bot.sendMessage(chatId, 'Привет медвет!');

//     // await axios.post(`https://api.telegram.org/bot${token}/sendMessage`, {
//     //     chatId,
//     //     text: 'Тест axios',
//     // });
//     console.log('Message res: ', res);
// });

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

// export default { handler }
