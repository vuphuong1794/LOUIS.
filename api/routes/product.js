const Product = require("../models/Product");
const { verifyUser, verifyAdmin, verifyToken } = require("../utils/verify");

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
router.get("/",async (req, res, next)=>{
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

// Thêm đánh giá mới cho sản phẩm
router.post("/:id/reviews" ,async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        
        const newReview = {
            userName: req.body.userName || "Anonymous",
            rating: req.body.rating,
            comment: req.body.comment
        };
        
        product.reviews.push(newReview);
        await product.save();
        
        res.status(200).json(product);
    } catch (err) {
        next(err);
    }
});

// Lấy tất cả đánh giá của một sản phẩm
router.get("/:id/reviews", async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id).populate('reviews');
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        
        res.status(200).json(product.reviews);
    } catch (err) {
        next(err);
    }
});

module.exports = router;