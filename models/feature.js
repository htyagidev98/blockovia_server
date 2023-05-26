const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
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
});

const FeatureSchema = new Schema({
    title: {
        type: String,
        required: false,
        default: ""
    },
    logoData: [ImageSchema],
}, { timestamps: true, toJSON: true });

FeatureSchema.set("toObject", { virtuals: true });
FeatureSchema.set("toJSON", { virtuals: true });

const Feature = mongoose.model("Feature", FeatureSchema, "feature");
module.exports = Feature;


