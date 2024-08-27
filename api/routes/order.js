const Order = require("../models/Order");
const { verifyUser, verifyAdmin, verifyToken } = require("../utils/verify");

const router = require("express").Router();

//create 
router.post("/", async (req, res, next)=>{
    const newOrder = new Order(req.body) 
    try{
        const saved = await newOrder.save();
        res.status(200).json(saved)
    }catch(err){
        next(err)
    }
})

//update
router.put("/:id", verifyAdmin, async (req, res, next)=>{
    try{
        const updateOrder = await Order.findByIdAndUpdate(req.params.id,{
            $set: req.body,
        },
    {new: true})
    res.status(200).json(updateOrder);
    }catch(err){
       next(err);
    }
})

//delete
router.delete("/:id", async (req, res, next)=>{
    try{
        await Order.findByIdAndDelete(req.params.id);
        res.status(200).json("Order has been deleted!")
    }catch(err){
        next(err);
    }
})

//get user order
router.get("/find/:userId",async (req, res, next)=>{
    try{
        const order = await Order.find({userId: req.params.userId}).sort({ createdAt: -1 });
        res.status(200).json(order)
    }catch(err){
        next(err)
    }
})

//get all order 
router.get("/", verifyAdmin,async (req, res, next)=>{
    try{
        const orders= await Order.find() 
        res.status(200).json(orders);
    }catch(err){
        next(err)
    }
})

router.get("/income", verifyAdmin, async (req, res, next) => {
    const productId = req.query.pid;
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
  
    try {
      const income = await Order.aggregate([
        {
          $match: {
            createdAt: { $gte: previousMonth },
            ...(productId && {
              products: { $elemMatch: { productId } },
            }),
          },
        },
        {
          $project: {
            month: { $month: "$createdAt" },
            sales: "$amount",
          },
        },
        {
          $group: {
            _id: "$month",
            total: { $sum: "$sales" },
          },
        },
      ]);
      res.status(200).json(income);
    } catch (err) {
        next(err);
    }
  });

module.exports = router;