import axios, { AxiosResponse } from 'axios';

const ADVICE_API_RANDOM_URL = "https://api.adviceslip.com/advice";

type Slip = {
    advice: string;
    slip_id: string;
}

type SlipResponse = {
    total_results: string
    query: string
    // if search word is included in more than one advice
    // response will be in Slip[] array fromat.
    slips: Slip[]
    // each id request will return a single slip response.
    // each random request will return a single slip response.
    slip: Slip
}

/*
type querySlipResponse = {
    slip: {
        total_results: string;
        query: string;
        slips: string;
    }
}
*/

// https://api.adviceslip.com/advice/search/email
/**
{ 
    "total_results":"3",
    "query":"",
    "slips":[ 
        { 
        "advice":"Always double check you actually attached the file to the email.",
        "slip_id":"42"
        },
        { 
        "advice":"Do not check work email on your days off.",
        "slip_id":"124"
        },
        { 
        "advice":"Never write in an email to someone, something which you wouldn't say to that person's face.",
        "slip_id":"86"
        }
    ]
}

Output
Always double check you actually attached the file to the email.
Do not check work email on your days off.
Never write in an email to someone, something which you wouldn't say to that person's face.
*/
// TODO: Create a new type or modify "SlipResponse" to parse the Advice API search response
// TODO: Create a new api/advice function to build a Advice API search query URL

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

export async function queryAdvice(query: string): Promise<SlipResponse> {
    const ADVICE_API_QUERY_URL = "https://api.adviceslip.com/advice/search/" + query;
    try {
        const response: AxiosResponse<SlipResponse> =
            await axios.get<SlipResponse>(ADVICE_API_QUERY_URL);
            
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
