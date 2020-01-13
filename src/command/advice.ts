import { idAdvice, randomAdvice } from '../api/advice';

export function advice(idsStr: string, query: string): void {

    if (!idsStr && !query) {
        // random    
        randomAdvice()
            .then((response) => console.log(response.slip.advice));
    }
    if (idsStr) {
        // get advice by id#
        idAdvice(idsStr)
            .then((response) => console.log(response.slip.advice));
    }
    // TODO: If query is defined, invoke api/advice search Advice API function
    // TODO: pass query into api/advice search Advice API funciton
    // TODO: print out all the search response advice text on each line

    // ids
    // query word

    // const ids = convertStrIds(idsStr)
    // console.log(ids);
    // console.log(query);
}

function convertStrIds(value: string): number[] {
    return value.split(',').map(x => parseInt(x));
}
