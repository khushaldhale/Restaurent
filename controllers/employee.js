const userModel = require("../models/user");
const bcrypt = require("bcrypt");


exports.createEmployee = async (req, res) => {
	try {

		const { fname, lname, email, password } = req.body;

		const accountType = req.query.type;

		if (!accountType) {
			return res.status(400)
				.json({
					success: false,
					message: "kindly provide an account type "
				})
		}

		if (!fname || !lname || !email || !password) {
			return res.status(400)
				.json({
					success: false,
					message: "kindly provide all details"
				})
		}

		const is_existing = await userModel.findOne({ email });

		if (is_existing) {
			return res.status(400)
				.json({
					success: false,
					message: "employee is already created asked them to log in "
				})
		}
		const hashedPassword = await bcrypt.hash(password, 10);

		const employee = await userModel.create({ fname, lname, email, password: hashedPassword, accountType })

		return res.status(200)
			.json({
				success: true,
				message: "employee is created successfully",
				data: employee
			})
	}
	catch (error) {
		return res.status(400)
			.json({
				success: false,
				message: "Internal error occured "
			})
	}
}



exports.deleteEmployee = async (req, res) => {
	try {

		const employee_id = req.params.id;

		if (!employee_id) {
			return res.status(400)
				.json({
					success: false,
					message: "kindly provide an employee id"
				})
		}

		const deletedEmployee = await userModel.findByIdAndDelete(employee_id);

		if (deletedEmployee) {
			return res.status(200)
				.json({
					success: true,
					message: "employee is deleted successfully",
					data: deletedEmployee
				})
		}
		else {
			return res.status(400)
				.json({
					success: false,
					message: "invalid employee id or  employee that are you trying to delete doesnt exists",
					data: null
				})
		}

	}
	catch (error) {
		return res.status(400)
			.json({
				success: false,
				message: "Internal error occured "
			})
	}
}




exports.updateEmployee = async (req, res) => {
	try {

		// he cannot change  emil and accounType


		const employee_id = req.params.id;

		const { fname, lname } = req.body;

		if (!employee_id) {
			return res.status(400)
				.json({
					success: false,
					message: "kindly provide an employee id"
				})
		}

		if (!fname || !lname) {
			return res.status(400)
				.json({
					success: false,
					message: "kindly provide all details"
				})
		}

		const updatedEmployee = await userModel.findByIdAndUpdate(employee_id, { fname, lname }, { new: true });

		if (updatedEmployee) {
			return res.status(200)
				.json({
					success: true,
					message: "employee is updated successfully",
					data: updatedEmployee
				})
		} else {
			return res.status(200)
				.json({
					success: true,
					message: "invalid emp id or employee that are you trying to update does not exists",
					data: null
				})
		}

	}
	catch (error) {
		return res.status(400)
			.json({
				success: false,
				message: "Internal error occured "
			})
	}
}

//  get all employees
//  employees with filter



exports.getAllEmployees = async (req, res) => {
	try {

		const employees = await userModel.find({ accountType: { $in: ["cook", "waiter"] } });

		if (employees) {
			return res.status(200)
				.json({
					success: true,
					message: employees.length > 0 ? "employees are fetched successfully" : "No employees are created yet ",
					data: employees
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



exports.filteredEmployee = async (req, res) => {
	try {

		const accountType = req.query.type;
		const employees = await userModel.find({ accountType });

		if (employees) {
			return res.status(200)
				.json({
					success: true,
					message: employees.length > 0 ? "employees are fetched successfully" : "No employees are created yet ",
					data: employees
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