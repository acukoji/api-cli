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

// URL: https://api.adviceslip.com/advice/12
/*
Reponse: 
{ 
    "slip":{ 
        "advice":"Something something someting.",
        "slip_id":"12"
    }
}
*/
export async function idAdvice(idsStr: string): Promise<SlipResponse> {
    const ADVICE_API_ID_URL = "https://api.adviceslip.com/advice/" + idsStr;
    try {
        const response: AxiosResponse<SlipResponse> =
            await axios.get<SlipResponse>(ADVICE_API_ID_URL);
        return response.data;
    } catch (error) {
        console.error(error);
        return Promise.reject(error);
    }
}

// function multiply(x: number, y: number){
//     return x * y;
// }

// const a = 23;
// const b = 33;
// multiply(a, b)


// export function buildURL() {
//     return "http://fake-website.com/app/" + num
// }

// // someOtherJsFile.ts
// const num = 44;
// buildURL(num)
