import { NewsData, hackerNewsId, hackerNewsIdsAll } from '../api/hackerNews';



export function news(idsStr: string, query: string): void {

    if (idsStr == "") {
        process.stderr.write("error: no id# was entered.");
    }

    /*
    // get title/time/author by single id#
    if(idsStr) {

        hackerNewsId(idsStr)
        .then((response: NewsData) => {
            //if (response.slip) {
                console.log(response.title)
                console.log(response.time)
                console.log(response.by);
            //} else {
            //    console.log('failed searching for ids: ' + idsStr);
        });
    }
    */
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
            hackerNewsIdsAll(idsArr)
                .then((response: NewsData[]) => {
                    const foo = response.map((x) => {
                        return x.title + " " + x.time + " " + x.by;
                    })
                    process.stdout.write(foo.join('\n'));

                    //response.forEach((x) => {
                    //    if (x.message) {
                    //        process.stderr.write(x.message.text)
                    //    }
                    //})
                })
        }

    }

    /*
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
            hackerNewsId(idsArr)
                .then((response: NewsData) => {
                    const advices = response.map((x) => {
                        return x.slip.advice;
                    })
                    process.stdout.write(advices.join('\n'));
                })
        }

    }
    */
}

function convertStrIds(value: string): number[] {
    return value.split(',').map(x => parseInt(x));
}
