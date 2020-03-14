//Start with:
//- ts-node ./index.ts hn --ids 8863,8265435
//- Print title, time, author name


import axios, { AxiosResponse } from 'axios';

export type NewsData = {
    by: string
    descendants: number
    id: number
    kids: number[]
    score: number
    time: number
    title: string
    type: string
    url: string
}

export type UserData = {
    about: string
    created: number
    id: string
    karma: number
    submitted: number[]
}

export type TopNews = number[]

/*
export async function hackerNewsId(idsStr: string): Promise<NewsData> {

    const HACKERNEWS_API_ID_URL = "https://hacker-news.firebaseio.com/v0/item/" + idsStr + ".json?print=pretty";
    //console.log (HACKERNEWS_API_ID_URL)
    try {
        const response: AxiosResponse<NewsData> =
            await axios.get<NewsData>(HACKERNEWS_API_ID_URL);
        //   console.log(response.data)
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
*/

/*
export async function hackerNewsUser(userStr: string): Promise<UserData> {
    const HACKERNEWS_API_USER_URL = "https://hacker-news.firebaseio.com/v0/user/" + userStr + ".json?print=pretty";
    console.log (HACKERNEWS_API_USER_URL)
    try {
        const response: AxiosResponse<UserData> =
            await axios.get<UserData>(HACKERNEWS_API_USER_URL);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
*/

export async function hackerNewsTopStories(TopNum: number): Promise<TopNews> {
    const HACKERNEWS_TOP_TEN_URL = "https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty";
    //console.log (HACKERNEWS_TOP_TEN_URL)
    try {
        const response: AxiosResponse<TopNews> =
            await axios.get<TopNews>(HACKERNEWS_TOP_TEN_URL);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function hackerNewsUserAll(userStr: string[]): Promise<UserData[]> {
    const HACKERNEWS_API_USER_URL = "https://hacker-news.firebaseio.com/v0/user/";
    try{
        // I don't understand the following line of code
        var userDataArray: Promise<AxiosResponse<UserData>>[] = [];
        for (var i = 0; i < userStr.length; i++) {
            userDataArray.push(axios.get<UserData>(HACKERNEWS_API_USER_URL + userStr[i] + ".json?print=pretty"));
        }

        const promises: Promise<AxiosResponse<UserData>[]> = axios.all(userDataArray);
        const responses: AxiosResponse<UserData>[] = await promises;
        //console.log(responses)
        const datas: UserData[] = responses.map(r => r.data);
        //console.log(datas);
        return datas;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function hackerNewsIdsAll(idsStr: Number[]): Promise<NewsData[]> {
    // TODO: Handle when there are more than one id passed in, ex --ids="1,3,13"
    const HACKERNEWS_API_ID_URL = "https://hacker-news.firebaseio.com/v0/item/";
    try {
        var newsArray: Promise<AxiosResponse<NewsData>>[] = [];
        for (var i = 0; i < idsStr.length; i++) {
            newsArray.push(axios.get<NewsData>(HACKERNEWS_API_ID_URL + idsStr[i] + ".json?print=pretty"));
        }

        const promises: Promise<AxiosResponse<NewsData>[]>  = axios.all(newsArray);
        const responses: AxiosResponse<NewsData>[] = await promises;
        //console.log(responses)
        // const responses = await axios.all(newsArray);

        const datas: NewsData[] = responses.map(r => r.data);
        //console.log(datas);
        return datas;
    } catch (error) {
        console.error(error);
        throw error;
    }
}


