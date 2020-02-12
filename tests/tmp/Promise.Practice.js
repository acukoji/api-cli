
//https://www.youtube.com/watch?v=DHvZLI7Db8E

// example of a promise:
//let p = new Promise((resolve, reject) => {
//    let a = 1 + 1
//    if (a == 2){
//        resolve('Success')
//    } else {
//        reject('Failed')
//    }
//})
//
//p.then((message) => {
//    console.log('This is in the then: ' + message)
//}).catch((message) => {
//    console.log('this is in the catch: ' + message)
//})


// replacing call back functions with promises

//const userLeft = false
//const userWatchingCatMeme = false
//
//function watchTutorialCallback(callback, errorCallback) {
//    if(useleft) {
//        errorCallback({
//            name: 'User Left',
//            message: ':('
//        })
//    } else if (userWatchingCatMeme) {
//        errorCallback({
//            name: 'User Watching Cat Meme', 
//            message: 'webDevSimplified < Cat'
//        })
//    } else {
//        callback('Thumbs up and Subscribe')
//    }
//}
//
//watchTutorialCallback(
//   (message) => {
//    console.log('Success' + message)
//}, (error) => {
//    console.log(error.name + ' ' + error.message)
//})
//
//
//function watchTutorialPromise() {
//    return new Promise((resolve, reject) => {
//        if(useleft) {
//            reject({
//                name: 'User Left',
//                message: ':('
//            })
//        } else if (userWatchingCatMeme) {
//            reject({
//                name: 'User Watching Cat Meme', 
//                message: 'webDevSimplified < Cat'
//            })
//        } else {
//            resolve('Thumbs up and Subscribe')
//        }
//    })
//}
//
//watchTutorialPromise().then((message) => {
//    console.log('Success' + message)
//}).then((message) => {
//    console.log('Success' + message)
//}).then((message) => {
//    console.log('Success' + message)
//}).catch((error) => {
//    console.log(error.name + ' ' + error.message)
//})


const recordVideoOne = new Promise((resolve, reject) => {
    resolve('Video 1 Recorded')
})

const recordVideoTwo = new Promise((resolve, reject) => {
    resolve('Video 2 Recorded')
})

const recordVideoThree = new Promise((resolve, reject) => {
    resolve('Video 3 Recorded')
})

Promise.all([
    recordVideoOne,
    recordVideoTwo,
    recordVideoThree
]).then((messages) => {
    console.log(messages)

//Promise.race([
//    recordVideoOne,
//    recordVideoTwo,
//    recordVideoThree
//]).then((message) => {
//    console.log(message)

})

//ARROW FUNCTION PRACTICE

function sum(a, b) {
    return a + b
}

let sum2 = (a, b) =>  a + b


function isPositive(number) {
    return number >= 0
}

let isPositive2 = number => number >= 0


function randomNumber() {
    return Math.random
}

let randomNumber2 = () => Math.random


document.addEventListener('click', function() {
    console.log('Click')
})

document.addEventListener('click', () => console.log('Click'))


//https://www.youtube.com/watch?v=h33Srr5J9nY
// arrow functions redefine the 'this' keyword within the function
// the scoping of the 'this' is one of the biggest reasons for using arrow fxn

class Person {
    constructor(name) {
        this.name = name
    }

    printNameArrow() {
        setTimeout(() => {
            console.log('Arrow: ' + this.name)
        }, 100)
    }

    printNameFunction() {
        setTimeout(function() {
            console.log('function: ' + this.name)
        })
    }
}

let person = new Person('Bob')
person.printNameArrow() // 'this' is not redefined from where it appears above in the arrow function
person.printNameFunction() //'this' is redefined with a global scope