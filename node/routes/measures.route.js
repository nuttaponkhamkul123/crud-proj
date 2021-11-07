const express = require('express');
const app = express();
const measuresRoute = express.Router();
let Measures = require('../model/Measures');


//Add Measures
measuresRoute.route('/add-measure').post((req,res,next) =>{
    console.log("test")
    Measures.create(req.body, (err,data) => {
        if(err) return next(err);
        else res.json(data)
    })
})


//fetch all Measures

measuresRoute.route('/fetch-measures').get((req,res) =>{

    Measures.find((err,data) => {
        if(err){
            return next(err);
        } 
        else res.json(data);
    })
})

//get specific Measures

measuresRoute.route('/fetch-measure/:id').get((req,res) =>{
    
    Measures.findById(req.params.id,(err,data) => {
        if(err) return next(err);
        else res.json(data);
        
    })
})

//update Measures data
measuresRoute.route('/update-measure/:id').put((req,res,next) =>{
    Measures.findByIdAndUpdate(req.params.id,{
        $set : req.body
    }, (err,data) =>{
        
        if(err) {
            return next(err);
        }else{
            
            res.json(data);
            console.log("Measure Updated");
        }
    })
})


//delete Measures

measuresRoute.route('/delete-measure/:id').delete((req,res,next) =>{
    Measures.findByIdAndRemove(req.params.id,(err,data) => {
        if(err) return next(err);
        else res.status(200).json({
            msg : data
        });
    })
})

module.exports = measuresRoute;