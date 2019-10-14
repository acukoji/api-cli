const axios = require('axios');

async function random3Advice() {
    try {
        const first = await axios.get('https://api.adviceslip.com/advice');
        const sec = await axios.get('https://api.adviceslip.com/advice');
        const third = await axios.get('https://api.adviceslip.com/advice');
        console.log([first.data, sec.data, third.data]);
    } catch (error) {
        console.error(error);
    }
}

async function random3AdviceAll() {
    try {
        const responses = await axios.all([
            axios.get('https://api.adviceslip.com/advice'),
            axios.get('https://api.adviceslip.com/advice'),
            axios.get('https://api.adviceslip.com/advice')
        ])
        console.log(responses.map(r => r.data));
    } catch (error) {
        console.error(error);
    }
}

random3AdviceAll()
console.log("running...");