const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const DrivingAnimateSchema = new Schema({
    title: {
        type: String,
        required: false,
        default: ""
    },
    image_url: {
        type: String,
        required: false,
        default: ""

    },
    image_id: {
        type: String,
        required: false,
        default: ""
    }
}, { timestamps: true, toJSON: true }
);
DrivingAnimateSchema.set("toObject", { virtuals: true });
DrivingAnimateSchema.set("toJSON", { virtuals: true });

const DrivingAnimate = mongoose.model("DrivingAnimate", DrivingAnimateSchema, "DrivingAnimate");
module.exports = DrivingAnimate;