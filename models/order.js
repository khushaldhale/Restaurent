const mongoose = require("mongoose");



const orderSchema = new mongoose.Schema({
	user_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "USER",
		required: true
	},
	bucket_list: {
		type: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "BUCKET"
			}
		]
	},
	total_amount: {
		type: Number,
		required: true,
		min: [50, "Minimum amount is 50"]
	},
	order_status: {
		type: String,
		default: "pending",
		enum: ["pending", "accepted", "in-progress", "delivered"]
	}
})

module.exports = mongoose.model("ORDER", orderSchema)