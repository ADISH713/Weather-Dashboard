// fetch("https://api.openweathermap.org/data/2.5/weather?q=kozhikode&appid=f8be7855d26fc49aeefbc9d0d00af2fa&units=metric")

const apiKey = "f8be7855d26fc49aeefbc9d0d00af2fa"
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".searchBtn");
const wicon = document.querySelector(".wIcon");

const favB = document.getElementById("favB");
const favImg = document.getElementById("favImg");
const favList = document.querySelector(".favList");

const spinner = document.querySelector(".spinner");

let  isFav = false;
let cCity ="";

let favorites =[];
try{
favorites = JSON.parse(localStorage.getItem("favorites")) || [];
}
catch(error){
    console.error("Couldn't read favourites");
    favorites=[];
}

function saveFav(){
    try{
        localStorage.setItem("favorites",JSON.stringify(favorites));
    }
    catch(error){
        console.log("Couldn't save favoutites");
    }
    
}

function updateFav(){
    isFav=favorites.includes(cCity);
    favImg.src = isFav ? "heart(1).png":"love.png";
}

function renderFav(){
    favList.innerHTML = "";
    favorites.forEach(city=>{
        const chip = document.createElement("div");
        chip.classList.add("favChip");

        const cityName = document.createElement("span");
        cityName.textContent = city;
        cityName.classList.add("favCityName");
        cityName.addEventListener("click",()=>{
            searchBox.value = "";
            checkW(city);
        });
        const removeBtn = document.createElement("span");
        removeBtn.textContent = " 🗑️";
        removeBtn.classList.add("favRemove");
        removeBtn.addEventListener("click",()=>{
            favorites = favorites.filter(c=>c!==city);
            saveFav();
            renderFav();
            updateFav();

        })
        chip.appendChild(cityName);
        chip.appendChild(removeBtn);
        favList.appendChild(chip);
    })
}

// favB.addEventListener("click",()=>{
//     isFav = !isFav;
//     favImg.src = isFav?"heart(1).png":"love.png"
// });
favB.addEventListener("click",()=>{
    if(!cCity || cCity === "City not found") return;

    if(favorites.includes(cCity)){
        favorites = favorites.filter(c=>c!==cCity);
    } else {
        favorites.push(cCity);
    }
    saveFav();
    updateFav();
    renderFav();
});

function debounce(fn,delay){
    let timer = null;
    return(...args)=>{
        clearTimeout(timer);
        timer = setTimeout(()=>fn(...args),delay);
    };
}

async function checkW(city){
    spinner.classList.add("active");
    try{
    const response = await fetch(apiUrl+city+`&appid=${apiKey}`);
    if(!response.ok && response.status !== 404){
        throw new Error(`weather API error:${response.status}`)
    }

    var data = await response.json();

    if(data.cod == "404"){
        document.querySelector(".city").innerHTML = "City not found";
        document.querySelector(".temp").innerHTML = "--";
        document.querySelector(".humidity").innerHTML = "----";
        document.querySelector(".wind").innerHTML = "----";
        cCity = "";
        updateFav();
        spinner.classList.remove("active");
        return;
    }

    cCity = data.name;

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp)+"°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity+"%";
    document.querySelector(".wind").innerHTML = data.wind.speed+" m/s";

    wicon.src = data.weather[0].main.toLowerCase() + ".png";

    updateFav();
    spinner.classList.remove("active");
}
catch(error){
    console.error("Couldn't fetch weather:", error);
    spinner.classList.remove("active");
}
}
const debouncedSearch = debounce((city)=>checkW(city),800);
searchBtn.addEventListener("click",()=>{
    debouncedSearch(searchBox.value);
});
searchBox.addEventListener("input",()=>{
    debouncedSearch(searchBox.value);
});

checkW("New York");
renderFav();

const card = document.querySelector(".card");
const themeB = document.getElementById("theme");

function timeTheme(){
    const hour = new Date().getHours();
    if(hour>=19 || hour<=6){
        card.classList.add("night");
        themeB.textContent = "☀️";
    } else {
        card.classList.remove("night");
        themeB.textContent = "🌙";
    }
}
timeTheme();

themeB.addEventListener("click",()=>{
    card.classList.toggle("night");
    themeB.textContent = card.classList.contains("night") ? "☀️" : "🌙";
});
