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
        // 'a,3,4' -> [NaN, 3, 4]
        // 
        // convert idsStr into separate numbers if there is more than one
        const idsArr = convertStrIds(idsStr);
        // console.log(idsArr)

        // let firstNaN = null;
        // for (var i = 0; i < idsArr.length; i++) {
        //     if (isNaN(idsArr[i])) {
        //         // firstNaN = idsArr[i]
        //         const idStrArr = idsStr.split(',')
        //         firstNaN = idStrArr[i]
        //         break
        //     }
        // }

        // if (firstNaN != null) {
        //     process.stderr.write('error: ' + firstNaN + ' is not a number')
        // } else {
            idsAdviceAll(idsArr)
                .then((response: SlipResponse[]) => {
                    const advices = response.map((x) => {
                        //return x.message + " " + x.slip.advice;
                        return x.slip.advice;
                    })
                    process.stdout.write(advices.join('\n'));

                    response.forEach((x) => {
                        if (x.message) {
                            process.stderr.write(x.message.text)
                        }
                    })
                })
        // }

    }


    if (query) {
        // get advice by query
        queryAdvice(query)
            .then((response: SlipsResponse) => {
                // response.message is the error message
                if (response.message) {
                    process.stderr.write(response.message.text);
                }
                // response.slips is the advice slip
                if (response.slips) {
                    const advices = response.slips.map((x) => {
                        return x.advice;
                    });
                    process.stdout.write(advices.join('\n'))
                }
            });
    }
}

function convertStrIds(value: string): number[] {
    return value
        .split(',')
        .map((x: string) => {
            const parsedValue: number = parseInt(x);
            if (isNaN(parsedValue)) {
                throw Error('error: ' + x + ' is not a number');
            }
            return parsedValue;
        });
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