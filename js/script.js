function toCelsium(kelvins){
    return Math.round(kelvins - 273.15)
}

function getWindDirect(deg){
    deg = Number(deg)
    if (deg > 0 && deg < 90){
        return 'North-East'
    }else if (deg > 90 && deg < 180){
        return 'South-East'
    }else if (deg > 180 && deg < 270){
        return 'South-West'
    }else if (deg > 270 && deg < 360){
        return 'North-West'
    }

}

function getComments(){
    let xmlHttp = new XMLHttpRequest()
    document.body.innerHTML += `<ul class = 'commentsList'>Comments:</ul>`
    xmlHttp.onload = () => {
        let commentsArr = JSON.parse(xmlHttp.responseText)
        for (let i = 0; i < 30; i++){
            document.querySelector('.commentsList').innerHTML += `
                <ul class = 'coment'>Coment${i + 1}:
                    <li>name: ${commentsArr[i].name}</li>
                    <li>email: ${commentsArr[i].email}</li>
                    <li>body: ${commentsArr[i].body}</li>
                </ul>
            `
        }
    }
    xmlHttp.open("GET", 'https://jsonplaceholder.typicode.com/comments')
    xmlHttp.send()
}


function getWeather(){
    let xmlHttp = new XMLHttpRequest()
    let weatherData = ''
    xmlHttp.onload = () => {
        weatherData += xmlHttp.responseText
        console.log(weatherData)
    }  
    xmlHttp.open("GET", 'https://api.openweathermap.org/data/2.5/forecast?q=Minsk&appid=a94d0a5ac08570add4b47b8da933f247', false)
    xmlHttp.send()
    return JSON.parse(weatherData)
}

const weatherData = getWeather()

document.querySelector('.place').innerHTML += `${weatherData.city.name}, ${weatherData.city.country}`
document.querySelector('.time').innerHTML += `${weatherData.list[0].dt_txt.split(' ')[1]}`
document.querySelector('.weatherFeature').innerHTML += `<img src = http://openweathermap.org/img/w/${weatherData.list[0].weather[0].icon}.png>`
document.querySelector('.weatherFeature').innerHTML += `<p>${weatherData.list[0].weather[0].description}</p>`
document.querySelector('.weatherFeature').innerHTML += `<p>${toCelsium(weatherData.list[0].main.temp)}C</p>`
document.querySelector('.wind').innerHTML += `<p>${getWindDirect(weatherData.list[0].wind.deg)}</p>`
document.querySelector('.wind').innerHTML += `<p>${weatherData.list[0].wind.speed}m/s</p>`

for (let i = 1; i <= 39; i++){
    document.querySelector('.weathersInTime').innerHTML += `<div class = "items item${i}"></div>`
    document.querySelector(`.item${i}`).innerHTML += `<div class = "itemTime"><p>${weatherData.list[i].dt_txt.split(' ')[0]}</p><p>${weatherData.list[i].dt_txt.split(' ')[1]}</p></div>`
    document.querySelector(`.item${i}`).innerHTML += `<img src = http://openweathermap.org/img/w/${weatherData.list[i].weather[0].icon}.png>`
    document.querySelector(`.item${i}`).innerHTML += `<p class = "itemTemp">${toCelsium(weatherData.list[i].main.temp)}C</p>`
}

// document.querySelector('.weathersInTime').innerHTML += `<div class = "items item${1}"></div>`
// document.querySelector(`.item${1}`).innerHTML += `<div class = "itemTime"><p>${weatherData.list[1].dt_txt.split(' ')[0]}</p><p>${weatherData.list[1].dt_txt.split(' ')[1]}</p></div>`
// document.querySelector(`.item${1}`).innerHTML += `<img src = http://openweathermap.org/img/w/${weatherData.list[1].weather[0].icon}.png>`
// document.querySelector(`.item${1}`).innerHTML += `<p class = "itemTemp">${toCelsium(weatherData.list[0].main.temp)}C</p>`