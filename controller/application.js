const Application = require('../models/application')
bodyParser = require("body-parser")
Validator = require("validatorjs")



exports.applicationAdd = async (req, res) => {
    try {
        const rules = { title: "required", paragraph: "required", button: "required" };
        var validation = new Validator(req.body, rules);
        if (validation.fails()) {
            return res.status(422).json({ responseMessage: "Validation Error", responseData: validation.errors.all(), });
        } else {
            const { title, paragraph, button, } = req.body;
            let applicationData = await Application.findOne({ title: title }).lean();
            if (!applicationData) {

                let data = await Application.create({
                    title: title,
                    paragraph: paragraph,
                    button: button,

                });
                return res.status(200).json({ responseMessage: "Successfully", responseData: { data }, });
            } else {
                return res.status(403).json({ responseMessage: "title Exist", responseData: {} })
            }
        }
    } catch (err) {
        return res.status(500).json({ responseMessage: " Internal Sever Error", responseData: {} })

    }
}

exports.applicationGet = async (req, res) => {
    try {
        const contentlist = await Application.findOne().sort({ createdAt: -1 });
        if (contentlist) {
            const contentObj = {
                _id: contentlist._id,
                title: contentlist.title,
                paragraph: contentlist.paragraph,
                button: contentlist.button,
            };
            return res.status(200).json({ responseMessage: "Successfully", responseData:  contentObj  });
        } else {
            return res.status(404).json({ responseMessage: "No Data found", responseData: {} })
        };
    } catch (err) {
        return res.status(500).json({ responseMessage: " Internal Sever Error", responseData: {} })
    }
};

exports.applicationUpdate = async (req, res,) => {
    try {
        const rules = { title: "required", paragraph: "required", button: "required" };
        const validation = new Validator(req.body, rules);
        if (validation.fails()) {
            return res.status(422).json({
                responseMessage: "Validation Error", responseData: validation.errors.all(),
            });
        } else {
            const { title, paragraph, button } = req.body;
            const { _id } = req.query;
            let applicationData = await Application.findById(_id).lean();
            if (applicationData) {
                let updatedData = {
                    title: title,
                    paragraph: paragraph,
                    button: button
                }
                const data = await Application.findByIdAndUpdate({ _id: _id }, updatedData, { new: true });
                return res.status(200).json({ responseMessage: "Successfully Updated", responseData: data });
            } else {
                return res.status(404).json({ esponseMessage: "feature not found", responseData: {}, });
            };
        }
    } catch (err) {
        return res.status(500).json({ responseMessage: "Internal Server Error", responseData: {}, });
    }
};