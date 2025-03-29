const cloudinary = require("cloudinary").v2;


const fileUpload = async (file, folder) => {

	try {

		const options = {
			folder,
			resource_type: "auto"
		}

		const response = await cloudinary.uploader.upload(file.tempFilePath, options)

		return response.secure_url;
	}
	catch (error) {
		console.log("error occued in file upload to cloudinary : ", error)
	}

}

module.exports = fileUpload