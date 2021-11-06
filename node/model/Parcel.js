const mongoose = required ('mongoose');
const schema = mongoost.Schema;


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

module.export = mongoose.model('Parcel',Parcel);