import axios, { AxiosResponse } from 'axios';

const ADVICE_API_RANDOM_URL = "https://api.adviceslip.com/advice";

type SlipResponse = {
    slip: {
        advice: string;
        slip_id: string;
    }
}

// URL: https://api.adviceslip.com/advice
/*
Reponse: 
{ 
    "slip":{ 
        "advice":"Enjoy a little nonsense now and then.",
        "slip_id":"160"
    }
}
*/
export async function randomAdvice(): Promise<SlipResponse> {
    try {
        const response: AxiosResponse<SlipResponse> =
            await axios.get<SlipResponse>(ADVICE_API_RANDOM_URL);

        return response.data;
    } catch (error) {
        console.error(error);
        return Promise.reject(error);
    }
}