const mongoose = require("mongoose");

mongoose
	.connect("mongodb://localhost:27017/TodoApp")
	.then(() => {
		console.log("Successfully Connected to the database");
	})
	.catch((err) => {
		console.log("Error in MongoDB Connection " + err);
	});

const todoSchema = new mongoose.Schema({
	title: String,
	description: String,
	completed: Boolean,
});

const todo = mongoose.model("todos", todoSchema);

module.exports = {
	todo,
};
