export interface Parcel{
    _id : String;
    name : String;
    publicName : String;
    parcel_number : String;
    measure : String;
    quantity : Number;
}

export interface ParcelHistory {
    _id : String,
    parcel_id : String,
    isWithdraw : Boolean,
    date : Date,
    amount: Number,
    document : String,
    forerunner : String,
    note : String,
}