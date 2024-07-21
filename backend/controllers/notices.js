const notice = require("../models/noticeModel.js");

async function setNotice(req, res) {
	const { noticeText, noticeTitle, time } = req.body;
	try {
		const newNotice = new notice({
			noticeText: noticeText,
			noticeTitle: noticeTitle,
			time: time,
		});
		await newNotice.save();

		return res.status(200).json({
			success: true,
			message: "Notice added successfully",
		});
	} catch {
		return res.status(200).json({
			success: false,
			message: "Problem while adding notice",
		});
	}
}
async function getNotice(req, res) {
	try {
		const notices = await notice.find({}).sort({ time: -1 }).exec();

		return res.status(200).json({
			success: true,
			notices: notices,
			message: "Got notices Successfully",
		});
	} catch {
		return res.status(200).json({
			success: false,
			message: "Problem while getting notice",
		});
	}
}

module.exports = { setNotice, getNotice };
