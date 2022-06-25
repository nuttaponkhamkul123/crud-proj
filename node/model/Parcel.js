const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let Parcel = new Schema({
    _id :{
        type : String
    },
    name : {
        type : String
    },
    measure : { 
        type : String
    },
    parcel_number : { 
        type : String
    },
    publicName : {
        type : String
    },
    quantity : {
        type : Number
    }
},
{
    collection : 'parcels'
})

module.exports = mongoose.model('Parcel',Parcel);