const mongoose = require("mongoose");
const { Schema } = mongoose;

const academicYearValidator = (value) => {
	return /^\d{4}-\d{2}$/.test(value);
};

const paperSchema = new mongoose.Schema(
	{
		academicYear: {
			type: String,
			required: true,
			validate: {
				validator: academicYearValidator,
				message: (props) =>
					`${props.value} is not a valid academic year format. It should be YYYY-YY.`,
			},
		},
		udise: Number,
		examType: String,
		studentsData: Schema.Types.Mixed,
	},
	{ timestamps: true }
);

const studentsData = mongoose.model("studentsData", paperSchema);

module.exports = studentsData;
