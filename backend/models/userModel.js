const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
	{
		schoolName: { type: String, required: true },
		taluka: { type: String, required: true },
		principalName: { type: String, required: true },
		principalNo: { type: Number, required: true },
		parikshaPramukhName: { type: String, required: true },
		parikshaPramukhNo: { type: Number, required: true },
		udise: { type: Number, required: true },
		password: { type: String, required: true },
	},
	{ timestamps: true }
);
const school = mongoose.model("school", userSchema);

module.exports = school;
