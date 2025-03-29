const express = require("express");
const app = express();
require("dotenv").config()
const mongoose = require("mongoose")
const fileUpload = require("express-fileupload");
const cookies = require("cookie-parser")



app.use(express.json());
app.use(fileUpload({
	tempFileDir: "/temp/",
	useTempFiles: true
}))
app.use(cookies())



app.get("/", (req, res) => {
	return res.status(200)
		.json({
			success: true,
			message: "server is up and running "
		})
})

const dbConnect = require("./config/database");
dbConnect()
const cloudinaryConnect = require("./config/cloudinaryConnect");
cloudinaryConnect()


// mapping of the routes
const authRoutes = require("./routes/authRoutes");
app.use("/api/v1/auth", authRoutes);


const categoryRoutes = require("./routes/categoryRoutes");
app.use("/api/v1/categories", categoryRoutes);


const PORT = process.env.PORT || 4001

const server = app.listen(PORT, () => {
	console.log("server is listening at : ", PORT)
})


const shutDown = () => {

	server.close((error) => {
		if (error) {
			console.log("error occured while shutting down the server : ");
			process.exit(1)
		}


		mongoose.connection.close(false)
			.then((data) => {
				console.log("database connection is disconnected : ");
				process.exit(0)

			})
			.catch((error) => {
				console.log("database connection is not succesfully disconnected : ")
				process.exit(1)
			})

	})
}

process.on("SIGINT", shutDown);
process.on("SIGTERM", shutDown);
