import axios, { AxiosResponse } from 'axios';

const ADVICE_API_RANDOM_URL = "https://api.adviceslip.com/advice";

type Advice = {
    advice: string;
    slip_id: string;
}

type Slip = {
    slip: Advice
}

// URL: https://api.adviceslip.com/advice
// Reponse: {"slip": {"advice":"Enjoy a little nonsense now and then.","slip_id":"160"}}
export async function randomAdvice(): Promise<Slip> {    
    try {
        const response: AxiosResponse<Slip> = 
            await axios.get<Slip>(ADVICE_API_RANDOM_URL);

        return response.data;
    } catch (error) {
        console.error(error);
        return Promise.reject(error);
    }
}