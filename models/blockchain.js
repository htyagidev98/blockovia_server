const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const BlockchainSchema = new Schema({
   
    title: {
        type: String,
        required: false,
        default: ""
    },
    button: {
        type: String,
        required: false,
        default: ""

    },
    image_name: {
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
BlockchainSchema.set("toObject", { virtuals: true });
BlockchainSchema.set("toJSON", { virtuals: true });

const Blockchain = mongoose.model("Blockchain", BlockchainSchema, "Blockchain");
module.exports = Blockchain;