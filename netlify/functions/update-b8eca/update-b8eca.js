// // Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
import axios from 'axios';
import EventEmitter from 'events';

const token = process.env.BOT_TOKEN
const emitter = new EventEmitter();

emitter.on('text', async (message) => {

    if (message.text == '/start') {
        await sendMessage(message.chat.id, 'Привет! Я Арома Бот!');
    }
});

const sendMessage = async (chat_id, body) => {
    try {
        return await axios.post(`https://api.telegram.org/bot${token}/sendMessage`, { 
            chat_id,
            body
        });
    } catch (error) {
        throw Error(error);
    }
}





const handleUpdate = async (update) => {


    if (update.message) {

        const { message } = update;
        
        if (message.text) {
            emitter.emit('text', message);
        }
    }
};

export async function handler(event, context) {
    const update = JSON.parse(event.body);
    console.log("Received an update from Telegram!", event);
    await handleUpdate(update);
    
    // if (message) {
    //     await axios.post(`https://api.telegram.org/bot${token}/sendMessage`, {
    //         chat_id: message.chat.id,
    //         text: "I got your message: " + message.text,
    //     });        
    // }
    return { statusCode: 200 };
}


// import fetch from 'node-fetch';

// const token = process.env.BOT_TOKEN

// const parse = async (message) => {
//     console.log(message)

//     try {
//         const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
//             method: 'POST',
//             body: JSON.stringify({
//                 chat_id: message.chat.id,
//                 text: 'Hello' ,
//             })
//         });
//     } catch (error) {
//         throw Error(error);
//     }

// };



// exports.handler = async (event) => {

//     try {
//         const { message } = JSON.parse(event.body);
//         const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
//             method: 'POST',
//             body: JSON.stringify({
//                 chat_id: 218026127, //message.chat.id,
//                 text: 'Hello' ,
//             })
//         });
//         // await parse(message);
//         // await sendMessage(message.chat.id, "I got your message!");
//         return { statusCode: 200 };    
//     } catch (error) {
//         console.log(error);
//         return { statusCode: 500, body: error.toString() }
//     }
//   };


// import { Telegraf } from 'telegraf'

// const bot = new Telegraf(process.env.BOT_TOKEN)
// bot.start((ctx) => ctx.reply('Welcome'))
// bot.help((ctx) => ctx.reply('Send me a sticker'))
// bot.on('sticker', (ctx) => ctx.reply('👍'))
// bot.hears('hi', (ctx) => ctx.reply('Hey there'))
// // bot.launch()

// exports.handler = async event => {
//     try {
//         await bot.handleUpdate(JSON.parse(event.body));
//         return { statusCode: 200, body: '' };    
//     } catch (error) {
//         console.log(error);
//         return { statusCode: 500, body: error.toString() }        
//     }
// }

// import TelegramBot from 'node-telegram-bot-api';
// import fetch from 'node-fetch';


// const token = process.env.BOT_TOKEN || 'token';

// const bot = new TelegramBot(token)

// bot.on('webhook_error', (error) => {
//     console.log(error);
//   });

// bot.onText(/hello/, async (msg, match) => {
//     const chatId = msg.chat.id;
//     console.log('Got hello at ', chatId, msg);
//     // await bot.sendChatAction(chatId, 'typing');
//     const res = await bot.sendMessage(chatId, 'Привет!');
//     console.log('Hello res: ', res);
// });

// bot.onText(/\/start/, async (msg, match) => {
//     const chatId = msg.chat.id;

//     var options = {
//         reply_markup: JSON.stringify({
//             inline_keyboard: [
//                 [{ text: 'Аптечка', callback_data: '1' }],
//                 [{ text: 'Some button text 2', callback_data: '2' }],
//                 [{ text: 'Some button text 3', callback_data: '3' }]
//             ],
//             keyboard: [
//                 [{text: "Cards", value: 'cards'}, {text: "Progress"}],
//                 [{text: "Warning"}, {text: "Help"}],                 
//                 ['Аптечка'],
//                 ['Что-то ещё']
//             ]
//         })
//     };

//     const res = await bot.sendMessage(chatId, 'Привет! Я Арома Бот!', options);
// });

// bot.on('callback_query', (query) => {
//     bot.answerCallbackQuery(query.id, { text: `Pressed ${query.data}`, });
// });

// exports.handler = async (event, context) => {
//     // const promise = new Promise((resolve, reject) => {
//     //     bot.processUpdate(JSON.parse(event.body));
//     //     resolve(200, )
//     //     return {
//     //         statusCode: 200,
//     //         body: JSON.stringify({ message: `Hello` }),
//     //     }
//     // }).catch((error) => {
//     //     console.log(error);
//     //     return { statusCode: 500, body: error.toString() }
//     // });

//     // return promise;
//     try {
//         await bot.processUpdate(JSON.parse(event.body));
//         return {
//             statusCode: 200,
//             body: JSON.stringify({ message: `Hello` }),
//         }
//     } catch (error) {
//         console.log(error);
//         return { statusCode: 500, body: error.toString() }
//     }
// }
