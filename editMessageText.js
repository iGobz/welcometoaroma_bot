const axios = require("axios").default;

module.exports = async (chat_id, text, options) => {

    axios.interceptors.request.use(request => {
        console.log('Starting Request', JSON.stringify(request, null, 2))
        return request
      });

    console.log(options);
  await axios.post(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/editMessageText`, {
    chat_id,
    text,
    ...options
  });

  return true;
};