const mongoose = require("mongoose");
const Schema = mongoose.Schema
// const validator = require('validator');


var DeviceInfoSchema = new Schema({

    uuid: {
        type: String,
    },
    token:
    {
        type: String,
    }
});

const AccountInfoSchema = new Schema({
    status: {
        type: String,
        enum: [
            "Active",
            "Deactivate",
            "Deleted",
        ],
        default: "Active",
    },
});

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        defalut: "",
    },
    password: {
        type: String,
        required: true,
        defalut: "",
    },
    account_info: AccountInfoSchema,
    device: [DeviceInfoSchema],
},
    { timestamps: true, toJSON: true },
);

UserSchema.set("toObject", { Virtual: true });
UserSchema.set("toJSON", { Virtual: true });

const User = mongoose.model("User", UserSchema, "User");
module.exports = User;



