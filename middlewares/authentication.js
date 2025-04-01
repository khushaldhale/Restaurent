const jwt = require("jsonwebtoken");
require("dotenv").config()


exports.authentication = async (req, res, next) => {
	try {

		const token = req.cookies.token;

		if (!token) {
			return res.status(401)
				.json({
					success: false,
					message: " you are not logged in yet "
				})
		}

		const decode = jwt.verify(token, process.env.JWT_SECRET, (error, decode) => {
			if (error) {
				return res.status(401)
					.json({
						success: false,
						message: "Token is Invalid"
					})
			}

			req.decode = decode;
			return next()
		})


	}
	catch (error) {

		console.log("error occured in authentication : ", error);
		return res.status(500)
			.json(
				{
					success: false,
					message: "Internal error occured "
				}
			)
	}
}

exports.isAdmin = async (req, res, next) => {
	try {

		if (req.decode.accountType !== "admin") {
			return res.status(403)
				.json({
					success: false,
					message: "This is a protected route for admin only "
				})
		}
		return next();

	}
	catch (error) {
		console.log("error occured while authentication : ", error);
		return res.status(500)
			.json(
				{
					success: false,
					message: "Internal error occured "
				}
			)
	}
}



exports.isWaiter = async (req, res, next) => {
	try {

		if (req.decode.accountType !== "waiter") {
			return res.status(403)
				.json({
					success: false,
					message: "This is a protected route for waiter only "
				})
		}

		return next();

	}
	catch (error) {
		console.log("error occured while authentication : ", error);
		return res.status(500)
			.json(
				{
					success: false,
					message: "Internal error occured "
				}
			)
	}
}



exports.isCook = async (req, res, next) => {
	try {

		if (req.decode.accountType !== "cook") {
			return res.status(403)
				.json({
					success: false,
					message: "This is a protected route for cook only "
				})
		}
		return next();


	}
	catch (error) {
		console.log("error occured while authentication : ", error);
		return res.status(500)
			.json(
				{
					success: false,
					message: "Internal error occured "
				}
			)
	}
}




exports.isUser = async (req, res, next) => {
	try {

		console.log(req.decode.accountType)
		if (req.decode.accountType !== "user") {
			return res.status(403)
				.json({
					success: false,
					message: "This is a protected route for user only "
				})
		}

		return next();

	}

	catch (error) {
		console.log("error occured while authentication : ", error);
		return res.status(500)
			.json(
				{
					success: false,
					message: "Internal error occured "
				}
			)
	}
}