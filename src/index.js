import init, { Hello } from "hello";

init()
    .then(() => {

        const helloWorld = Hello.new('so have we found it')

        console.log(helloWorld.message())

    });


// let doc = document.getElementById("hello")

// console.log(doc)

// doc.setAttribute('data-text','We Work')