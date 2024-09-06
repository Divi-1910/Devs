const express = require("express");
const jwt = require("jsonwebtoken");
const passcode = "Dvrox@[19102002]$(7987283429)";

const app = express();

const PORT_NUMBER = 3000;
app.use(express.json());

const ALL_USERS = [
	{
		username: "divyansh@gmail.com",
		password: "123",
		name: "divyansh muley",
	},
	{
		username: "shivangi@gmail.com",
		password: "456",
		name: "shivangi joshi",
	},
	{
		username: "tanya@gmail.com",
		password: "789",
		name: "tanya shrivas",
	},
];

function userExists(username, password) {
	const userExists = ALL_USERS.find(
		(user) => user.username === username && user.password === password
	);
	return userExists;
}

app.post("/signin", (req, res) => {
	const username = req.body.username;
	const password = req.body.password;

	if (!userExists(username, password)) {
		return res.status(403).json({
			message: "User doesn't exists in our database",
		});
	}

	const token = jwt.sign({username: username}, passcode);

	return res.json({
		token,
	});
});

app.get("/users", (req, res) => {
	const token = req.headers.authorization;
	try {
		const decoded = jwt.verify(token, passcode);
		const username = decoded.username;
		res.status(200).json({
			ALL_USERS,
		});
	} catch (err) {
		return res.status(403).json({
			message: "Invalid Token",
		});
	}
});

app.listen(PORT_NUMBER, () => {
	console.log(`Server is running at port number - ${PORT_NUMBER}`);
});
