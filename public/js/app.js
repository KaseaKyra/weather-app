const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const weatherLocation = document.querySelector('#weather-location')
const weatherMsg = document.querySelector('#weather-message')
const weatherImg = document.querySelector('#weather-img')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    let searchVal = search.value
    fetch(`/weather?address=${searchVal}`)
        .then(response => {
            response.json().then((data) => {
                search.value = ''

                if (data.error) {
                    weatherLocation.textContent = ''
                    weatherMsg.textContent = ''
                    weatherImg.innerHTML = ''
                    return alert(data.error)
                }

                weatherLocation.textContent = `Location: ${data.location}`
                weatherMsg.textContent = `${data.data.weather_descriptions}. It is currently ${data.data.temperature} degrees out. There is a ${data.data.precip} % chance of rain`
                weatherImg.innerHTML = `<img src="${data.data.weather_icons}" alt="${data.data.weather_descriptions}">`
            })
        })
})