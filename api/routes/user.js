const User = require("../models/User");
const { verifyUser, verifyAdmin } = require("../utils/verify");

const router = require("express").Router();

//update
router.put("/:id", verifyUser, async (req, res, next)=>{
    try{
        const updateUser = await User.findByIdAndUpdate(req.params.id,{
            $set: req.body,
        },
    {new: true})
    res.status(200).json(updateUser);
    }catch(err){
       next(err);
    }
})

//delete
router.delete("/:id", verifyUser, async (req, res, next)=>{
    try{
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted!")
    }catch(err){
        next(err);
    }
})

//get user
router.get("/find/:id", verifyAdmin, async (req, res, next)=>{
    try{
        const user = await User.findById(req.params.id);
        res.status(200).json(user)
    }catch(err){
        next(err)
    }
})

//get all user 
router.get("/users", verifyAdmin, async (req, res, next)=>{
    try{
        const users = await User.find();
        res.status(200).json(users);
    }catch(err){
        next(err)
    }
})

module.exports = router;