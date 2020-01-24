import { idAdvice, randomAdvice, queryAdvice, SlipsResponse, SlipResponse } from '../api/advice';

export function advice(idsStr: string, query: string): void {

    if (!idsStr && !query) {
        // random    
        randomAdvice()
            .then((response) => console.log(response.slip.advice));
    }
    if (idsStr) {
        // get advice by id#
        idAdvice(idsStr)
            .then((response: SlipResponse) => {
                if (response.slip) {
                    console.log(response.slip.advice);   
                } else {
                    console.log('failed searching for ids: ' + idsStr);
                }
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
