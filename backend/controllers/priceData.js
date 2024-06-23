const price = require("../models/priceModel.js");

async function getPriceData(req, res) {
	const { academicYear, examType } = req.query;

	try {
		const exist = await price.find({
			academicYear: academicYear,
			examType: examType,
		});

		if (exist[0]) {
			return res.status(200).json({
				success: true,
				message: "Got data successfully",
				data: exist,
			});
		} else {
			return res.status(200).json({
				success: false,
				message: "Price data not availabe",
			});
		}
	} catch (e) {
		console.log(e);
		return res
			.status(404)
			.json({ success: false, message: "Problem while getting data" });
	}
}

async function setPriceData(req, res) {
	const { academicYear, examType, prices } = req.body;

	try {
		const exist = await price.findOne({
			academicYear: academicYear,
			examType: examType,
		});

		if (exist) {
			await price.updateOne(
				{ academicYear: academicYear, examType: examType },
				{
					$set: { prices: prices },
				}
			);

			return res.status(200).json({
				success: true,
				message: "Data updated successfully",
			});
		} else {
			const newData = new price({
				academicYear: academicYear,
				examType: examType,
				prices: prices,
			});
			await newData.save();

			return res.status(200).json({
				success: true,
				message: "Data entered successfully",
			});
		}
	} catch (e) {
		console.log(e);
		return res
			.status(404)
			.json({ success: false, message: "Problem while updating data" });
	}
}
module.exports = { getPriceData, setPriceData };
