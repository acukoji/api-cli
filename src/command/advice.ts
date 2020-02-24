import { idAdvice, randomAdvice, queryAdvice, idsAdviceAll, SlipsResponse, SlipResponse } from '../api/advice';



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
        process.stderr.write("error: no id# was entered.");
    }

    if (idsStr) {
        // convert idsStr into separate numbers if there is more than one
        const idsArr = convertStrIds(idsStr);
        // console.log(idsArr)

        let firstNaN = null;
        for (var i = 0; i < idsArr.length; i++) {
            if (isNaN(idsArr[i])) {
                // firstNaN = idsArr[i]
                const idStrArr = idsStr.split(',')
                firstNaN = idStrArr[i]
                break
            }
        }

        if (firstNaN != null) {
            process.stderr.write('error: ' + firstNaN + ' is not a number')
        } else {
            idsAdviceAll(idsArr)
                .then((response: SlipResponse[]) => {
                    response.map((x) => {
                        if (x.slip) {
                            console.log(x.slip.advice)
                        }
                        if (x.message) {
                            console.log(x.message.text)
                        }
                    })
                })
        }

    }


    if (query) {
        // get advice by query
        queryAdvice(query)
            .then((response: SlipsResponse) => {
                // response.message is the error message
                if (response.message) {
                    console.log(response.message.text);
                }
                // response.slips is the advice slip
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

// Removed idAdvice since idsAdviceAll can handle this situation
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