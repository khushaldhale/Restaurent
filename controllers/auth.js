const userModel = require("../models/user");
const otpModel = require("../models/otp");
const generator = require("otp-generator");
const sendMail = require("../utils/sendMail");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config()



exports.sendOTP = async (req, res) => {
	try {

		const email = req.body.email;

		if (!email) {
			return res.status(400)
				.json(
					{
						success: false,
						message: "kindly provide an email"
					}
				)
		}

		const otp = generator.generate(4,
			{
				upperCaseAlphabets: false,
				lowerCaseAlphabets: false,
				specialChars: false
			}
		)

		const response = await otpModel.create({ email, otp })

		sendMail(email, "OTP for Verification", `OTP for verification is ${otp}`);

		return res.status(200)
			.json({
				success: true,
				message: "otp is sent successfully"
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

exports.register = async (req, res) => {
	try {

		const { fname, lname, email, password, accountType, otp } = req.body;

		if (!fname || !lname || !email || !password || !accountType) {
			return res.status(400)
				.json({
					success: false,
					message: "kindly provide all details"
				})
		}

		if (!otp) {
			return res.status(400)
				.json({
					success: false,
					message: "kindly provide all otp"
				})
		}

		const otpDocument = await otpModel.findOne({ email, otp: +otp });

		if (Date.now() >= Date.parse(otpDocument.expiresAt)) {
			return res.status(400)
				.json({
					success: false,
					message: 'Time has expired for OTP'
				})
		}

		const is_existing = await userModel.findOne({ email });
		if (is_existing) {
			return res.status(400)
				.json({
					success: false,
					message: 'user already exists, kindly login '
				})
		}

		const hashedPassword = await bcrypt.hash(password, 10)

		const user = await userModel.create({ fname, lname, email, password: hashedPassword, accountType });

		return res.status(200)
			.json(
				{
					success: true,
					message: 'user is registered successfully'
				}
			)

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

exports.login = async (req, res) => {
	try {

		const { email, password } = req.body;

		if (!email || !password) {
			return res.status(400)
				.json({
					success: false,
					message: "kindly provide all credentials "
				})
		}

		const is_existing = await userModel.findOne({ email });
		if (!is_existing) {

			return res.status(400)
				.json({
					success: false,
					message: 'you are not regietsred yet, kindly register first'
				})
		}

		if (await bcrypt.compare(password, is_existing.password)) {

			const token = jwt.sign({
				_id: is_existing._id,
				accountType: is_existing.accountType
			},
				process.env.JWT_SECRET,
				{
					expiresIn: "30d"
				})



			return res.cookie("token", token, {
				httpOnly: true,
				secure: false, // for http it is false and https it is true,
				expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
				sameSite: "None" // when frontend and backend running over different  ports
			})
				.status(200)
				.json({
					success: true,
					message: "you are logged in successfully",
					data: is_existing
				})


		} else {
			return res.status(400)
				.json({
					success: false,
					message: "Password is incorrect "
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