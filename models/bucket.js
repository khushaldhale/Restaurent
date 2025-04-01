const mongoose = require("mongoose");

const bucketSchema = new mongoose.Schema(
	{
		menu_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "MENU",
			required: true
		},
		quantity: {
			type: Number,
			required: true,
			min: [1, "Minimum quantity should be 1 "]
		},
		user_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "USER"
		}
	}
)

module.exports = mongoose.model("BUCKET", bucketSchema)