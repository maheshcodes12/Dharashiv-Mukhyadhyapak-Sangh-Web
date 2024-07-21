const mongoose = require("mongoose");

const noticeSchema = new mongoose.Schema(
	{
		noticeTitle: String,
		noticeText: String,
		time: String,
	},
	{
		timestamps: true,
	}
);

const notice = mongoose.model("notices", noticeSchema);
module.exports = notice;
