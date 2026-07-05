// fetch("https://api.openweathermap.org/data/2.5/weather?q=kozhikode&appid=f8be7855d26fc49aeefbc9d0d00af2fa&units=metric")

const apiKey = "f8be7855d26fc49aeefbc9d0d00af2fa"
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const wicon = document.querySelector(".wIcon");


async function checkW(city){
    const response = await fetch(apiUrl+city+`&appid=${apiKey}`);
    var data = await response.json();
    // console.log(data);
    if(data.cod == "404"){
        document.querySelector(".city").innerHTML = "City not found";
        document.querySelector(".temp").innerHTML = "----";
        document.querySelector(".humidity").innerHTML = "----";
        document.querySelector(".wind").innerHTML = "----";
        return; 
    }


    document.querySelector(".city").innerHTML=data.name;
    document.querySelector(".temp").innerHTML=Math.round(data.main.temp )+"°C";
    document.querySelector(".humidity").innerHTML=data.main.humidity+"%";
    document.querySelector(".wind").innerHTML=data.wind.speed+"km/h";

    if(data.weather[0].main == "Clouds"){
        wicon.src = "clouds.png"
    }
    else if(data.weather[0].main == "Rain"){
        wicon.src = "rain.png"
    }
    else if(data.weather[0].main == "Snow"){
        wicon.src = "snow.png"
    }
    else if(data.weather[0].main == "Clear"){
        wicon.src = "clear.png"
    }
    else if(data.weather[0].main == "Drizzle"){
        wicon.src = "drizzle.png"
    }
    else if(data.weather[0].main == "Mist"){
        wicon.src = "mist.png"
    }
}
searchBtn.addEventListener("click",()=>{
    checkW(searchBox.value)
})
checkW()


