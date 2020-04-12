
export function convertToAscii(url: string): void {
    //logic for parameter url
    //does the url exist?
    //first just make it work for a url that is an endpoint for an image
    //Later:
    //does the url contain image? (this is an edgecase for later)
    //does the image have to be in a particular format (e.g. jpeg)?
    //does the image have an upper limit for size?
    const imageToAscii = require("image-to-ascii");

    //TODO: change hardcoded dog url to accept cli --url option/value.
    //TODO: code logic to throw error message for when imageToAscii
    // fails to convert image to Ascii art.
    //TODO: integration tests for above 2 cases.

    //Static test url: 
    //imageToAscii("https://octodex.github.com/images/octofez.png", (err: any, converted: any) => {
    //    console.log(err || converted);

    //Missing url argument handling was unnecessary, 
    //as this error handling is built into the API
    if(url == ""){
        throw Error('Error: no url was entered');
    }
     if (url != undefined){
        imageToAscii(url, (err: any, converted: any) => {
            if (converted) {
                console.log(converted);
            }
            if (err){
                console.error('Error: failed to convert url to image.')
            }
        })
    }
    //if (url == undefined){
    //    throw Error("This url is not valid");
    //};

}