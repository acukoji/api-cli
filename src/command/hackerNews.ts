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

// new version of convertStrIds
// accounts for Nan error handling
// eliminates necessity of Nan handling in function News,
// simplifying readability

function convertStrIds(value: string): number[] {
    return value
        .split(',')
        .map((x: string) => {
            const parsedValue: number = parseInt(x);
            if (isNaN(parsedValue)) {
                throw Error('Error: ' + x + ' is not a number');
            }
            return parsedValue;
        });
}


// old convertStrIds --replaced by a function that can
// also throws an error if Nan is detected in the number[]
// note: Nan is "not a number" but is of number type.

//function convertStrIds(value: string): number[] {
//    return value.split(',').map(x => parseInt(x));
//}
