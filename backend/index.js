const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const registerRoute = require("./routes/registerRoute.js");
const timetableRoute = require("./routes/timetableRoute.js");
const paperDataRoute = require("./routes/paperDataRoute.js");
const priceRoute = require("./routes/priceRoute.js");
const talukaWiseDataRoute = require("./routes/talukaWiseDataRoute.js");

var mongoose = require("mongoose");

var mongoDB =
	"mongodb+srv://melionheart7:mongoDB123@website.dxelrjy.mongodb.net/App?retryWrites=true&w=majority&appName=Website";
mongoose
	.connect(mongoDB)
	.then(() => {
		console.log("Mongodb Connected");
	})
	.catch((e) => {
		console.log("Error: ", e);
	});

var db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));

dotenv.config({
	path: "./.env",
});

const app = express();
app.use(
	cors({
		origin: ["https://dharashiv-mukhyadhyapak-sangh-api.vercel.app/"],
		methods: ["POST", "GET"],
		credentials: true,
	})
);
app.use(express.json());
const PORT = process.env.PORT;

app.get("/", (req, res) => {
	res.json("Hello");
});
app.use(express.static("public"));
app.use("/register", registerRoute);
app.use("/timetable", timetableRoute);
app.use("/paperdata", paperDataRoute);
app.use("/price", priceRoute);
app.use("/talukawisedata", talukaWiseDataRoute);

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
