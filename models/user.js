const mongoose = require("mongoose");



const userSchema = new mongoose.Schema(
	{
		fname: {
			type: String,
			required: true,
			trim: true  // string will be trimmmed
		},
		lname: {
			type: String,
			required: true,
			trim: true
		},
		email: {
			type: String,
			required: true,
			trim: true
		},
		password: {
			type: String,
			required: true,
			trim: true
		},
		accountType: {
			type: String,
			required: true,
			enum: ["user", "waiter", "cook", "admin"],
		},
		categories: {
			type: [
				{
					type: mongoose.Schema.Types.ObjectId,
					ref: "CATEGORY"
				}
			]
		}
	}, {
	timestamps: true
}
)

module.exports = mongoose.model("USER", userSchema)