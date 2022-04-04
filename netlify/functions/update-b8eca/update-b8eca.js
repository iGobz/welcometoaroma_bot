// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
import Telegram from 'node-telegram-bot-api';


// console.log(process.env.BOT_TOKEN);
const bot = new Telegram(process.env.BOT_TOKEN)

console.log(process.env.BOT_TOKEN)



bot.onText(/hello/, async (msg, match) => {
    console.log('Got hello at ', msg.chat.id);
    const chatId = msg.chat.id;
    const res = await bot.sendMessage(chatId, 'Привет!');
    console.log('Hello res: ', res);

});

bot.on('message', async (msg, meta) => {
    console.log('Got message at ', msg.chat.id);
    bot.sendMessage(msg.chat.id, 'Got message');
    const res = await bot.sendMessage(chatId, 'Привет!');
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
