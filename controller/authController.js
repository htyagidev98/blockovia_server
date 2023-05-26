const User = require("../models/user")
jwt = require("jsonwebtoken"),
    Validator = require("validatorjs"),
    uuidv1 = require("uuid").v1,
    bcrypt = require("bcryptjs"),
    config = require("../config"),
    moment = require("moment-timezone"),
    _ = require("lodash");
exports.signup = async (req, res) => {
    try {
        const rules = { email: "required", password: "required" };
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        var validation = new Validator(req.body, rules);
        if (validation.fails()) {
            return res.status(422).json({ responseMessage: "Validation Error", responseData: validation.errors.all(), });
        } else {
            const { email, password } = req.body;
            if (regex.test(req.body.email)) {
                if (req.body.password.length >= 8) {
                    let checkEmail = await User.findOne({ email: email }).lean();
                    if (!checkEmail) {
                        bcrypt.hash(password, 10, async (err, hashPassword) => {
                            if (err) {
                                return res.status(422).json({ responseMessage: "Error Occured", responseData: {}, });
                            }
                            await User.create({
                                email: email, password: hashPassword, account_info: { status: "Active" }
                            });
                            return res.status(200).json({ responseMessage: "Registered Successfully", responseData: {}, });
                        })
                    } else {
                        return res.status(403).json({ responseMessage: "Email Already in Used", responseData: {}, })
                    }
                } else {
                    return res.status(422).json({ responseMessage: "Password should be min 8 length" })
                }

            } else {
                return res.status(422).json({ responseMessage: "Invalid email address ", responseData: {}, });
            }
        }
    } catch (err) {
        return res.status(500).json({ responseMessage: "Internal Server Error", responseData: {}, })
    }
};

exports.login = async (req, res) => {
    try {
    const rules = { email: "required", password: "required" };
    var validation = new Validator(req.body, rules);
    if (validation.fails()) {
        return res.status(422).json({ responseMessage: "Validation Error", responseData: validation.errors.all(), });
    } else {
        const { email, password } = req.body;
        let user = await User.findOne({ email: email }).lean();

        if (user) {
            if (user.account_info.status == "Active") {
                if (!bcrypt.compareSync(password, user.password)) {
                    return res.status(400).json({ responseMessage: "Authentication failed. Wrong password", responseData: {}, });
                } else {
                    const payload = { user: user._id, };
                    let token = jwt.sign(payload, config.secret,);
                    let uuid = uuidv1();

                    let deviceInfo = [];
                    deviceInfo = _.filter(user.device, (device) => device.uuid != uuid);
                    deviceInfo.push({
                        uuid: uuid,
                        token: token,
                    });

                    let userData = await User.findByIdAndUpdate({ _id: user._id, }, { $set: { device: deviceInfo } }, { new: false });
                    if (!userData) {
                        return res.status(422).json({ responseMessage: "Something wrong when updating data", responseData: {}, });
                    } else {
                        return res.status(200).json({
                            responseMessage: "LoggedIn Successfully", responseData: {},
                        });
                    }
                }
            } else {
                return res.status(400).json({ responseMessage: "Account is not Active!", responseData: {}, });
            }
        } else {
            return res.status(404).json({ responseMessage: "User not found", responseData: {}, });
        }

    };
    } catch (err) {
        return res.status(500).json({ responseMessage: "Internal Server Error", responseData: {}, });
    }
};
