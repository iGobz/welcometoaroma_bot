const EventEmitter = require('events');
const sendMessage = require("../../sendMessage");
const messageParts = require("../../messageParts");
const hashnode = require("../../hashnode");

const emitter = new EventEmitter();

let chatId;

const updateHandler = (update) => {

    const { message } = update;

    if (message) {

        if (message.text) {

            chatId = message.chat.id;
            const words = message.text.split(/\s+/);

            if (words[0].match(/^\//)) {
                emitter.emit('command', ...words);
            } else {
                emitter.emit('text', message.text);
            }
        }
    }
};

emitter.on('command', async (command, ...args) => {
    console.log('Got command: ', command, 'args: ', args);
    command = command.toLowerCase();
    if (command === '/start') {
        await sendMessage(chatId, 'Привет! Я АромаБот!');
    }
    if (command === '/hello') {
        if (args[0]) {
            await sendMessage(chatId, 'Привет, ' + args[0]);
        } else {
            await sendMessage(chatId, 'Привет!');
        }
    }
    if (command === '/keyboard') {
        const keyboard = {
            reply_markup: {
                inline_keyboard: [[
                    {
                        text: 'Development',
                        callback_data: 'development'
                    }, {
                        text: 'Lifestyle',
                        callback_data: 'lifestyle'
                    }, {
                        text: 'Other',
                        callback_data: 'other'
                    }
                ]]
            }
        };
        await sendMessage(chatId, 'New keyboard', keyboard);
    }
});



// curl -F "url=https://welcometoaroma-bot-71a18f.netlify.app/.netlify/functions/update-6231d" https://api.telegram.org/bot5242713931:AAEHEFHsmGlaWLKkX1l_LRoNG7Kzm1dvWbM/setWebhook

exports.handler = async (event) => {
    console.log(event);

    updateHandler(JSON.parse(event.body));
  const { message } = JSON.parse(event.body);
  if (message) {
    //   console.log(message)
    const { command, botName, extra } = messageParts(message.text);

    if (botName === "welcometoaroma_bot" || botName === null) {
      switch (command) {
        case "echo":
          await sendMessage(message.chat.id, extra || "ECHO!");
          break;
  
        case "hashnodefeatured":
          const { storiesFeed } = await hashnode.getFeaturedPosts();
  
          const reply = `
  ${storiesFeed[0].title} by ${storiesFeed[0].author.username}
  ${storiesFeed[1].title} by ${storiesFeed[1].author.username}
  ${storiesFeed[2].title} by ${storiesFeed[2].author.username}
  https://hashnode.com/featured
  `;
  
          await sendMessage(message.chat.id, reply);
          break;
  
        default:
          await sendMessage(message.chat.id, "I don't understand that command.");
      }
    }
  }


  return { statusCode: 200 };
};