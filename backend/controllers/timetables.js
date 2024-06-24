const timetable = require("../models/timetableModel.js");

async function getTimetable(req, res) {
	const { academicYear } = req.query;

	try {
		const exist = await timetable.find({ academicYear: academicYear });
		if (exist[0]) {
			return res.status(200).json({
				success: true,
				message: "Got data successfully",
				data: exist,
			});
		} else {
			return res.status(404).json({
				success: false,
				message: "Table data not available for this year",
			});
		}
	} catch (e) {
		console.log(e);
		return res
			.status(500)
			.json({ success: false, message: "Problem while getting table" });
	}
}

async function setTimetable(req, res) {
	const { academicYear, exams, examSchedule } = req.body;
	try {
		const exist = await timetable.find({ academicYear: academicYear });
		if (exist[0]) {
			await timetable.updateOne(
				{ academicYear: academicYear },
				{
					$set: {
						exams: exams,
						examSchedule: examSchedule,
					},
				}
			);
			const table = await timetable.find({ academicYear: academicYear });
			return res.status(200).json({
				success: true,
				message: "Table updated successfully",
				table: table,
			});
		} else {
			const newTT = new timetable({
				academicYear: academicYear,
				exams: exams,
				examSchedule: examSchedule,
			});
			await newTT.save();

			return res.status(200).json({
				success: true,
				message: "Table created successfully",
			});
		}
	} catch (e) {
		console.log(e);
		return res
			.status(500)
			.json({ success: false, message: "Problem while updating table" });
	}
}

module.exports = { getTimetable, setTimetable };
