const express = require("express");
const zod = require("zod");
const PORT_NUMBER = 3000;
const app = express();

let totalRequestTime = 0;
let requestCount = 0;

const schema = zod.array(zod.number());

function validateInput(obj) {
	const userSchema = zod.object({
		email: zod.string().email(),
		password: zod.string().min(6),
	});
	const response = userSchema.safeParse(obj);
	return response;
}

app.use(express.json());

app.use((req, res, next) => {
	const start = Date.now();
	res.on("finish", () => {
		const end = Date.now();
		const timeTaken = end - start;
		totalRequestTime = totalRequestTime + timeTaken;
		requestCount++;

		const averageResponseTime = totalRequestTime / requestCount;
		console.log(
			`Request handled in ${timeTaken}ms | Average time: ${averageResponseTime.toFixed(
				2
			)}ms`
		);
	});
	next();
});

function userMiddleWare(req, res, next) {
	const username = req.headers.username;
	const password = req.headers.password;

	if (username !== "divyansh" || password !== "0220") {
		res.status(403).json({
			message: "Incorrect username or password",
		});
	} else {
		next();
	}
}

function kidneyMiddleWare(req, res, next) {
	const kidneyId = req.query.kidneyId;
	if (kidneyId !== 1 && kidneyId !== 2) {
		res.status(403).json({
			message: "Incorrect Kidney Id",
		});
	} else {
		next();
	}
}

app.get("/health-checkup", userMiddleWare, kidneyMiddleWare, (req, res) => {
	res.json({
		message: "your kidney is fine",
	});
});

app.post("/health-checkup", (req, res) => {
	const kidneys = req.body.kidneys;
	const response = schema.safeParse(kidneys);
	if (!response.success) {
		res.status(411).json({
			message: "Input is Invalid",
		});
	} else {
		res.send({
			response,
		});
	}
});

app.post("/login", (req, res) => {
	const input = req.body;
	const response = validateInput(input);

	if (response.success) {
		res.status(200).json({
			message: "Login successfull",
		});
	} else {
		res.status(400).json({
			message: "Login Unsuccessfull",
		});
		return;
	}
});

// global catches
app.use((err, req, res, next) => {
	res.json({
		message: "Something is wrong with the server",
	});
});

app.listen(PORT_NUMBER, () => {
	console.log(`server is running successfully at port number ${PORT_NUMBER}`);
});
