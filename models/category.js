const mongoose = require("mongoose");


const categorySchema = new mongoose.Schema({
	category_name: {
		type: String,
		required: true,
		trim: true
	},
	category_desc: {
		type: String,
		required: true,
		trim: true
	},
	menus: {
		type: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "MENU"
			}
		]
	}
})


module.exports = mongoose.model("CATEGORY", categorySchema)