import { idAdvice, randomAdvice } from '../api/advice';

export function advice(idsStr: string, query: string): void {
    console.log(idsStr, query);

    if (!idsStr && !query) {
        // random    
        randomAdvice()
            .then((response) => console.log(response.slip.advice));
    }
    if (idsStr){
        // get advice by id#
        idAdvice(idsStr)
            .then((response) => console.log(response.slip.advice));
    }

    // ids
    // query word

    // const ids = convertStrIds(idsStr)
    // console.log(ids);
    // console.log(query);
}

function convertStrIds(value: string): number[] {
    return value.split(',').map(x => parseInt(x));
}
