const axios = require('axios');
//var webAdress = process.argv[2];
 
// 'lkjsdflkj <a href="#" class="taskName">foo bar baz</a>lskjdf '.match((/<a [^>]+>([^<]+)<\/a>/))[0]
//      '<a href="#" class="taskName">foo bar baz</a>'

axios.get('https://google.com/')
  .then(function (linkText: string) {
    // handle success
        return linkText.match(/<a [^>]+>([^<]+)<\/a>/)[1]
        console.log(linkText);
  })
 /* .catch(function (error: any) {
    // handle error
    console.log(error);
  }))
  */


//assignment instructions:
/*
Most web pages have links, or rather [anchors <a href="URL"></a>](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a)

Create a Typescript command-line application that takes a single argument
- URL

Given that URL, we will call an HTTP GET on that URL to fetch the URL's HTML content. Once we have fetched the HTML content, search the HTML content for all HTML anchors `<a href="URL">Link Text</a>` and print them out.

You can use Axios to HTTP GET the HTML content, or some other HTTP library.
*/

/* questions:
-DOM approach?
-regex approach?

/*resources:
https://github.com/axios/axios

https://blog.logrocket.com/how-to-make-http-requests-like-a-pro-with-axios/
--using get url and logging response.

https://alvi
nalexander.com/javascript/javascript-function-extract-text-from-anchor-tag-using-regex
--using regex to parse anchor tags.
--  return linkText.match(/<a [^>]+>([^<]+)<\/a>/)[1];


*/