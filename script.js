// DOM Module
const domStuff = (() => {
    const mySearch = document.querySelector(".search");
    const myReset = document.querySelector(".reset");
    mySearch.addEventListener("click", getMyWeather);
    myReset.addEventListener("click", clearMyEntry);
    document.addEventListener("DOMContentLoaded", function hideBrokenImg() {
        let firstLoadImg = document.querySelector('img');
        firstLoadImg.style.display='none';
    });
})();

// Async function to get the current weather
async function getMyWeather(myCity, myState, myCountry) {
    try {
        const myCity = document.getElementById("city").value;
        const myState = document.getElementById("state").value;
        const myCountry = document.getElementById("country").value;

        // Check to see if all fields have values
        if (myCity == "" || myCountry == "") {
            alert("Make sure everything is filled out!");
            return;
        };

        // Fetch, then wait for JSON reponse
        const response = await fetch("https://api.openweathermap.org/data/2.5/weather?q=" + searchCity + "," + searchState + "," + searchCountry + "&units=imperial&APPID=d1f87e6c9c7218274f8b83bf9e900783", { mode: "cors"});
        const data = await response.json();

        // Create object for weather app from API JSON data
        const myWeather = {
            mainWeather: currentData.weather[0].main,
            place: currentData.name + ", " + searchState.toUpperCase() + " " + currentData.sys.country,
            temp: Math.round(currentData.main.temp),
            humidity: currentData.main.humidity + "%",
            wind: Math.round(currentData.wind.speed) + " mph"
        };

        displayWeather(myWeather);

        getGiphy(myWeather.mainWeather);

    } catch (error) {
        console.log("error");
        alert("error");
    };
};

function clearMyEntry() {
    document.getElementById("city").value = "";
    document.getElementById("state").value = "";
    document.getElementById("country").value = "";
    const img = document.querySelector("img");
    img.style.display = "none";
    clearDOM();
};

// Function for displaying JSON to DOM
function displayWeather(myWeather) {
    const displayDiv = document.querySelector(".display-div");

    // Clear any DOM elements from previous search
    clearDOM();

    // Create DOM elements
    const city = document.createElement("p");
    city.textContent = myWeather.place;
    displayDiv.appendChild(city);
    const status = document.createElement("p");
    status.textContent = myWeather.mainWeather;
    displayDiv.appendChild(status);
    const cityTemp = document.createElement("p");
    cityTemp.textContent = myWeather.temp + " Degrees";
    displayDiv.appendChild(cityTemp);
    const cityHumidity = document.createElement("p");
    cityHumidity.textContent = myWeather.humidity + " Humidity";
    displayDiv.appendChild(cityHumidity);
    const cityWind = document.createElement("p");
    cityWind.textContent = myWeather.wind + " Wind";
    displayDiv.appendChild(cityWind);
}

async function getGiphy(mainWeather) {
    try {
        const img = document.querySelector("img");
        let keyWord = mainWeather;
        if (keyWord == "Clear") {
            keyWord = "Clear Sky";
        }
        const response = await fetch("https://api.giphy.com/v1/gifs/translate?api_key=jh5Ua1zTUPEmBUWYn69qc94sPCUIWoQz&weirdness=0&s=" + keyWord, { mode: "cors" });
        const giphyResponse = await response.json();
        img.style.display = "";
        img.src = giphyResponse.data.images.original.url;
    } catch (error) {
        console.log("error");
    };
};

function clearDOM() {
    // Clears prior searches
    const nodeList = document.querySelectorAll("p");
    if (nodeList !== null) {
        for (let i = 0; i < nodeList.length; i++) {
            nodeList[i].remove();
        };
    };
};