
const messageOne = document.getElementById("message-1")
const messageTwo = document.getElementById("message-2")
const messageThree = document.getElementById('message-3')
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')


messageOne.textContent = ''
messageTwo.textContent = ''
messageThree.textContent = ''

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
  
    const location = search.value
    messageOne.textContent = "Loading..."

fetch('/weather?address=' + location).then((response) => {
    response.json().then((data) => {
        
        if(data.error) {
            messageOne.textContent = data.error
        } else {
            messageOne.textContent = data.location
            messageTwo.textContent = data.degrees
            messageThree.textContent = data.weather
           
        }
    })
})

})