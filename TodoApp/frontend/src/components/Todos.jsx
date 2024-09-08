// import React from "react";

// function Todos({todos, setTodos}) {
// 	return (
// 		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
// 			{todos.map((todo) => {
// 				return (
// 					<div
// 						key={todo._id}
// 						className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out">
// 						<h1 className="text-xl font-bold text-gray-800 mb-2">
// 							{todo.title}
// 						</h1>
// 						<h2 className="text-md text-gray-600 mb-4">{todo.description}</h2>
// 						<button
// 							className={`${
// 								todo.completed
// 									? "bg-green-600 text-black font-semibold p-2 rounded-md"
// 									: "bg-red-600 text-black font-semibold cursor-pointer p-2 rounded-md"
// 							}`}
// 							onClick={() => {
// 								fetch("http://localhost:3000/completed", {
// 									method: "PUT",
// 									headers: {
// 										"Content-type": "application/json",
// 									},
// 									body: JSON.stringify({
// 										id: todo._id,
// 									}),
// 								}).then((response) => {
// 									if (response.ok) {
// 										setTodos((prevTodos) =>
// 											prevTodos.map((prevtodo) =>
// 												prevtodo._id === todo._id
// 													? {...prevtodo, completed: true}
// 													: prevtodo
// 											)
// 										);
// 									}
// 								});
// 							}}>
// 							{todo.completed ? "Completed" : "Mark as Completed"}
// 						</button>
// 					</div>
// 				);
// 			})}
// 		</div>
// 	);
// }

// export default Todos;

import React from "react";

function Todos({todos, setTodos}) {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-6">
			{todos.map((todo) => (
				<div
					key={todo._id}
					className="relative bg-white p-6 rounded-lg shadow-xl transition-all transform hover:scale-105 hover:shadow-2xl">
					<h1 className="text-2xl font-semibold text-gray-800 mb-2">
						{todo.title}
					</h1>
					<p className="text-md text-gray-600 mb-4">{todo.description}</p>
					<button
						className={`${
							todo.completed
								? "bg-green-600 text-white py-2 px-4 rounded-md shadow-lg hover:bg-green-500 transition-all"
								: "bg-red-600 text-white py-2 px-4 rounded-md shadow-lg hover:bg-red-500 transition-all"
						}`}
						onClick={() => {
							fetch("http://localhost:3000/completed", {
								method: "PUT",
								headers: {
									"Content-type": "application/json",
								},
								body: JSON.stringify({
									id: todo._id,
								}),
							}).then((response) => {
								if (response.ok) {
									setTodos((prevTodos) =>
										prevTodos.map((prevtodo) =>
											prevtodo._id === todo._id
												? {...prevtodo, completed: true}
												: prevtodo
										)
									);
								}
							});
						}}>
						{todo.completed ? "Completed" : "Mark as Completed"}
					</button>
				</div>
			))}
		</div>
	);
}

export default Todos;
