// import React, {useState} from "react";

// function CreateTodo() {
// 	const [title, setTitle] = useState("");
// 	const [description, setDescription] = useState("");

// 	return (
// 		<div className="max-w-md mx-auto p-6 mt-8 bg-white shadow-2xl rounded-md">
// 			<input
// 				type="text"
// 				placeholder="Title"
// 				className="w-full p-2 mb-4 border border-gray-300 rounded-md"
// 				onChange={(event) => {
// 					const value = event.target.value;
// 					setTitle(value);
// 				}}
// 				value={title}
// 			/>
// 			<input
// 				type="text"
// 				placeholder="Description"
// 				className="w-full p-2 mb-4 border border-gray-300 rounded-md"
// 				onChange={(event) => {
// 					const value = event.target.value;
// 					setDescription(value);
// 				}}
// 				value={description}
// 			/>
// 			<button
// 				className="w-full bg-blue-500 text-white py-2
//             rounded-md hover:bg-blue-600"
// 				onClick={() => {
// 					fetch("http://localhost:3000/todo", {
// 						method: "POST",
// 						headers: {
// 							"Content-type": "application/json",
// 						},
// 						body: JSON.stringify({
// 							title: title,
// 							description: description,
// 						}),
// 					}).then(async (response) => {
// 						if (response.ok) {
// 							const json = await response.json();
// 							// alert("Todo Added");
// 							setTitle("");
// 							setDescription("");
// 						} else {
// 							alert("Failed to add Todo");
// 						}
// 					});
// 				}}>
// 				Add Todo
// 			</button>
// 		</div>
// 	);
// }

// export default CreateTodo;

import React, {useState} from "react";

function CreateTodo() {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");

	return (
		<div className="max-w-xl mx-auto p-8 mt-10 bg-white rounded-lg shadow-xl transition-shadow duration-300 ease-in-out hover:shadow-2xl">
			<input
				type="text"
				placeholder="Title"
				className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
				onChange={(event) => setTitle(event.target.value)}
				value={title}
			/>
			<input
				type="text"
				placeholder="Description"
				className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
				onChange={(event) => setDescription(event.target.value)}
				value={description}
			/>
			<button
				className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-all transform hover:scale-105"
				onClick={() => {
					fetch("http://localhost:3000/todo", {
						method: "POST",
						headers: {
							"Content-type": "application/json",
						},
						body: JSON.stringify({
							title: title,
							description: description,
						}),
					}).then(async (response) => {
						if (response.ok) {
							setTitle("");
							setDescription("");
						} else {
							alert("Failed to add Todo");
						}
					});
				}}>
				Add Todo
			</button>
		</div>
	);
}

export default CreateTodo;
