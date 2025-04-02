const orderModel = require("../models/order");
const bucketModel = require("../models/bucket");


exports.createOrder = async (req, res) => {
	try {

		//  bucket_list  and amount , we can get this data from the  UI  or from DB as well
		//  as of now i am taking it from  DB: 

		const user_id = req.decode.id;
		const bucket_list = await bucketModel.find({ user_id }).populate("menu_id")

		if (!bucket_list) {
			return res.status(400)
				.json({
					success: false,
					message: "bucket does not exists, so you cannot place the order"
				})
		}

		// [
		// 	{
		// 		menu_id: {
		// 			amount: 100
		// 		},
		// 		quantity: 2
		// 	}
		// ]

		const totalAmount = bucket_list.reduce((total, current) => {

			let currentTotal = current.menu_id.amount * current.quantity;
			return total + currentTotal

		}, 0)

		const bucket_items = bucket_list.map((bucket) => {
			return bucket._id
		})

		const newOrder = await orderModel.create({ user_id, total_amount: totalAmount, bucket_list: bucket_items });


		return res.status(200)
			.json({
				success: true,
				message: "order is placed successfully",
				data: newOrder
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



exports.updateOrderStatus = async (req, res) => {
	try {

		const order_status = req.query.status;

		const order_id = req.params.id;

		if (!order_id) {
			return res.status(400)
				.json({
					success: false,
					message: "kindly provide  an order id"
				})
		}

		if (!order_status) {
			return res.status(400)
				.json({
					success: false,
					message: "kindly provide an order status"
				})
		}

		// runValidators: true , to consider the validation that we have applied over schema 

		const updatedOrder = await orderModel.findByIdAndUpdate(order_id, { order_status }, { new: true, runValidators: true });


		if (updatedOrder) {
			return res.status(200)
				.json({
					success: true,
					message: "order status is changed successfully",
					data: updatedOrder
				})
		}
		else {
			return res.status(200)
				.json({
					success: true,
					message: "order that are you trying to update does not exists",
					data: updatedOrder
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
