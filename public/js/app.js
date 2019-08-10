const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')
const message3 = document.querySelector('#message-3')
const temperature = document.querySelector('#temperature')
const temperatureHigh = document.querySelector('#temperatureHigh')
const temperatureLow = document.querySelector('#temperatureLow')
const precipProbability = document.querySelector('#precipProbability')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    let location = search.value
    message1.textContent = ''
    message2.textContent = ''
    message3.textContent = ''
    temperature.textContent = ''
    temperatureHigh.textContent = ''
    temperatureLow.textContent = ''
    precipProbability.textContent = ''

    if(location.toLowerCase() === 'law'){
        location = 'Harihar'
        message3.textContent = 'Ancy...I Love You !!!'
    }
    if(location.toLowerCase() === 'ancy'){
        location = 'Tirupati'
        message3.textContent = 'Hi Law !!!'
    }
    fetch('/weather?address=' + location).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            console.log(data.error)
            message1.textContent = data.error
        }else{
            console.log(data.location)
            console.log(data.forecast)
            message1.textContent = data.location
            message2.textContent = data.forecast
            temperature.textContent = 'Temperature: ' + data.temperature
            temperatureHigh.textContent = 'Temperature High: ' + data.temperatureHigh
            temperatureLow.textContent = 'Temperature Low: ' + data.temperatureLow
            precipProbability.textContent = 'Precip Probability: ' + data.precipProbability * 100
        }
    })
})
})








