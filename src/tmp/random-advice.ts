import axios, { AxiosResponse } from 'axios';
import { EROFS } from 'constants';

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

async function randomNAdviceAll(n: Number) {
    try {
        var adviceArray = [];
        for(var i = 0; i < n; i++){
            adviceArray.push(axios.get('https://api.adviceslip.com/advice'));    
        }
        const responses = await axios.all(adviceArray)
        const datas = responses.map(r => r.data);
        console.log(datas);
    } catch (error) {
        console.error(error);
    }
}

// To run 
// $ ts-node src/tmp/random-advice.ts
async function idsAdviceAll(ids: Number[]) {
    try {     
        var adviceArray = [];
        for(var i = 0; i < ids.length; i++){
            adviceArray.push(axios.get('https://api.adviceslip.com/advice/' + ids[i])); 
            console.log('https://api.adviceslip.com/advice/' + ids[i]);  
        }
        const responses = await axios.all(adviceArray)
        const datas = responses.map(r => r.data);
        console.log(datas);
    } catch (error) {
        console.error(error);
    }
}


// function axiosAll() {
//     throw new Error('no internet');
//     // this code is never executed
// }

// try {     
//     axiosAll()
//     // this code is never executed
// } catch (error) {
//     console.log(error);
// }


idsAdviceAll([4,55,2]);
console.log("running...");