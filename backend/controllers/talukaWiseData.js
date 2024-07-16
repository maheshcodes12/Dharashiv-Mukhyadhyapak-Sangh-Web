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
	const { taluka, academicYear, examType } = req.query;
	console.log(taluka, academicYear, examType);

	try {
		const data = [];
		const udiseNoList = await school
			.find({ taluka: taluka }, { udise: 1, _id: 0, schoolName: 1 })
			.sort({ udise: 1 });

		for (let i = 0; i < udiseNoList.length; i++) {
			const element = udiseNoList[i];
			const exist = await studentsData
				.find(
					{
						udise: element.udise,
						academicYear: academicYear,
						examType: examType,
					},
					{ _id: 0, createdAt: 0, updatedAt: 0, __v: 0 }
				)
				.then((response) => {
					const school = response[0]?.studentsData;
					school?.unshift({ schoolName: element.schoolName });
					console.log(school);
					data.push(school);
				});
		}

		return res.status(200).json({
			success: true,
			message: "Got data successfully",
			data: data,
		});
	} catch (e) {
		console.log(e);
		return res
			.status(500)
			.json({ success: false, message: "Problem while getting data" });
	}
}

module.exports = { getSchoolData, getStudentsData };
