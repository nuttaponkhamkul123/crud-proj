const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let parcel_history = new Schema({
    _id :{
        type : String
    },
    parcel_id : String,
    isWithdraw : Boolean,
    date : Date,
    amount: Number,
    document : String,
    forerunner : String,
    note : String,
    
},
{
    collection : 'parcel_history'
})

module.exports = mongoose.model('parcel_history',parcel_history);