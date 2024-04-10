const Product = require("../models/Product");
const { verifyUser, verifyAdmin } = require("../utils/verify");

const router = require("express").Router();

//create 
router.post("/", verifyAdmin, async (req, res, next)=>{
    const newProduct = new Product(req.body) 
    try{
        const saved = await newProduct.save();
        res.status(200).json(saved)
    }catch(err){
        next(err)
    }
})

//update
router.put("/:id", verifyAdmin, async (req, res, next)=>{
    try{
        const updateProduct = await Product.findByIdAndUpdate(req.params.id,{
            $set: req.body,
        },
    {new: true})
    res.status(200).json(updateProduct);
    }catch(err){
       next(err);
    }
})

//delete
router.delete("/:id", verifyAdmin, async (req, res, next)=>{
    try{
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json("Product has been deleted!")
    }catch(err){
        next(err);
    }
})

//get product
router.get("/find/:id", async (req, res, next)=>{
    try{
        const product = await Product.findById(req.params.id);
        res.status(200).json(product)
    }catch(err){
        next(err)
    }
})

//get all product 
router.get("/", async (req, res, next)=>{
    const qNew = req.query.new;
    const qCategory= req.query.category;
    try{
        let products;
        if(qNew){
            products = await Product.find().sort({createdAt: -1}).limit(1);
        }
        else if(qCategory){
            products = await Product.find({
                categories: {
                    $in: [qCategory],
                }
            })
        }
        else{
            products = await Product.find();
        }
        res.status(200).json(products);
    }catch(err){
        next(err)
    }
})


module.exports = router;