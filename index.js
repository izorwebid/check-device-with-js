const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");
const mobileBrowser = require("detect-mobile-browser");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({ origin: "*" }));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(mobileBrowser());

app.get("/", async (req, res) => {
	let trace = await axios
		.get("https://www.cloudflare.com/cdn-cgi/trace")
		.then(({ data }) => {
			result = data
				.trim()
				.split("\n")
				.reduce(function (obj, pair) {
					pair = pair.split("=");
					return (obj[pair[0]] = pair[1]), obj;
				}, {});
			return result;
		});

	let response = {
		yourIp: trace.ip,
		message: `Api live ${Math.floor(Math.random() * 100 + 1)}`,
	};

	res.json(response);
});

app.get("/download", async (req, res) => {
	console.log("Download");
	if (req.SmartPhone.isAndroid() !== null) {
		res.redirect("https://play.google.com/store/apps");
	}
	if (req.SmartPhone.isIOS() !== null) {
		res.redirect("https://www.apple.com/id/app-store/");
	}
	if (req.SmartPhone.isIPhone() !== null) {
		res.redirect("https://www.apple.com/id/app-store/");
	}
});

app.listen(port, () => {
	console.log(`running on port ${port}`);
});
