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
router.get("/", verifyAdmin, async (req, res, next)=>{
    try{
        const users = await User.find();
        res.status(200).json(users);
    }catch(err){
        next(err)
    }
})

//Thống kê doanh thu tháng
router.get("/stats", verifyAdmin, async (req, res, next)=>{
    const date = new Date()
    const lastYear = new Date(date.setFullYear(date.getFullYear()-1));

    try{
        const data = await User.aggregate([
            {$match: {createdAt: {$gte: lastYear}}},
            {
                $project: {
                    month: {$month: "$createdAt"}
                },
            },
            {
                $group: {
                    _id: "$month",
                    total: {$sum: 1}
                }
            }
        ])
        res.status(200).json(data)
    }catch(err){
        next(err)
    }
})

module.exports = router;