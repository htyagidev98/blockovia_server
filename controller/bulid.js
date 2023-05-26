const Bulid = require("../models/bulid");
bodyParser = require("body-parser")
Validator = require("validatorjs")

exports.bulidScaleAdd = async (req, res,) => {
    try {
        const rules = { title: "required", paragraph: "required", button: "required" };
        var validation = new Validator(req.body, rules);
        if (validation.fails()) {
            return res.status(422).json({ responseMessage: "Validation Error", responseData: validation.errors.all(), });
        } else {
            const { title, paragraph, button, } = req.body;
            let bulidData = await Bulid.findOne({ title: title }).lean();
            if (!bulidData) {
                let data = await Bulid.create({
                    title: title,
                    paragraph: paragraph,
                    button: button,
                });
                return res.status(200).json({ responseMessage: "Successfully", responseData: { data } });
            } else {
                return res.status(403).json({ responseMessage: "title Exist", responseData: {} })
            }
        }
    } catch (err) {
        return res.status(500).json({ responseMessage: " Internal Sever Error", responseData: {} })

    }
}


exports.bulidScaleGet = async (req, res) => {
    try {
        const contentlist = await Bulid.find().sort({ createdAt: -1 });
        if (contentlist && contentlist.length > 0) {
            const responseData = [];
            contentlist.forEach(content => {
                const contentObj = {
                    _id: content._id,
                    title: content.title,
                    paragraph: content.paragraph,
                    button: content.button,
                };
                responseData.push(contentObj);
            });
            return res.status(200).json({ responseMessage: "Successfully", responseData });
        } else {
            return res.status(404).json({ responseMessage: "No Data found", responseData: {} });
        }
    } catch (err) {
        return res.status(500).json({ responseMessage: "Internal Server Error", responseData: {} });
    }
};


exports.bulidScaleGetById = async (req, res) => {
    try {
        const { _id } = req.query;
        const contentlist = await Bulid.findById(_id);
        if (contentlist) {
            return res.status(200).json({ responseMessage: "Successfully", contentlist });
        } else {
            return res.status(404).json({ responseMessage: "No Data found", responseData: {} });
        }
    } catch (err) {
        return res.status(500).json({ responseMessage: "Internal Server Error", responseData: {} });
    }
};

exports.bulidScaleUpdate = async (req, res,) => {
    try {
        const rules = { title: "required", paragraph: "required", button: "required" };
        const validation = new Validator(req.body, rules);
        if (validation.fails()) {
            return res.status(422).json({responseMessage: "Validation Error", responseData: validation.errors.all(),
            });
        } else {
            const { title, paragraph, button } = req.body;
            const { _id } = req.query;
            const bulidData = await Bulid.findById(_id).lean();
            if (bulidData) {
                const updatedData = {
                    title: title,
                    paragraph: paragraph,
                    button: button
                }
                const data = await Bulid.findByIdAndUpdate({ _id: _id }, updatedData, { new: true });
                return res.status(200).json({ responseMessage: "Successfully Updated", responseData: data });
            } else {
                return res.status(404).json({ esponseMessage: "feature not found", responseData: {}, });
            };
        }
    } catch (err) {
        return res.status(500).json({ responseMessage: "Internal Server Error", responseData: {}, });
    }
};

