const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let Parcel = new Schema({
    name : {
        type : String
    },
    measure : { 
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