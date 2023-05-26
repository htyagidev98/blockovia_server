const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const CommunitySchema = new Schema({
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
CommunitySchema.set("toObject", { virtuals: true });
CommunitySchema.set("toJSON", { virtuals: true });

const Community = mongoose.model("Community", CommunitySchema, "Community");
module.exports = Community;