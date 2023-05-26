const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const AnimatedCardSchema = new Schema({
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
AnimatedCardSchema.set("toObject", { virtuals: true });
AnimatedCardSchema.set("toJSON", { virtuals: true });

const AnimatedCard = mongoose.model("AnimatedCard", AnimatedCardSchema, "AnimatedCard");
module.exports = AnimatedCard;