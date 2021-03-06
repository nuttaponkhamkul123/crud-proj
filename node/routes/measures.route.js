const express = require('express');
const app = express();
const measuresRoute = express.Router();
let Measures = require('../model/Measures');

measuresRoute.route('/').get((req,res) =>{

    Measures.find((err,data) => {
        if(err){
            return next(err);
        } 
        else res.json(data);
    })
})
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
        else {
            res.json(data)
            
        }
    })
})

//get specific Measures

measuresRoute.route('/fetch-measure/:id').get((req,res) =>{
    console.log('fetch')
    Measures.findById(req.params.id,(err,data) => {
        if(err) return next(err);
        else {
            res.json(data)
        }
        
    })
})

//update Measures data
measuresRoute.route('/update-measure/:id').put((req,res,next) =>{
    console.log("update")
    Measures.findByIdAndUpdate(req.params.id,{
        $set : req.body
    },{new : true}, (err,data) =>{
        
        if(err) {
            return next(err);
        }else{
            
            res.json(data);
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