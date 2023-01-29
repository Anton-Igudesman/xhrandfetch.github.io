const xhrBtn = document.getElementById('xhr');
xhrBtn.addEventListener('click', getJokeXHR);

const fetchBtn = document.getElementById('fetch');
fetchBtn.addEventListener('click', getJokeFetch);

const asyncBtn = document.getElementById('async');
asyncBtn.addEventListener('click', getJokeAsync);

const jokeOutput = document.getElementById('result');

function getJokeXHR () {
    let xhr = new XMLHttpRequest();

    xhr.open('GET', 'https://icanhazdadjoke.com/');
    
    //call after open but before send
    xhr.setRequestHeader('Accept', 'application/json')

    xhr.onload = () => {
        if (xhr.status === 200) {
            let jsonData = JSON.parse(xhr.responseText);
            console.log(jsonData);
            jokeOutput.innerHTML = jsonData.joke;
        } else {
            jokeOutput.textContent = 'Something went terribly wrong....'
        };
    };

    xhr.send();
};

function getJokeFetch() {
    fetch('https://icanhazdadjoke.com/', {
        method: 'GET',
        headers: { 'Accept': 'application/json'}
    })
        .then(response => response.json())
        .then(data => data.joke.toUpperCase())
        .then(finalJoke => jokeOutput.innerHTML = finalJoke)
        .catch(error => {
            console.log("there is an error", error)
        })
    };

    async function getJokeAsync() {
        const response = await fetch('https://icanhazdadjoke.com/', {
            method: 'GET',
            headers: {'Accept': 'application/json'}
        })
        const data = await response.json();
        jokeOutput.innerHTML = data.joke;
        
    }
