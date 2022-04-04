const fetch = require('node-fetch').default;


const res = fetch('https://api.telegram.org/bot5242713931:AAEHEFHsmGlaWLKkX1l_LRoNG7Kzm1dvWbM/sendMessage', {
    method: 'POST',
    body: JSON.stringify({
        chat_id: 218026127,
        text: "Test from fetch"
    })
}).then((data) => {
    console.log(data);
}).catch((error) => {
    console.log(error);
});