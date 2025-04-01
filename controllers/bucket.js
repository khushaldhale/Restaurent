const bucketModel = require("../models/bucket");




exports.createBucket = async (req, res) => {
	try {

		const { menu_id, quantity } = req.body;
		const user_id = req.decode._id;

		if (!menu_id || !quantity) {
			return res.status(400)
				.json({
					success: false,
					message: "kindly provide all details "
				})
		}


		const is_existing_bucket = await bucketModel.findOne({ menu_id });

		if (is_existing_bucket) {

			return res.status(400)
				.json({
					success: false,
					message: "menu is alraeady added in the bucket"
				})
		}


		const createdBucket = await bucketModel.create({ menu_id, quantity, user_id });

		return res.status(200)
			.json({
				success: true,
				message: 'bucket is created succesfully ',
				data: createdBucket
			})

	}
	catch (error) {
		return res.status(500)
			.json({
				success: false,
				message: "Internal error occured"
			})
	}
}

// delete api for bucket
// getAllbuckets
// update bucket