// import {useState, useEffect} from "react";
// import CreateTodo from "./components/CreateTodo";
// import Todos from "./components/Todos";

// function App() {
// 	const [todos, setTodos] = useState([]);

// 	useEffect(() => {
// 		fetch("http://localhost:3000/todos")
// 			.then(async (res) => {
// 				const json = await res.json();
// 				setTodos(json.todos);
// 			})
// 			.catch((err) => {
// 				console.error("Error fetching todos:", err);
// 			});
// 	}, [todos]);
// 	return (
// 		<div>
// 			<CreateTodo></CreateTodo>
// 			<Todos todos={todos} setTodos={setTodos}></Todos>
// 		</div>
// 	);
// }

// export default App;

import {useState, useEffect} from "react";
import CreateTodo from "./components/CreateTodo";
import Todos from "./components/Todos";

function App() {
	const [todos, setTodos] = useState([]);

	useEffect(() => {
		fetch("http://localhost:3000/todos")
			.then(async (res) => {
				const json = await res.json();
				setTodos(json.todos);
			})
			.catch((err) => {
				console.error("Error fetching todos:", err);
			});
	}, [todos]);

	return (
		<div className="min-h-screen bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center p-6">
			<div className="w-full max-w-4xl">
				<h1 className="text-white text-4xl font-bold mb-8 text-center tracking-wide">
					TODO APPLICATION
				</h1>
				<CreateTodo />
				<h1 className="text-white text-4xl font-bold m-8 text-center tracking-wide">
					YOUR TODOS
				</h1>
				<Todos todos={todos} setTodos={setTodos} />
			</div>
		</div>
	);
}

export default App;
