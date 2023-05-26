const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const ApplicationSchema = new Schema({
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
ApplicationSchema.set("toObject", { virtuals: true });
ApplicationSchema.set("toJSON", { virtuals: true });

const Application = mongoose.model("Application", ApplicationSchema, "Application");
module.exports = Application;