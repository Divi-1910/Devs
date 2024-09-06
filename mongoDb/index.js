const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const passcode = "Dvrox@1910-!@#$%^&*()-7987283429";

mongoose
	.connect("mongodb://localhost:27017/cohortExample")
	.then(() => {
		console.log("SuccessFully Connected To MongoDB");
	})
	.catch((err) => {
		console.log("Could not Connect To MongoDB");
	});

const User = mongoose.model("Users", {
	username: String,
	email: String,
	password: String,
});

const app = express();
app.use(express.json());

app.post("/signin", async (req, res) => {
	const username = req.body.username;
	const password = req.body.password;
	const email = req.body.email;

	const existinguser = await User.findOne({email: email});
	if (existinguser) {
		return res.status(400).send("Account already exists");
	}

	const user = new User({
		username: username,
		email: email,
		password: password,
	});

	await user.save();
	console.log("New User stored in the database");

	res.json({
		message: "User Account created Successfully !!",
	});
});

app.listen(3000, () => {
	console.log("Server is running at port 3000");
});
