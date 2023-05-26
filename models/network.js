const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const NetworkSchema = new Schema({
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
NetworkSchema.set("toObject", { virtuals: true });
NetworkSchema.set("toJSON", { virtuals: true });

const Network = mongoose.model("Network", NetworkSchema, "Network");
module.exports = Network;