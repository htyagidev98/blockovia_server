const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const AnimatedSchema = new Schema({
    title: {
        type: String,
        required: false,
        default: ""
    },
    paragraph: {
        type: String,
        required: false,
        default: ""
    },
    button: {
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
AnimatedSchema.set("toObject", { virtuals: true });
AnimatedSchema.set("toJSON", { virtuals: true });

const Animated = mongoose.model("Animated", AnimatedSchema, "Animated");
module.exports = Animated;