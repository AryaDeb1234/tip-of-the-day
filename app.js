let tip = document.querySelector("#tip");
let btn = document.querySelector("#btn");
let author = document.querySelector("#author");
let body = document.querySelector("body");

//zen api with the help od chatgpt convert it for cross platform
const url = "https://api.allorigins.win/get?url=https://zenquotes.io/api/quotes";

// Unsplash API
const surl = "https://api.unsplash.com/search/photos?query=nature&client_id=n_aTYATpcta0fvrOsLuVREaWPEesAOdM9kVKbXePvlA";

let isLoading = false; // This flag prevents overlapping requests

let idx;
async function func() {
    let response = await fetch(url);
    let x = await response.json();
    let data = JSON.parse(x.contents);
    
    idx = Math.floor(Math.random() * 50);
    console.log(data.length);
    author.innerHTML = 'By: <span style="color: rgb(94, 209, 255); text-decoration: underline;">' + data[idx].a + '</span>';
    tip.innerHTML = data[idx].q;
}

let idx2;
async function func2() {
    if (isLoading) return;
    isLoading = true;
    btn.disabled = true;

    let response = await fetch(surl);
    let data = await response.json();
    idx2 = Math.floor(Math.random() * 10);

    //  Use raw with parameters for reliability
    //use full for responsive

    let x = data.results[idx2].urls.full;

    let img = new Image();//create new image object
    img.src = x;

    img.onload = function () {
        document.body.style.backgroundImage = "url("+x+")";   
        btn.disabled = false;
        isLoading = false;
    };

    img.onerror = function () {
        console.log("Failed to load background image.");
        btn.disabled = false;
        isLoading = false;
    };
}


function handleAction() {
    if (!isLoading) {
        func();
        func2();
    }
}

function fun(e) {
    if (e.key === "Enter") {
        handleAction();
    }
}

document.addEventListener("keydown", fun);
window.addEventListener("load", () => {
    func();
    func2();
});
btn.addEventListener("click", handleAction);
