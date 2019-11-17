import { randomAdvice } from '../api/advice';

export function advice(idsStr: string, query: string): void {
    if (!idsStr && !query) {
        // random    
        randomAdvice()
            .then((r) => console.log(r.slip.advice));
    }

    // ids
    // query word

    // const ids = convertStrIds(idsStr)
    // console.log(ids);
    // console.log(query);
}

function convertStrIds(value: string): number[] {
    return value.split(',').map(value => parseInt(value));
}
