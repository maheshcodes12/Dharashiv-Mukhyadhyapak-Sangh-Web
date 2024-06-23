const mongoose = require("mongoose");
const { Schema } = mongoose;

const academicYearValidator = (value) => {
	return /^\d{4}-\d{2}$/.test(value);
};

const priceSchema = new mongoose.Schema(
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
		examType: String,
		prices: Schema.Types.Mixed,
	},
	{ timestamps: true }
);

const price = mongoose.model("priceData", priceSchema);

module.exports = price;
