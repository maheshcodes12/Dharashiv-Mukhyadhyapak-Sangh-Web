const timetable = require("../models/timetableModel.js");
const school = require("../models/userModel.js");
const studentsData = require("../models/paperDataModel.js");

async function getSchoolData(req, res) {
	const { taluka } = req.query;

	try {
		const exist = await school
			.find(
				{ taluka: taluka },
				{ _id: 0, taluka: 0, password: 0, createdAt: 0, updatedAt: 0, __v: 0 }
			)
			.sort({ schoolName: 1 });
		if (exist?.length > 0) {
			const response = [{ taluka: taluka }, ...exist];
			return res.status(200).json({
				success: true,
				message: "Got data successfully",
				data: response,
			});
		} else {
			return res.status(200).json({
				success: false,
				message: "Data not available for this taluka",
			});
		}
	} catch (e) {
		console.log(e);
		return res
			.status(500)
			.json({ success: false, message: "Problem while getting data" });
	}
}

async function getStudentsData(req, res) {
	const { udise, academicYear, examType } = req.query;

	try {
		const exist = await studentsData.find(
			{ udise: udise, academicYear: academicYear, examType: examType },
			{ _id: 0, createdAt: 0, updatedAt: 0, __v: 0 }
		);

		if (exist?.length > 0) {
			return res.status(200).json({
				success: true,
				message: "Got data successfully",
				data: exist[0],
			});
		} else {
			return res.status(200).json({
				success: false,
				message: "Data not available for this school",
			});
		}
	} catch (e) {
		console.log(e);
		return res
			.status(500)
			.json({ success: false, message: "Problem while getting data" });
	}
}

module.exports = { getSchoolData, getStudentsData };
