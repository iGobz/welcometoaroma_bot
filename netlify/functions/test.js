//import fetch from 'node-fetch';
import Telegram from 'node-telegram-bot-api';

const token = process.env.BOT_TOKEN || 'token';
const bot = new Telegram(token)


// const API_ENDPOINT = "https://icanhazdadjoke.com/";

// exports.handler = async (event, context) => {
//     return fetch(API_ENDPOINT, { headers: { Accept: "application/json" } })
//         .then((response) => response.json())
//         .then((data) => ({
//             statusCode: 200,
//             body: data.joke,
//         }))
//         .catch((error) => ({ statusCode: 422, body: String(error) }));
// };

// const fn = () => {
//     const res = fetch('https://api.telegram.org/bot5242713931:AAEHEFHsmGlaWLKkX1l_LRoNG7Kzm1dvWbM/sendMessage', {
//         method: 'POST',
//         body: JSON.stringify({
//             chat_id: 218026127,
//             text: "Test from fetch"
//         })
//     }).then((data) => {
//         console.log(data);
//     }).catch((error) => {
//         console.log(error);
//     });  
// };

exports.handler = async (event, context) => {

    try {
        const res = await bot.sendMessage(218026127, 'Тест sendMessage!');
        return {
            statusCode: 200,
            body: JSON.stringify({ message: `Hello` }),
        }
    
    } catch(error) {
            console.log(error);
            return { statusCode: 500, body: error.toString() }

    }


    // return fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    //     method: 'POST',
    //     headers: {
    //         "content-type": "application/json",
    //     },
    //     body: JSON.stringify({
    //         chat_id: 218026127,
    //         text: "Test from fetch"
    //     })
    // }).then((data) => {
    //     console.log(data);

    //     // try {
    //         return {
    //             statusCode: 200,
    //             body: JSON.stringify({ message: `Hello` }),
    //         }
    //     // } catch (error) {
    //     //     console.log(error);
    //     //     return { statusCode: 500, body: error.toString() }
    //     // }


    // }).catch(error => ({ statusCode: 422, body: String(error) }));
}
