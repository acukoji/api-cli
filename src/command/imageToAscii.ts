
export function convertToAscii(url: string): void {
    //logic for parameter url
    //does the url exist?
    //first just make it work for a url that is an endpoint for an image
    //Later:
    //does the url contain image? (this is an edgecase for later)
    //does the image have to be in a particular format (e.g. jpeg)?
    //does the image have an upper limit for size?
    const imageToAscii = require("image-to-ascii");

    imageToAscii("https://octodex.github.com/images/octofez.png", (err: any, converted: any) => {
        console.log(err || converted);
    });

}