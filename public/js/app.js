

const form = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


form.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location = search.value

fetch('http://localhost:8888/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            messageOne.textContent= 'Unable to find the location'
            return console.log('Unable to find the location')
        }
        messageOne.textContent = data.location
        messageTwo.textContent = data.forecast
        
        console.log(data.forecast)
        console.log(data.location)

    })
})
    
})



