let express = require('express')
let path = require('path')
let mongoose = require('mongoose')
let cors = require('cors')
let bodyParser = require('body-parser')
let mongoDb = require('./db/db')

const createError = require('http-errors');


//connect to database
mongoose.Promise = global.Promise;
mongoose.connect(mongoDb.db, {
    useNewUrlParser : true,
}).then (() => {
    console.log("mongo connected");
}, err=>{
    console.log("Error to connect : " + err)
})

const parcelRoute = require('./routes/parcel.route')

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:false
}))
app.use(cors());

//static page
app.use(express.static(path.join(__dirname,'static/')))

app.get('/' ,(req,res)=>{
    res.sendFile(path.join(__dirname, 'static/index.html'))
})

//get parcel api 
app.use('/api' , parcelRoute);

const port = process.env.PORT || 8000;

app.listen(port, ()=>{
    console.log("Listening Port : " + port)
})




//error handler

app.use((req,res,next) => {
    next(createError(404));
})

app.use(function(err,req,res,next){ 
    console.error(err.message);
    if(!err.statusCode) err.statusCode = 500
    res.status(err.statusCode).send(err.message)

})
