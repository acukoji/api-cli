//Start with:
//- ts-node ./index.ts hn --ids 8863,8265435
//- Print title, time, author name

// hacker-news.firebaseio.com/v0/item/8863.json?print=pretty
// There is extra url info after the item #, 
// const HACKERNEWS_API_URL will have to be split because of this
// so somewhere, we'll have to add ".json?print=pretty" after item #.

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

/*
export async function hackerNewsIdsAll(ids: Number[]): Promise<NewsData> {
    // TODO: Handle when there are more than one id passed in, ex --ids="1,3,13"
    try {
        var adviceArray = [];
        for (var i = 0; i < ids.length; i++) {
            adviceArray.push(axios.get<NewsData>("https://api.adviceslip.com/hacker-news.firebaseio.com/v0/item/" + ids[i] + ".json"));
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
*/

