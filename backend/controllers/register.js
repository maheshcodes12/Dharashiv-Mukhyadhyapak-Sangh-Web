const school = require("../models/userModel.js");
const admin = require("../models/admin.js");

async function login(req, res) {
	const { udise, password } = req.body;

	try {
		const exist = await school.find(
			{ udise: udise },
			{ _id: 0, createdAt: 0, updatedAt: 0, __v: 0 }
		);

		if (!exist[0]) {
			return res
				.status(200)
				.json({ success: false, message: "User does not exist" });
		} else {
			let password_match = false;
			const Udise = exist[0].udise;
			const password_in_db = exist[0].password;
			if (password_in_db === password) password_match = true;

			if (password_match) {
				return res.status(200).json({
					success: true,
					message: "Logged in successfully",
					Udise: Udise,
				});
			} else {
				return res
					.status(200)
					.json({ success: false, message: "Invalid password" });
			}
		}
	} catch (e) {
		console.log(e);
		return res
			.status(404)
			.json({ success: false, message: "Problem while logging" });
	}
}
async function forgetPasswordReq(req, res) {
	const { udise } = req.query;

	try {
		const exist = await school.find(
			{ udise: udise },
			{ _id: 0, createdAt: 0, updatedAt: 0, __v: 0 }
		);

		if (!exist[0]) {
			return res
				.status(200)
				.json({ success: false, message: "User does not exist" });
		} else {
			return res.status(200).json({
				success: true,
				message: "You can proceed",
			});
		}
	} catch (e) {
		console.log(e);
		return res
			.status(404)
			.json({ success: false, message: "Problem while verifying" });
	}
}
async function resetPassword(req, res) {
	const { udise, password } = req.body;

	try {
		const exist = await school.find(
			{ udise: udise },
			{ _id: 0, createdAt: 0, updatedAt: 0, __v: 0 }
		);

		if (!exist[0]) {
			return res
				.status(200)
				.json({ success: false, message: "User does not exist" });
		} else {
			await school.updateOne(
				{ udise: udise },
				{
					$set: { password: password },
				}
			);

			return res.status(200).json({
				success: true,
				message: "Password Changed Successfully",
			});
		}
	} catch (e) {
		console.log(e);
		return res
			.status(404)
			.json({ success: false, message: "Problem while verifying" });
	}
}

async function signup(req, res) {
	const {
		schoolName,
		taluka,
		principalName,
		principalNo,
		parikshaPramukhName,
		parikshaPramukhNo,
		udise,
		password,
	} = req.body;

	try {
		const exist = await school.find({ udise: udise });
		if (exist[0]) {
			return res.status(200).json({
				success: false,
				message: "User already exists",
			});
		} else {
			const newSchool = new school({
				schoolName: schoolName,
				taluka: taluka,
				principalName: principalName,
				principalNo: principalNo,
				parikshaPramukhName: parikshaPramukhName,
				parikshaPramukhNo: parikshaPramukhNo,
				principalNo: principalNo,
				udise: udise,
				password: password,
			});
			await newSchool.save();

			return res.status(200).json({
				success: true,
				message: "User signed in successfully",
				udise: udise,
			});
		}
	} catch (e) {
		console.log(e);
		return res
			.status(404)
			.json({ success: false, message: "Problem while signing" });
	}
}

async function adminLogin(req, res) {
	const { username, password } = req.body;

	try {
		const exist = await admin.find({ username: username });

		if (!exist[0]) {
			return res
				.status(200)
				.json({ success: false, message: "User does not exist" });
		} else {
			let password_match = false;
			const username = exist[0].username;
			const password_in_db = exist[0].password;
			if (password_in_db === password) password_match = true;

			if (password_match) {
				return res.status(200).json({
					success: true,
					message: "Logged in successfully",
					username: username,
				});
			} else {
				return res
					.status(200)
					.json({ success: false, message: "Invalid password" });
			}
		}
	} catch (e) {
		console.log(e);
		return res
			.status(404)
			.json({ success: false, message: "Problem while logging" });
	}
}

async function adminSignup(req, res) {
	const { name, username, password } = req.body;

	try {
		const exist = await admin.find({ username: username });
		if (exist[0]) {
			return res.status(200).json({
				success: false,
				message: "Admin already exists",
			});
		} else {
			const newAdmin = new admin({
				name: name,
				username: username,
				password: password,
			});
			await newAdmin.save();

			return res.status(200).json({
				success: true,
				message: "User signed in successfully",
				username: username,
			});
		}
	} catch (e) {
		console.log(e);
		return res
			.status(404)
			.json({ success: false, message: "Problem while signing" });
	}
}
module.exports = {
	login,
	signup,
	forgetPasswordReq,
	resetPassword,
	adminLogin,
	adminSignup,
};
