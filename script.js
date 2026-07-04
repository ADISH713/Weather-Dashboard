// fetch("https://api.openweathermap.org/data/2.5/weather?q=kozhikode&appid=f8be7855d26fc49aeefbc9d0d00af2fa&units=metric")

const apiKey = "f8be7855d26fc49aeefbc9d0d00af2fa"
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=kozhikode";
async function checkW(){
    const response = await fetch(apiUrl+`&appid=${apiKey}`);
    var data = await response.json();
    // console.log(data);
    document.querySelector(".city").innerHTML=data.name;
    document.querySelector(".temp").innerHTML=Math.round(data.main.temp )+"°C";
    document.querySelector(".humidity").innerHTML=data.main.humidity+"%";
    document.querySelector(".wind").innerHTML=data.wind.speed+"km/h";
}
checkW()


