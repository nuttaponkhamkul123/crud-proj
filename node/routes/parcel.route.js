const express = require('express');
const app = express();
const parcelRoute = express.Router();
let Parcel = require('../model/Parcel');


//Add Parcel
parcelRoute.route('/add-parcel').post((req,res,next) =>{
    console.log("test")
    Parcel.create(req.body, (err,data) => {
        if(err) return next(err);
        else res.json(data)
    })
})


//fetch all Parcels

parcelRoute.route('/').get((req,res) =>{

    Parcel.find((err,data) => {
        if(err){
            return next(err);
        } 
        else res.json(data);
    })
})

//get specific book

parcelRoute.route('/fetch-parcel/:id').get((req,res) =>{
    Parcel.findById(req.params.id,(err,data) => {
        if(err) return next(err);
        else res.json.data;
    })
})

//update parcel data
parcelRoute.route('/update-parcel/:id').put((req,res,next) =>{
    Parcel.findByIdAndUpdate(req.params.id,{
        $set : req.body
    }, (err,data) =>{
        if(err) return next(err);
        else{
            res.json(data);
            console.log("Parcel Updated");
        }
    })
})


//delete parcel

parcelRoute.route('/delete-parcel/:id').delete((req,res,next) =>{
    Parcel.findByIdAndRemove(req.params.id,(err,data) => {
        if(err) return next(err);
        else res.status(200).json({
            msg : data
        });
    })
})

module.exports = parcelRoute;