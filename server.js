const express = require('express');
const app = express();
const methodOverride = require('method-override')
const mongoose = require('mongoose');
const Score = require('./Models/Score.js')
const cors = require('cors')
require('dotenv').config()


// const PORT = process.env.PORT;

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', (error) => console.log(error.message, 'error'))
db.on('connected', () => console.log('mongo connected'))
db.on('disconnected', () => console.log('mongo disconnected'))


app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.use(cors())

app.get('/', async (req,res) => {
    try{
        const score = await Score.find({})
        res.send(score)
    } catch {
        console.log('error', error)
        res.send({error: 'something went wrong'})
    }
});

// app.post('/', aysnc (req,res) => {
//     Score.create(req.body, (error, createdScore) => {
//         res.send(createdScore)
//         console.log('score created')
//     })
// })

app.post('/create', async (req,res) => {
    try {
        const createdScore = await Score.create(req.body)
        res.send(createdScore);
    } catch (err) {
        console.log('error', error)
        res.send({error: 'something went wrong - check network dev tools'})
    }
})

app.listen(process.env.PORT || 8080, () => {
    console.log('express is lgistening at port');
})
