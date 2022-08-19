const express = require('express');
const app = express();
const methodOverride = require('method-override')
const mongoose = require('mongoose');
const Score = require('./Models/Score.js')
require('dotenv').config()


const PORT = process.env.PORT;

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

app.get('/', (req,res) => {
    res.send('<h1>hello</h1>')
})

app.post('/', (req,res) => {
    Score.create(req.body, (error, createdScore) => {
        res.redirect('/')
        console.log('score created')
    })
})

// app.listen(PORT, () => {
//     console.log('express is listening at port', PORT);
// })
