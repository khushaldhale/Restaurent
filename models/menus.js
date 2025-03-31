const mongoose = require("mongoose");


const menuSchema = new mongoose.Schema({

	menu_name: {
		type: String,
		require: true,
		trim: true,
		lowercase: true
	},
	menu_desc: {
		type: String,
		require: true,
		trim: true,
		lowercase: true
	},
	amount: {
		type: Number,
		require: true,
		min: [50, "Minimum value should be 50RS"]
	},
	serve: {
		type: Number,
		required: true,
		min: [1, "Minimum value should be 1"],
		enum: [1, 2, 3, 4]

	},
	category_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "CATEGORY"
	}
})


module.exports = mongoose.model("MENU", menuSchema)
