const axios = require('axios');

async function randomSearchAdvice() {
    try {
        const first = await axios.get('https://api.adviceslip.com/advice/search/public');
        if(first.data.slips !== undefined) {
            console.log(first.data.slips);
        } else {
            console.log(first.data.message.text)
        }
    } catch (error) {
        console.error(error);
    }
}

randomSearchAdvice()