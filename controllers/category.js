const categoryModel = require("../models/category");
const userModel = require("../models/user")



exports.createCategory = async (req, res, next) => {
	try {

		const { category_name, category_desc } = req.body;
		const user_id = req.decode._id;

		if (!category_name || !category_desc) {
			return res.status(400)
				.json({
					success: false,
					message: "kindly provide all details "
				})
		}

		const is_existing = await categoryModel.findOne({ category_name });

		if (is_existing) {
			return res.status(400)
				.json({
					success: false,
					message: "category already exists, kindly create  a new "
				})
		}

		const category = await categoryModel.create({ category_name, category_desc });

		const user = await userModel.findByIdAndUpdate(user_id, { $push: { categories: category._id } }, { new: true })

		return res.status(200)
			.json({
				success: true,
				message: 'category is created',
				data: category
			})
	}
	catch (error) {
		console.log(error)
		return res.status(500)
			.json({
				success: false,
				message: "Internal error occured "
			})
	}
}

exports.deleteCategory = async (req, res) => {
	try {

		const category_id = req.params.id;
		const user_id = req.decode._id;

		if (!category_id) {
			return res.status(400)
				.json({
					success: false,
					message: "kindly provide an category id"
				})
		}

		const deletedCategory = await categoryModel.findByIdAndDelete(category_id);

		if (!deletedCategory) {
			return res.status(400)
				.json({
					success: false,
					message: "category that are you trying to delete does not exists",
					data: null
				})

		}

		const user = await userModel.findByIdAndUpdate(user_id, { $pull: { categories: deletedCategory._id } }, { new: true })

		return res.status(200)
			.json({
				success: true,
				message: "category is deleted successfully",
				data: deletedCategory
			})
	}
	catch (error) {
		console.log(error)
		return res.status(500)
			.json({
				success: false,
				message: "Internal error occured "
			})
	}
}


exports.updateCategory = async (req, res) => {
	try {

		const category_id = req.params.id;
		const { category_name, category_desc } = req.body;

		const updatedCategory = await categoryModel.findByIdAndUpdate(category_id, { category_name, category_desc }, { new: true });

		if (updatedCategory) {
			return res.status(200)
				.json({
					success: true,
					message: "category is updated successfuly ",
					data: updatedCategory
				})
		} else {

			return res.status(400)
				.json({
					success: false,
					message: "category that are you trying to update does not exists  ",
					data: null
				})

		}
	}
	catch (error) {
		console.log(error)
		return res.status(500)
			.json({
				success: false,
				message: "Internal error occured "
			})

	}
}


exports.getAllCategories = async (req, res) => {
	try {

		const categories = await categoryModel.find({});

		return res.status(200)
			.json({
				success: true,
				message: categories.length > 0 ? "all categories are fctched succesfully" : "No category is created yet ",
				data: categories
			})
	}
	catch (error) {
		console.log(error)
		return res.status(500)
			.json({
				success: false,
				message: "Internal error occured "
			})
	}
}