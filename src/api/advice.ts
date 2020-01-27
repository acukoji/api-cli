import axios, { AxiosResponse } from 'axios';

const ADVICE_API_RANDOM_URL = "https://api.adviceslip.com/advice";

//This type Slip is not exported.  How does it still work?
//because it is implied with the calling of randomAdvice()
//Then why are SlipsResponse and SlipResponse exported?

// for randomAdvice
type Slip = {
    advice: string;
    slip_id: string;
}

// for queryAdvice
export type SlipsResponse = {
    total_results: string
    query: string
    slips: Slip[]
    message: {
        type: string
        text: string
    }
}

// for idAdvice
export type SlipResponse = {
    slip: Slip
    message: {
        type: string
        text: string
    }
}


// Broken query search aaa
// https://api.adviceslip.com/advice/search/aaa
/*
{
    "message": {
        "type": "notice", 
        "text": "No advice slips found matching that search term."
    }
}

//Successful query search with 3 responses
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


// search by id
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
     // TODO: Handle when there are more than one id passed in, ex --ids="1,3,13"
     
     // assumption: their API cannot handle multiple ids
     // How do I test this assumption?
     // Each single id appended to the URL returns a type "slip"response
     // then, multiple ids in idsStr must be parsed into separate requests?
     // how to separate each id separated by commas
     // use function convertStrIds from command
     // convertStrIds parses comma-separated ids string numbers into number array
     // where to call convertStrIds()?--probably in command?

    const ADVICE_API_ID_URL = "https://api.adviceslip.com/advice/" + idsStr;
    try {
        const response: AxiosResponse<SlipResponse> = 
            await axios.get<SlipResponse>(ADVICE_API_ID_URL);
     //   console.log(response.data)
        return response.data;
    } catch (error) {
        console.error(error);
        return Promise.reject(error);
    }
}

export async function queryAdvice(query: string): Promise<SlipsResponse> {
    const ADVICE_API_QUERY_URL = "https://api.adviceslip.com/advice/search/" + query;
    try {
        const response: AxiosResponse<SlipsResponse> =
            await axios.get<SlipsResponse>(ADVICE_API_QUERY_URL);

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
