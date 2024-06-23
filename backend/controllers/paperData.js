const data = require("../models/paperDataModel.js");

async function getStudentsData(req, res) {
	const { academicYear, udise, examType } = req.query;
	const Udise = Number(udise);

	try {
		const exist = await data.find({
			academicYear: academicYear,
			udise: udise,
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
				message: "Students data not availabe",
			});
		}
	} catch (e) {
		console.log(e);
		return res
			.status(404)
			.json({ success: false, message: "Problem while getting data" });
	}
}

async function setStudentsData(req, res) {
	const { academicYear, udise, examType, studentsData } = req.body;
	try {
		const exist = await data.find({
			academicYear: academicYear,
			udise: udise,
			examType: examType,
		});
		if (exist[0]) {
			data.updateOne(
				{ academicYear: academicYear, udise: udise, examType: examType },
				{
					studentsData: studentsData,
				}
			);
			return res.status(200).json({
				success: true,
				message: "Data updated successfully",
			});
		} else {
			const newData = new data({
				academicYear: academicYear,
				udise: udise,
				examType: examType,
				studentsData: studentsData,
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
module.exports = { getStudentsData, setStudentsData };
