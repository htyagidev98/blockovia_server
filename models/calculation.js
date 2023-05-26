const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CalculationSchema = new Schema({

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
}, { timestamps: true, toJSON: true }
);

CalculationSchema.set("toObject", { virtuals: true });
CalculationSchema.set("toJSON", { virtuals: true });

const Calculation = mongoose.model("Calculation", CalculationSchema, "Calculation");
module.exports = Calculation;