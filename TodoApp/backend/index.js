const express = require("express");
const {createTodo, updateTodo} = require("./types");
const {todo} = require("./db");
const cors = require("cors");
const PORT = 3000;

const app = express();
app.use(express.json());
app.use(cors());

app.post("/todo", async (req, res) => {
	const createPayload = req.body;
	const parseCreatePayload = createTodo.safeParse(createPayload);
	if (!parseCreatePayload.success) {
		return res.status(411).json({
			message: "Please Send Correct Inputs",
		});
	}

	const newTodo = await todo.create({
		title: createPayload.title,
		description: createPayload.description,
		completed: false,
	});

	if (!newTodo) {
		return res.status(403).json({
			message: "Todo could not created",
		});
	} else {
		return res.status(200).json({
			message: "Todo created Successfully",
		});
	}
});

app.get("/todos", async (req, res) => {
	const todos = await todo.find({});
	// console.log(todos);
	res.json({
		todos,
	});
});

app.put("/completed", async (req, res) => {
	const completedPayload = req.body;
	const parsecompletedPayload = updateTodo.safeParse(completedPayload);
	if (!parsecompletedPayload.success) {
		return res.status(411).json({
			message: "Incorrect Id is selected !!",
		});
	}
	const completedTodo = await todo.updateOne(
		{
			_id: req.body.id,
		},
		{
			completed: true,
		}
	);

	if (completedTodo.modifiedCount == 1) {
		return res.json({
			message: "Todo marked as completed.",
		});
	} else {
		return res.status(404).json({
			message: "Todo not found or already completed.",
		});
	}
});

app.listen(PORT, () => {
	console.log(`Server is successfully running at ${PORT}`);
});
