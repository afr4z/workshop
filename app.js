const express = require('express');
const app = express();
var axios = require("axios");


const songs = [
    {
        id: 1,
        title: 'Never Gonna Give You Up',
        artist: 'Rick Astley',
    },
    {
        id: 2,
        title: 'First Times',
        artist: 'Ed Sheeran',
    },
    {
        id: 3,
        title: 'Into The Unknown',
        artist: 'Unknown',
    },
    {
        id: 4,
        title: 'Perfect',
        artist: 'Ed Sheeran',
    },
    {
        id: 5,
        title: 'Pay Phone',
        artist: 'Maroon 5',
    },
]
//CONTROLLERS
const {getTitles} = require('./controllers/titles')
const {getArtists} = require('./controllers/artists')



//MIDDLEWARES 

app.use((req,res,next) => {
    console.log(new Date().toJSON())
    next()
})

app.use((req,res,next)=>{
    req.songs=songs
    next()
})

app.use(express.json())

//ROUTES

app.get('/',(req,res)=>{
    res.json(songs)
})

app.get('/titles',getTitles)

app.get('/artists',getArtists)

app.get('/songs', (req,res)=>{
    const array = songs.filter((s)=>{return s.artist==req.query.artist})
    res.json(array)
})

app.get('/songs/:id',(req,res)=>{
    const temp = songs.filter((s)=>{return s.id==req.params.id})
    res.json(temp)
})

app.post('/song',(req,res)=>{
    songs.push(req.body)
    res.json(songs)
    res.sendStatus(200)
})

app.patch('/song/:id',(req,res)=>{
    for (element of songs){
        if(element.id==req.params.id){
            element.artist=req.body.artist
            break;
        }
    }
    res.json(songs)
    res.sendStatus(200)
})

app.delete('/song/:id',(req,res)=>{
    let index = songs.findIndex((s)=> s.id==req.params.id)
    songs.splice(index,1)
    res.status(200).json(songs)

})

app.get('/data' , async (req,res)=>{
    const da = axios.get("https//jsonplaceholder.typicode.com/todos/1")
    
     console.log(da)
})

//STARTING THE SERVER
app.listen(3000,()=>{
    console.log('Listening on port 3000')
})