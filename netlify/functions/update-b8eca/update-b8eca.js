// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
import Telegram from 'node-telegram-bot-api';


// console.log(process.env.BOT_TOKEN);
const bot = new Telegram(process.env.BOT_TOKEN)

bot.onText(/hello/, (msg, match) => {
    console.log('Got hello');
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Привет!');

});

bot.on('message', (msg, meta) => {
    console.log('Got message');
    bot.sendMessage(msg.chat.id, 'Got message');
})

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
