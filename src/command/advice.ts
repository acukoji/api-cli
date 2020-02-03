import { idAdvice, randomAdvice, queryAdvice, idsAdviceAll, SlipsResponse, SlipResponse } from '../api/advice';


//idStr = undefined | "" | '[1]'

export function advice(idsStr: string, query: string): void {
    //console.log(typeof idsStr)
    //console.log(query)

    // random  
    if (!idsStr && idsStr != "" && !query) {
        randomAdvice()
            .then((response: SlipResponse) => console.log(response.slip.advice));
    }

    // get advice by id#
    if (idsStr == "") {
        console.log("error: no id# was entered.")
    }
    if (idsStr) {
        // convert idsStr into separate numbers if there is more than one
        const idsArr = convertStrIds(idsStr);
        // TODO: If idsArr is empty, throw an error message
        console.log(idsArr)

        //console.log(idsStr)
        idsAdviceAll(idsArr)
            .then((response: SlipResponse[]) => {
                console.log(response);
            })
    }


    /*
            idAdvice(idsStr)
                .then((response: SlipResponse) => {
                    if (response.slip) {
                        console.log(response.slip.advice);   
                    } else {
                        console.log('failed searching for ids: ' + idsStr);
                    }
                    return response;
                });
        }
    */


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

    function convertStrIds(value: string): number[] {
        return value.split(',').map(x => parseInt(x));
    }
}
