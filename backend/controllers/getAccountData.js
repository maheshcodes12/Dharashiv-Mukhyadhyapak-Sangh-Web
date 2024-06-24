const school = require("../models/userModel.js");
const admin = require("../models/admin.js");

async function getSchoolAccountData(req, res) {
	const { udise } = req.query;

	try {
		const exist = await school.find(
			{ udise: udise },
			{ _id: 0, createdAt: 0, updatedAt: 0, __v: 0, password: 0, udise: 0 }
		);

		if (!exist[0]) {
			return res
				.status(200)
				.json({ success: false, message: "User does not exist" });
		} else {
			return res.status(200).json({
				success: true,
				message: "Got data successfully",
				schoolData: exist[0],
			});
		}
	} catch (e) {
		console.log(e);
		return res
			.status(404)
			.json({ success: false, message: "Problem while getting data" });
	}
}

async function getAdminAccountData(req, res) {
	const { username } = req.query;
	console.log(username);
	try {
		const exist = await admin.find(
			{ username: username },
			{ _id: 0, createdAt: 0, updatedAt: 0, __v: 0, password: 0, username: 0 }
		);

		if (!exist[0]) {
			return res
				.status(200)
				.json({ success: false, message: "User does not exist" });
		} else {
			return res.status(200).json({
				success: true,
				message: "Got Data successfully",
				name: exist[0].name,
			});
		}
	} catch (e) {
		console.log(e);
		return res
			.status(404)
			.json({ success: false, message: "Problem while getting data" });
	}
}

module.exports = { getAdminAccountData, getSchoolAccountData };
