const mongoose = require("mongoose");


const otpSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		trim: true
	},
	otp: {
		type: Number,
		required: true
	},
	expiresAt: {
		type: Date,
		// OTP valid for 5 min 
		default: new Date(Date.now() + 1000 * 60 * 5),
		expires: 300 // document deleted after 5 min 
	}
})

module.exports = mongoose.model("OTP", otpSchema)