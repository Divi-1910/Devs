const express = require("express");
const fs = require("fs");

const app = express();

let todos = [
	{
		id: 1,
		task: "study",
	},
];

app.get("/todos", (req, res) => {
	res.status(200).json(todos);
});

app.get("/todos/:id", (req, res) => {
	const todo = todos.find((t) => t.id == parseInt(req.params.id));
	if (!todo) {
		res.status(404).send();
	} else {
		res.status(200).json(todo);
	}
});

app.post("/todos", (req, res) => {
	const newtask = req.body.task;
	const newid = Math.floor(Math.random() * 1000000);
	const newtodo = {
		id: newid,
		task: newtask,
	};
	todos.push(newtodo);
	res.status(200).json(todos);
});

app.put("/todos/:id", (req, res) => {
	const todoIndex = todos.findIndex((t) => t.id == parseInt(req.params.id));
	if (todoIndex == -1) {
		res.status(404).send();
	} else {
		todos[todoIndex].task = req.body.task;
		res.json(todos[todoIndex]);
	}
});

app.use((req, res, next) => {
	res.status(400).send();
});

app.listen(3000, (req, res) => {
	console.log("server is running at port 3000");
});
