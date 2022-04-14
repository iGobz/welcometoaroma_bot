const EventEmitter = require('events');
const sendMessage = require("../../sendMessage");
const editMessageText = require("../../editMessageText");
const messageParts = require("../../messageParts");
const hashnode = require("../../hashnode");

const emitter = new EventEmitter();

const keyboard = {
    reply_markup: {
        inline_keyboard: [[
            {
                text: 'Аптечка',
                callback_data: 'first_aid'
            }, {
                text: 'Масла',
                callback_data: 'essential_oils'
            }, {
                text: 'Другое',
                callback_data: 'other'
            }
        ]]
    }
};

let chatId;

const updateHandler = (update) => {


    if (update.message) {

        if (update.message.text) {

            chatId = update.message.chat.id;
            const words = update.message.text.split(/\s+/);

            if (words[0].match(/^\//)) {
                emitter.emit('command', ...words);
            } else {
                emitter.emit('text', update.message.text);
            }
        }
    }
    if(update.callback_query) {
        emitter.emit('callback_query', update.callback_query);
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
 
        await sendMessage(chatId, 'New keyboard', keyboard);
    }
});

emitter.on('callback_query', async (query) => {

    console.log(query);
    const message_id = query.message.message_id;

    await editMessageText(chatId, 'Вы выбрали: ' + query.data, { message_id, keyboard })
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
  
        // default:
        //   await sendMessage(message.chat.id, "I don't understand that command.");
      }
    }
  }


  return { statusCode: 200 };
};