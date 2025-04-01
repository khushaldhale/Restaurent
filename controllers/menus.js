const menuModel = require("../models/menus");
const categoryModel = require("../models/category");


exports.createMenu = async (req, res) => {
	try {

		const { menu_name, menu_desc, amount, serve } = req.body;
		const category_id = req.params.id;

		if (!category_id) {
			return res.status(400)
				.json({
					success: false,
					message: "kindly provide cat id "
				})
		}


		if (!menu_name || !menu_desc || !amount || !serve) {
			return res.status(400)
				.json({
					success: false,
					message: "kindly provide all details "
				})
		}


		const is_existing_menu = await menuModel.findOne({ menu_name });

		if (is_existing_menu) {
			return res.status(400)
				.json({
					success: false,
					message: "menu already exists , kindly create a new  "
				})
		}


		const menu = await menuModel.create({ menu_name, menu_desc, amount, serve, category_id })

		const categoryUpdate = await categoryModel.findByIdAndUpdate(category_id, { $push: { menus: menu._id } }, { new: true })

		return res.status(200)
			.json(
				{
					success: true,
					message: "menu is created succesfully",
					data: menu
				}
			)
	}
	catch (error) {
		console.log(error);
		return res.status(500)
			.json({
				success: false,
				message: "Internal error occured "
			})
	}
}



exports.deleteMenu = async (req, res) => {
	try {

		const menu_id = req.params.menuid;


		if (!menu_id) {
			return res.status(400)
				.json({
					success: false,
					message: "kindly  provide  and ID "
				})
		}

		const deletedMenu = await menuModel.findByIdAndDelete(menu_id);

		if (!deletedMenu) {
			return res.status(400)
				.json({
					success: false,
					message: "Invalid menu id or the menu doesnt exists"
				})
		}

		const categoryUpdate = await categoryModel.findByIdAndUpdate(deletedMenu.category_id, { $pull: { menus: deletedMenu._id } }, { new: true })


		return res.status(200)
			.json({
				success: true,
				message: "menu is deleted successfully",
				data: deletedMenu
			})
	}

	catch (error) {
		console.log(error);
		return res.status(500)
			.json({
				success: false,
				message: "Internal error occured "
			})
	}
}



exports.updateMenu = async (req, res) => {
	try {

		const { menu_name, menu_desc, amount, serve } = req.body;
		const menu_id = req.params.menuid;

		if (!menu_id) {
			return res.status(400)
				.json({
					success: false,
					message: "kindly provide an menu id "
				})
		}

		if (!menu_name || !menu_desc || !amount || !serve) {
			return res.status(400)
				.json({
					success: false,
					message: "kinldy provide all details"
				})
		}

		const updatedMenu = await menuModel.findByIdAndUpdate(menu_id, { menu_name, menu_desc, amount, serve }, { new: true })
		if (updatedMenu) {
			return res.status(200)
				.json({
					success: true,
					message: "menu is created succesfully",
					data: updatedMenu
				})
		}
		else {
			return res.status(400)
				.json({
					success: false,
					message: "invalid menu id or menu that are you trying to update does not exists at all",
					data: null
				})

		}
	}
	catch (error) {
		console.log(error)
		return res.status(500)
			.json({
				success: false,
				message: "Internal error occured"
			})
	}
}

exports.getAllMenus = async (req, res) => {
	try {

		const menus = await menuModel.find({});

		return res.status(200)
			.json({
				success: true,
				message: menus.length > 0 ? "menus are fetched successfully" : "No menus are created yet ",
				data: menus
			})

	}
	catch (error) {
		console.log(error)
		return res.status(500)
			.json({
				success: false,
				message: "Internal error occured"
			})
	}
}


exports.getParticularMenu = async (req, res) => {
	try {

		const menu_id = req.params.menuid;

		if (menu_id) {
			return res.status(400)
				.json({
					success: false,
					message: "kindly provide an menu id"
				})
		}

		const response = await menuModel.findById(menu_id);

		if (response) {
			return res.status(200)
				.json({
					success: true,
					message: "particular menu is fetched successfully",
					data: response
				})
		}
		else {
			return res.status(400)
				.json({
					success: false,
					message: "menu that are you trying to delete does not exist or deleted ",
					data: response
				})
		}
	}
	catch (error) {
		console.log(error)
		return res.status(500)
			.json({
				success: false,
				message: "Internal error occured"
			})
	}
}