// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
import Telegram from 'node-telegram-bot-api';


// console.log(process.env.BOT_TOKEN);
const bot = new Telegram(process.env.BOT_TOKEN)

console.log(process.env.BOT_TOKEN)



bot.onText(/hello/, async (msg, match) => {
    const chatId = msg.chat.id;
    console.log('Got hello at ', chatId);
    const res = await bot.sendMessage(chatId, 'Привет!');
    console.log('Hello res: ', res);

});

bot.on('message', async (msg, meta) => {
    const chatId = msg.chat.id;
    console.log('Got message at ', chatId);
    bot.sendMessage(chatId, 'Got message');
    const res = await bot.sendMessage(chatId, 'Привет медвет!');
    console.log('Message res: ', res);
});

export const handler = async (event) => {
    console.log(event.body);
    try {
        bot.processUpdate(JSON.parse(event.body));
        const subject = event.queryStringParameters.name || 'World'
        return {
            statusCode: 200,
            body: JSON.stringify({ message: `Hello ${subject}` }),
            // // more keys you can return:
            // headers: { "headerName": "headerValue", ... },
            // isBase64Encoded: true,
        }
    } catch (error) {
        console.log(error);
        return { statusCode: 500, body: error.toString() }
    }
}

// export default { handler }
