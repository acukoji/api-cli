import { idAdvice, randomAdvice, queryAdvice, SlipsResponse, SlipResponse } from '../api/advice';

export function advice(idsStr: string, query: string): void {

    if (!idsStr && !query) {
        // random    
        randomAdvice()
            .then((response: SlipResponse) => console.log(response.slip.advice));
    }
    if (idsStr) {
        // get advice by id#

        // convert idsStr into separate numbers if there is more than one
        convertStrIds(idsStr)
        console.log(idsStr)
        

        idAdvice(idsStr)
            //SlipResponse is for when there is only one id.
            .then((response: SlipResponse) => {
                if (response.slip) {
                    // why is it response.slip.advice here? Shouldn't it be text? 
                    // advice is for type Slip for random advice.
                    // advice is also not exported.
                    console.log(response.slip.advice);   
                } else {
                    console.log('failed searching for ids: ' + idsStr);
                }
                return response;
            });
    }
    if (query) {
        // get advice by query
        queryAdvice(query)
            .then((response: SlipsResponse) => {
                if (response.message) {
                    console.log(response.message.text);   
                }
                if (response.slips) {
                    // TODO: print out all the search response advice "text" on each line
                    console.log(response.slips)
                }
            });
    }
}

function convertStrIds(value: string): number[] {
    return value.split(',').map(x => parseInt(x));
}


