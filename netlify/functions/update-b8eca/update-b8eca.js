// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
import Telegram from 'node-telegram-bot-api';


// console.log(process.env.BOT_TOKEN);
const bot = new Telegram(process.env.BOT_TOKEN)

bot.onText('hello', (msg, match) => {
    console.log('Got hello');
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Привет!');

});

export const handler = async (event) => {
    console.log(event.body);
    try {
        bot.processUpdate(event.body);
        const subject = event.queryStringParameters.name || 'World'
        return {
            statusCode: 200,
            body: JSON.stringify({ message: `Hello ${subject}` }),
            // // more keys you can return:
            // headers: { "headerName": "headerValue", ... },
            // isBase64Encoded: true,
        }
    } catch (error) {
        return { statusCode: 500, body: error.toString() }
    }
}

// export default { handler }
