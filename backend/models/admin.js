const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
	{
		name: String,
		username: String,
		password: String,
	},
	{ timestamps: true }
);

const admin = mongoose.model("admin", adminSchema);

module.exports = admin;
