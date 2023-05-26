const Calculation = require("../models/calculation");
bodyParser = require("body-parser")
Validator = require("validatorjs")

exports.calculationAdd = async (req, res,) => {
    try {
        const rules = { title: "required", paragraph: "required", };
        var validation = new Validator(req.body, rules);
        if (validation.fails()) {
            return res.status(422).json({ responseMessage: "Validation Error", responseData: validation.errors.all(), });
        } else {
            const { title, paragraph, } = req.body;
            let CalculationData = await Calculation.findOne({ title: title }).lean();
            if (!CalculationData) {
                let data = await Calculation.create({
                    title: title,
                    paragraph: paragraph,
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

exports.calculationGet = async (req, res) => {
    try {
        const contentlist = await Calculation.find().sort({ createdAt: -1 });
        if (contentlist && contentlist.length > 0) {
            const responseData = [];
            contentlist.forEach(content => {
                const contentObj = {
                    _id: content._id,
                    title: content.title,
                    paragraph: content.paragraph,

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


exports.calculationGetById = async (req, res) => {
    try {
        const { _id } = req.query;
        const contentlist = await Calculation.findById(_id);
        if (contentlist) {
            return res.status(200).json({ responseMessage: "Successfully", contentlist });
        } else {
            return res.status(404).json({ responseMessage: "No Data found", responseData: {} });
        }
    } catch (err) {
        return res.status(500).json({ responseMessage: "Internal Server Error", responseData: {} });
    }
};

exports.calculationContentUpdate = async (req, res, images) => {
    try {
        const { title, paragraph } = req.body;
        const { _id } = req.query;
        const calculationData = await Calculation.findById(_id).lean();
        if (calculationData) {
            let updatedData = {
                title: title,
                paragraph: paragraph
            }
            let data = await Calculation.findByIdAndUpdate({ _id: _id }, updatedData, { new: false, });
            return res.status(200).json({ responseMessage: "Successfully", responseData: { data }, });
        } else {
            return res.status(404).json({ esponseMessage: "Data not found", responseData: {}, });
        };
    } catch (err) {
        return res.status(500).json({ responseMessage: "Internal Server Error", responseData: {}, });
    }
};

