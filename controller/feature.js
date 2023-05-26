const Feature = require("../models/feature")
bodyParser = require("body-parser")
Validator = require("validatorjs")

const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'dp6aceayp',
    api_key: '925825434622849',
    api_secret: 'uTuU6iIGtleSOIbtZDO_x5hPErc'
});

exports.featureContentAdd = async (req, res, images) => {
    try {
        const rules = { title: "required" };
        var validation = new Validator(req.body, rules)
        if (validation.fails()) {
            return res.status(422).json({ responseMessage: "Validation Error", responseData: validation.errors.all(), });
        } else {
            const { title } = req.body;
            const featureData = await Feature.findOne({ title: title }).lean();
            if (!featureData) {
                let logoData = [];
                let result = await cloudinary.uploader.upload(req.file.path, {
                    images,
                    overwrite: true,
                    faces: false,
                });
                logoData.push({
                    image_url: result.secure_url,
                    image_id: result.public_id,
                    image_name: result.original_filename
                });
                let data = await Feature.create({
                    title: title,
                    logoData: logoData
                });
                return res.status(200).json({ responseMessage: "Successfully", responseData: { data }, });
            } else {
                return res.status(403).json({ responseMessage: "Data  Exist", responseData: {} });
            }
        }
    } catch (err) {
        return res.status(500).json({ responseMessage: " Internal Sever Error", responseData: {} })
    }
}

exports.featureContentGet = async (req, res) => {
    try {
        const contentlist = await Feature.findOne().sort({ createdAt: -1 });
        console.log("data", contentlist.logoData)
        if (contentlist) {
            let image_data = contentlist.logoData;
            if (image_data.length > 0) {
                let ImagesData = []
                image_data.forEach(image => {
                    const imageObj = {
                        image_id: image.image_id,
                        image_name: image.image_name,
                        image_url: image.image_url
                    }
                    ImagesData.push(imageObj);
                });
                const contentObj = {
                    _id: contentlist._id,
                    title: contentlist.title,
                    ImagesData: ImagesData
                };
                return res.status(200).json({ responseMessage: "Successfully", responseData: contentObj });
            }

        } else {
            return res.status(404).json({ responseMessage: "No Data found", responseData: {} })
        };
    } catch (err) {
        return res.status(500).json({ responseMessage: " Internal Sever Error", responseData: {} })
    }
};


exports.featureContentUpdate = async (req, res, images) => {
    try {
        const { title } = req.body;
        let logoData = [];
        let result = await cloudinary.uploader.upload(req.file.path, {
            images,
            overwrite: true,
            faces: false,
        });
        logoData.push({
            image_url: result.secure_url,
            image_id: result.public_id,
            image_name:result.original_filename
        });

        let data = await Feature.findOneAndUpdate(
            { title: title },
            { $push: { logoData: logoData } },
            { new: true, upsert: true }
        );

        return res.status(200).json({ responseMessage: "Successfully", responseData: { data }, });
    } catch (err) {
        return res.status(500).json({ responseMessage: "Internal Server Error", responseData: {}, });
    }
};

