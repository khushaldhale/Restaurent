const cloudinary = require("cloudinary").v2;
require("dotenv").config()


const cloudinaryConnect = () => {
	cloudinary.config({
		cloud_name: process.env.CLOUD_NAME,
		api_key: process.env.API_KEY,
		api_secret: process.env.API_SECRET
	})


	// to check whether we are connected to cloudinary or not
	cloudinary.api.ping()
		.then((data) => {
			console.log("cloudinary connected succesfully : ", data)
		})
		.catch((error) => {
			console.log("error occured while connecting to cloudinary : ", error)
		})
}

module.exports = cloudinaryConnect;