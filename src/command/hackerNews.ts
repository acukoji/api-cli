import { NewsData, UserData, hackerNewsIdsAll, hackerNewsUserAll, hackerNewsTopStories, TopNews } from '../api/hackerNews';
import { isBoolean } from 'util';


//TODO: Throw error below instead of logging out error messages.  
export function news(idsStr: string, userStr: string, topNumStr: string): void {
    if (idsStr == "") {
        //process.stderr.write("error: no id# was entered.");
        throw Error('Error: no id# was entered');
    }

    if (userStr == "") {
        //process.stderr.write("error: no user name was entered.");
        throw Error('Error: no user name was entered');
    }

    // console.log(topNumStr);
    // if(topNumStr.toString() == true.toString()) {
    //     hackerNewsTopStories(1)
    //         .then((response: TopNews) => {
    //             const topStoryIds = response.slice(0, 1)
    //             console.log(topStoryIds)
    //             hackerNewsIdsAll(topStoryIds)
    //                 .then((response: NewsData[]) => {
    //                     const foo = response.map((x) => {
    //                         return "Title: " + x.title + "; "
    //                             + "Time: " + x.time + "; "
    //                             + "By: " + x.by;
    //                     })
    //                     console.log(foo.join('\n\n'));
    //                 })
    //         })
    // }

    // --top      => true
    // --top=     => "" 
    // --top=3    => "3" 
    // --top 3    => "3" 
    //            => undefined


    if (topNumStr == "") {
        //process.stderr.write("error: no number was entered.")
        throw Error('Error: no number was entered');
        //Note: error message for not having = and value needs to be adjusted.
    }
    // add logic to check to see if topNumStr is boolean 
    // if yes, assign topNum = 1
    if (topNumStr) {
        // use trinary for below code line
        // const topNum = (boolean condition) ? trueValue : falseValue
        const topNum = isBoolean(topNumStr) ? 1 : parseAndValidateNum(topNumStr);
        //console.log(topNum)

        // let topNum2: number;
        // if (isBoolean(topNumStr)) {
        //     topNum2 = 1
        // } else {
        //     topNum2 = parseAndValidateNum(topNumStr)
        // }
        // topNum2 = 323432;

        hackerNewsTopStories(topNum)
            .then((response: TopNews) => {
                const topStoryIds = response.slice(0, topNum)
                console.log(topStoryIds)
                hackerNewsIdsAll(topStoryIds)
                    .then((response: NewsData[]) => {
                        const foo = response.map((x) => {
                            return "Title: " + x.title + "; "
                                + "Time: " + x.time + "; "
                                + "By: " + x.by;
                        })
                        console.log(foo.join('\n\n'));
                    })
            })
    }

    if (userStr) {
        const userIdArr = convertUserIds(userStr);
        // console.log(userIdArr)

        hackerNewsUserAll(userIdArr)
            .then((response: UserData[]) => {
                const foo = response.map((x) => {
                    return "About: " + x.about + "\n" + "Created: " + x.created + "\n"
                        + "Id: " + x.id + "\n" + "Karma: " + x.karma + "\n";
                        //+ "Submitted: " + x.submitted 
                })
                process.stdout.write(foo.join(''));
            })
    }

    if (idsStr) {
        // convert idsStr into separate numbers if there is more than one
        const idsArr = convertStrIds(idsStr);
        // console.log(idsArr)

        hackerNewsIdsAll(idsArr)
            .then((response: NewsData[]) => {
                const foo = response.map((x) => {
                    return "Title: " + x.title + "; "
                        + "Time: " + x.time + "; "
                        + "By: " + x.by + '\n';
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

function convertStrIds(value: string): number[] {
    //    console.log('something')
    return value
        .split(',')
        .map((x: string) => {
            return parseAndValidateNum(x);
            // const parsedValue: number = parseInt(x);
            // if (isNaN(parsedValue)) {
            //     throw Error('Error: ' + x + ' is not a number');
            // }
            // return parsedValue;
        });
}

function parseAndValidateNum(value: string): number {
    const parsedValue: number = parseInt(value);
    //console.log(value)
    if (parsedValue < 1) {
        throw Error('Error: number must be at least 1.')
    }
    if (isNaN(parsedValue)) {
        //if(parsedValue == true){
        //    throw Error('Error: = sign is missing')
        //}
        throw Error('Error: ' + value + ' is not a number');
    }
    return parsedValue;
}

function convertUserIds(value: string): string[] {
    const splitUsers = value.split(',')
    return splitUsers;
}


//Old code:

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

 //if (userStr) {
    //    hackerNewsUser(userStr)
    //        .then((response: UserData) => {
    //            console.log(response.about)
    //            console.log(response.created)
    //            console.log(response.id)
    //            console.log(response.karma)
    //            console.log(response.submitted)
    //        });
    //}

    //if (top10 == " " || "10" || NaN) {
    //    hackerNewsTopTen(top10)
    //        .then((response: TopTen) => {
    //            const TopTenIds = response.slice(0, 10)
    //            console.log(TopTenIds)
    //            hackerNewsIdsAll(TopTenIds)
    //                .then((response: NewsData[]) => {
    //                    const foo = response.map((x) => {
    //                        return "Title: " + x.title + "; "
    //                            + "Time: " + x.time + "; "
    //                            + "By: " + x.by + "\n";
    //                    })
    //                    process.stdout.write(foo.join('\n'));
    //                })
    //        })
    //}

/*
if (userIdsStr) {
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
*/

// old convertStrIds --replaced by a function that simplifies readability
// and account for Nan error handling
// and eliminates necessity of Nan handling in function News,
// 
//function convertStrIds(value: string): number[] {
//    return value.split(',').map(x => parseInt(x));
//}
// throws an error if Nan is detected in the number[]
// note: Nan is "not a number" but is of number type.

