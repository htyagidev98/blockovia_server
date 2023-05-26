const Home = require('../models/home')
bodyParser = require("body-parser")
Validator = require("validatorjs")
// const path = require('path');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'dp6aceayp',
    api_key: '925825434622849',
    api_secret: 'uTuU6iIGtleSOIbtZDO_x5hPErc'
});

exports.heroContentAdd = async (req, res, images) => {
    try {
        const rules = { title: "required", paragraph: "required", button: "required" };
        var validation = new Validator(req.body, rules);
        if (validation.fails()) {
            return res.status(422).json({ responseMessage: "Validation Error", responseData: validation.errors.all(), });
        } else {
            const { title, paragraph, button, } = req.body;
            let homeData = await Home.findOne({ title: title }).lean();
            if (!homeData) {
                let result = await cloudinary.uploader.upload(req.file.path, {
                    images,
                    overwrite: true,
                    faces: false,
                });
                let img_id = result.public_id
                let data = await Home.create({
                    title: title,
                    paragraph: paragraph,
                    button: button,
                    image_name: result.original_filename,
                    image_url: result.secure_url,
                    image_id: img_id
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

exports.heroContentGet = async (req, res) => {
    try {
        const contentlist = await Home.findOne().sort({ createdAt: -1 });
        if (contentlist) {
            const contentObj = {
                _id: contentlist._id,
                title: contentlist.title,
                paragraph: contentlist.paragraph,
                button: contentlist.button,
                image_name: contentlist.image_name,
                image_url: contentlist.image_url,
                image_id: contentlist.image_id
            };
            return res.status(200).json({ responseMessage: "Successfully", responseData: contentObj });
        } else {
            return res.status(404).json({ responseMessage: "No Data found", responseData: {} })
        };
    } catch (err) {
        return res.status(500).json({ responseMessage: " Internal Sever Error", responseData: {} })
    }
};

exports.heroContentUpdate = async (req, res, images) => {
    try {
        const rules = { title: "required", paragraph: "required", button: "required" };
        const validation = new Validator(req.body, rules);

        if (validation.fails()) {
            return res.status(422).json({responseMessage: "Validation Error", responseData: validation.errors.all(),
            });
        } else {
            const { title, paragraph, button } = req.body;
            const { _id } = req.query;
            let homeData = await Home.findById(_id).lean();
            if (!homeData) {
                return res.status(404).json({ responseMessage: "Data not found", responseData: {} });
            } else {
                const result = await cloudinary.uploader.upload(req.file.path, {
                    images,
                    overwrite: true,
                    faces: false,
                });

                const updatedData = {
                    title: title,
                    paragraph: paragraph,
                    button: button,
                    image_name: result.original_filename,
                    image_url: result.secure_url,
                    image_id: result.public_id

                };
                const data = await Home.findByIdAndUpdate({ _id: _id }, updatedData, { new: true });

                return res.status(200).json({ responseMessage: "Successfully updated", responseData: data });
            }

        }
    } catch (err) {
        return res.status(500).json({ responseMessage: "Internal Server Error", responseData: {} });
    }
};


// exports.contentUpdate = async (req, res) => {
//     try {
//         const rules = { title: "required", content: "required", button: "required" }
//         const validation = new Validator(req.body, rules);
//         if (validation.fails()) {
//             return res.status(422).json({ responseMessage: "Validaton Error", responseData: validation.errors.all(), })
//         } else {
//             const { title, content, button } = req.body;
//             let home = await Home.findOne({ title: title });
//             if (home) {
//                 let data = { title: title, content: content, button: button };
//                 let updateData = await Home.findOneAndUpdate({ _id: home._id }, { $set: data }, { new: true });
//                 // console.log("========", updateData)
//                 if (updateData) {
//                     return res.status(200).json({
//                         responseMessage: "Content Updated Successfully",
//                         responseData: { updateData },
//                     })
//                 } else {
//                     return res.status(422).json({ responseMessage: "Not Update", responseData: {} })
//                 }
//             } else {
//                 return res.status(422).json({ responseMessage: "Not Data found", responseData: {} })

//             }

//         };
//     } catch (err) {
//         return res.status(500).json({ responseMessage: " Internal Sever Error", responseData: {} })
//     }

// };
