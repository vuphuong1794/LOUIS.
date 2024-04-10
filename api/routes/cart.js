const Cart = require("../models/Cart");
const { verifyUser, verifyAdmin, verifyToken } = require("../utils/verify");

const router = require("express").Router();

//create 
router.post("/", verifyToken, async (req, res, next)=>{
    const newCart = new Cart(req.body) 
    try{
        const saved = await newCart.save();
        res.status(200).json(saved)
    }catch(err){
        next(err)
    }
})

//update
router.put("/:id", verifyUser, async (req, res, next)=>{
    try{
        const updateCart = await Cart.findByIdAndUpdate(req.params.id,{
            $set: req.body,
        },
    {new: true})
    res.status(200).json(updateCart);
    }catch(err){
       next(err);
    }
})

//delete
router.delete("/:id", verifyUser, async (req, res, next)=>{
    try{
        await Cart.findByIdAndDelete(req.params.id);
        res.status(200).json("Cart has been deleted!")
    }catch(err){
        next(err);
    }
})

//get user cart
router.get("/find/:userId", verifyUser,async (req, res, next)=>{
    try{
        const cart = await Cart.findById(req.params.id);
        res.status(200).json(cart)
    }catch(err){
        next(err)
    }
})

//get all cart 
router.get("/", verifyAdmin,async (req, res, next)=>{
    try{
        const carts= await Cart.find() 
        res.status(200).json(carts);
    }catch(err){
        next(err)
    }
})


module.exports = router;