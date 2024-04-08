import multer from "multer"
import path from "path"
import { v2 as cloudinary } from 'cloudinary';


cloudinary.config({
    cloud_name: 'dhg3ntmsc',
    api_key: '273456946722689',
    api_secret: 'bIOQ0p8Xp87KTC3ARlxw2M71RLw'
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(process.cwd(), 'uploads'))
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage: storage });





const uploadToCloudinary = async (file: any) => {
    cloudinary.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
    { public_id: "olympic_flag" },
    function (error, result) { console.log(result); });
}



export const fileUploader = {
    upload,
    uploadToCloudinary,
}