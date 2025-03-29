const nodemailer = require("nodemailer");
require("dotenv").config()

const sendMail = async (to, subject, html) => {
	try {

		const transporter = nodemailer.createTransport(
			{
				host: "smtp.gmail.com",
				auth: {
					user: process.env.MAIL_USER,
					pass: process.env.MAIL_PASS
				}
			}
		)


		const mail_info = await transporter.sendMail({
			from: "Khushal Restro",
			to,
			subject,
			html
		})
		console.log("mail info :", mail_info)
	}
	catch (error) {
		console.log("error occured in sending  an email : ", error)
	}
}

module.exports = sendMail