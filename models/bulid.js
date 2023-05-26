const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BulidSchema = new Schema({

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

}, { timestamps: true, toJSON: true }
);

BulidSchema.set("toObject", { virtuals: true });
BulidSchema.set("toJSON", { virtuals: true });

const Bulid = mongoose.model("Bulid", BulidSchema, "Bulid");
module.exports = Bulid;