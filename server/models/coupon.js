import mongoose from "mongoose";

const couponSchema = mongoose.Schema({
    CouponName: {
        type: String,
        required: true
    },
    CouponValue: {
        type: Number,
        required: true
    }
});



const CouponSchema = mongoose.model('CouponSchema', couponSchema);

export default CouponSchema;