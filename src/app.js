const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const { hasSubscribers } = require('diagnostics_channel')



const app = express()
const port = process.env.PORT || 8888
const publicDirectoryFile = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)
app.use(express.static(publicDirectoryFile))

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send( {
            error:'You must provide an address'
        })

    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast:forecastData.descr,
                location,
                address:req.query.address
            })
        })
        

    })
})
app.get('',(req,res)=>{
    res.render('index',{
        title:"Weather"
    })
})
app.get('/index',(req,res)=>{
    res.render('index',{
        title:"Weather"
    })
})
app.get('/about',(req,res)=>{

    res.render('about',{
        title:"About Me"
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:"help",
        message:"Hello!Please share the issue"
    })

})
app.get('/help/*',(req,res)=>{
    res.send('There is no help page found')

})
app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        message:'Page not found'

    })
})

app.listen(port,()=>{
    console.log("Server is started at "+port)
})

