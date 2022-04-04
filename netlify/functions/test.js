import fetch from 'node-fetch';

const fn = () => {
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
};

export const handler = async (event) => {
    try {
        fn();
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
