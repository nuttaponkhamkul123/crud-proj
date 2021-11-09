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
const measureRoute = require('./routes/measures.route')


const app = express();
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200'); 
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:false
}))


//static page
app.use(express.static(path.join(__dirname,'static/')))
//if user enter in localhost:8000 user will get plain page with big test text
app.get('/' ,(req,res)=>{
    res.sendFile(path.join(__dirname, 'static/index.html'))
})


//get parcel api 

app.use('/api' , parcelRoute);
app.use('/api/measures',cors(), measureRoute);

//set port as 8000
const port = process.env.PORT || 8000;

//port listening
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
