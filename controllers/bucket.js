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




exports.deleteBucket = async (req, res) => {
	try {

		const bucket_id = req.params.id;

		if (!bucket_id) {

			return res.status(400)
				.json({
					success: false,
					message: "kindly provide an bucket id"
				})
		}

		const deletedBucket = await bucketModel.findByIdAndDelete(bucket_id);

		if (deletedBucket) {
			return res.status(200)
				.json({
					success: true,
					message: "bucket is deleted succesfully",
					data: deletedBucket
				})
		} else {

			return res.status(200)
				.json({
					success: false,
					message: "bucket id does not exists  or invalid bucket id ",
					data: deletedBucket
				})
		}
	}
	catch (error) {
		return res.status(500)
			.json({
				success: false,
				message: "Internal error occured"
			})
	}
}



exports.getAllBuckets = async (req, res) => {
	try {


		const user_id = req.decode._id;
		const bucketList = await bucketModel.find(user_id);

		return res.status(200)
			.json({
				success: true,
				message: bucketList.length > 0 ? 'bucket items are fetched succesffulyy' : " No item is added to the bucket yet",
				data: bucketList
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

exports.updateBucket = async (req, res) => {
	try {

		const bucket_id = req.params.id;
		const quantity = req.body.quantity;

		if (!bucket_id) {
			return res.status(400)
				.json({
					success: false,
					message: "kindly provide an bucket id"
				})
		}
		if (!quantity) {
			return res.status(400)
				.json({
					success: false,
					message: "kindly provide an quantity"
				})
		}

		const updatedBucket = await bucketModel.findByIdAndUpdate(bucket_id, { quantity }, { new: true })


		if (updatedBucket) {
			return res.status(200)
				.json({
					success: true,
					message: "bucket is updated succesfully ",
					data: updatedBucket
				})
		}
		else {
			return res.status(200)
				.json({
					success: false,
					message: "bucket does not exists or invalid bucket id ",
					data: null
				})
		}
	}
	catch (error) {
		return res.status(500)
			.json({
				success: false,
				message: "Internal error occured"
			})
	}
}
