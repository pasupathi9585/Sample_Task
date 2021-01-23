const router = require("express").Router();
const User = require("./userSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const message = require("./constans")
const mongodb = require("mongodb");
const ObjectID = require('mongodb').ObjectID;

//register
router.post("/register",async (req,res) => {
    try{
        var emailExist = await User.findOne({email: req.body.email})
        if(emailExist){
            return res.status(200).json(message.error_emailExist)
        }else{      
            console.log(req.body.email)
            const user = new User({
                name: req.body.name,
                email: req.body.email,
                salary: req.body.salary,
                designation: req.body.designation
            });
            let data = await user.save();
            res.status(200).json({ data,
                       success:message.success_register
                    })
        }
    }catch(err){
        res.status(400).json(err)
    }
})

//search
router.post("/search",async (req,res) => {
    try{
        let result = await User.find(
            {
                name: req.body.name,
                email: req.body.email,
             }
        );
        if(result){
            res.status(200).json({
                result
            })
        }else{
            res.status(400).json("Data not Found")
        }
        
    }catch(err){
        res.status(400).json(err)
    }
})

//update
router.put("/update/:id",async (req,res) => {
    try{
        var uid = req.params.id.toString();
        let result = await User.updateOne(
            {_id : new mongodb.ObjectId(uid)},
            { $set: req.body }, function(err, obj){
                if (err) throw err;
                else{
                    res.status(200).json({
                        success: "Updated successfully"
                    })
                }
            }
        );
    }catch(err){
        res.status(400).json(err)
    }
})

//delete
router.delete("/delete/:id", async (req,res) => {
    try{
        var uid = req.params.id.toString();
        let result = await User.deleteOne({_id : new mongodb.ObjectId(uid)}, function(err, obj) {
            if (err) throw err;
            else{
                res.status(200).json({
                    success: "deleted successfully"
                })
            }
            });
    console.log(result)
    }catch(err){
        res.status(400).json(err)
    }
})


//getall data
router.get("/getAll",async (req,res) =>{
    try{
    var userdata = await User.find({})
    res.status(200).json({ 
        userdata
     })
    }catch(err){
        res.status(400).json(err)
    }
    })



module.exports = router;