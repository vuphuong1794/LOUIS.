const mongoose = require("mongoose")


const ReviewSchema = new mongoose.Schema({
    userName: {type: String},
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
}, { timestamps: true });

const ProductSchema = mongoose.Schema({
    title: {type: String, required: true,  unique: true },
    desc: {type: String, required: true},
    img:{type:String, required: true},
    categories: {type: Array},
    size: {type: Array},
    sex: {type: String},
    color: {type: Array},
    price: {type: Number, required: true},
    inStock:{type: Boolean, default: true },
    reviews: [ReviewSchema],
    avgRating: { type: Number, default: 0 },
},
{timestamps: true}
)

// Tính toán rating trung bình trước khi lưu
ProductSchema.pre('save', function(next) {
    if (this.reviews.length > 0) {
        this.avgRating = this.reviews.reduce((acc, review) => acc + review.rating, 0) / this.reviews.length;
    }
    next();
});

module.exports = mongoose.model("Product", ProductSchema)