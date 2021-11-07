const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let Measures = new Schema({
    _id :{
        type : String
    },
    measureName : { 
        type : String
    }
    
},
{
    collection : 'measures'
})

module.exports = mongoose.model('Measures',Measures);