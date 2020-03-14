import { NewsData, UserData, hackerNewsIdsAll, hackerNewsUserAll, hackerNewsTopStories, TopNews } from '../api/hackerNews';



export function news(idsStr: string, userStr: string, topNum: number): void {
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

    if (userStr == "") {
        process.stderr.write("error: no user name was entered.");
    }

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
    if (topNum == undefined || null || NaN) {
        process.stderr.write("error: no number was entered.")
        console.log("error: no number was entered.")
    }
    if (topNum) {
        hackerNewsTopStories(topNum)
            .then((response: TopNews) => {
                const TopStoryIds = response.slice(0, topNum)
                console.log(TopStoryIds)
                hackerNewsIdsAll(TopStoryIds)
                    .then((response: NewsData[]) => {
                        const foo = response.map((x) => {
                            return "Title: " + x.title + "; "
                                + "Time: " + x.time + "; "
                                + "By: " + x.by + "\n";
                        })
                        process.stdout.write(foo.join('\n'));
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
                    + "Id: " + x.id + "\n" + "Karma: " + x.karma + "\n " 
                    //+ "Submitted: " + x.submitted 
                    + "\n";
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
                    + "By: " + x.by + "\n";
                })
                process.stdout.write(foo.join('\n'));

                //response.forEach((x) => {
                //    if (x.message) {
                //        process.stderr.write(x.message.text)
                //    }
                //})
            })

    }
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

}

// new version of convertStrIds
// accounts for Nan error handling
// eliminates necessity of Nan handling in function News,
// simplifying readability

function convertStrIds(value: string): number[] {
//    console.log('something')
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

function convertUserIds(value: string): string[] {
    const splitUsers =  value.split(',')
    return splitUsers;
} 


// old convertStrIds --replaced by a function that can
// also throws an error if Nan is detected in the number[]
// note: Nan is "not a number" but is of number type.

//function convertStrIds(value: string): number[] {
//    return value.split(',').map(x => parseInt(x));
//}
