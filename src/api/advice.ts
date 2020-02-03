import axios, { AxiosResponse } from 'axios';

const ADVICE_API_RANDOM_URL = "https://api.adviceslip.com/advice";

//This type Slip is not exported.  How does it still work?
//because it is implied with the calling of randomAdvice()
//Then why are SlipsResponse and SlipResponse exported?

// This type is a component also used in SlipsResponse and SlipResponse.
type Slip = {
    advice: string;
}

// used when there is Slip[] or "slips" (possible in queryAdvice and idAdvice)
// or when no slips found matching query search ("text")
export type SlipsResponse = {
    total_results: string
    query: string
    slips: Slip[]
    message: {
        type: string
        text: string
    }
}

// used when there is a single Slip or "slip"
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

// URL: https://api.adviceslip.com/advice
/*
Reponse: 
{ 
    "slip":{ 
        "advice":"Enjoy a little nonsense now and then."
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
        throw error;
    }
}


// search by id
// URL: https://api.adviceslip.com/advice/12
/*
Reponse: 
{ 
    "slip":{ 
        "advice":"Something something someting."
    }
}
*/
export async function idAdvice(idsStr: string): Promise<SlipResponse> {

    const ADVICE_API_ID_URL = "https://api.adviceslip.com/advice/" + idsStr;
    try {
        const response: AxiosResponse<SlipResponse> =
            await axios.get<SlipResponse>(ADVICE_API_ID_URL);
        //   console.log(response.data)
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function idsAdviceAll(ids: Number[]): Promise<SlipResponse[]> {
    // TODO: Handle when there are more than one id passed in, ex --ids="1,3,13"
    try {
        var adviceArray = [];
        for (var i = 0; i < ids.length; i++) {
            adviceArray.push(axios.get<SlipResponse>('https://api.adviceslip.com/advice/' + ids[i]));
        }
        const responses = await axios.all(adviceArray)
        const datas = responses.map(r => r.data);
       // console.log(datas);
        return datas;
    } catch (error) {
        console.error(error);
        throw error;
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
        throw error;
    }
}