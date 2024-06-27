import React, { useState,useEffect } from "react";
//include images into your bundle

//create your first component
const Home = () => {
	
		const [inputByUser, setInputByUser] = useState("");
		const [tasks, setTasks] = useState([]);
		const apiUrl = "https://playground.4geeks.com/todo";
	  
		const pressEvent = (event) => {
		  if (event.key == "Enter") {
			if (event.target.value == "") {
			  return alert("Enter your task!");
			}
			addNewTask(inputByUser)
			setInputByUser("");
		  }
		};
	  
		const taskAdder = (event) => {
		  setInputByUser(event.target.value);
		};
	  
		const getList = async () => { 
			try {
				const response = await fetch(`${apiUrl}/users/leoisnothere`) 
				if (!response.ok){
					throw new Error ("No se pudo obtener la lista")
				}
				const data = await response.json() 
				console.log(data)
				setTasks (data.todos)
			} catch (error) {
				console.log(error)
			}
		}

		const addNewTask = async (newTask) => { 
			try {
				const response = await fetch(`${apiUrl}/todos/leoisnothere`, {
					method: "POST",
					body: JSON.stringify(
						{
							"label": newTask,
							"is_done": false
						  }
					),
					headers: {
						"Content-Type": "application/json"
					}
				}) 
				if (!response.ok){
					throw new Error ("No se pudo agregar la tarea")
				}
				const data = await response.json() 
				console.log(data) 
				setTasks([...tasks,data])
			} catch (error) {
				console.log(error)
			}
		}

		const deleteTask = async (id) => { 
			try {
				const response = await fetch(`${apiUrl}/todos/${id}`, {method: "DELETE"}) 
				if (!response.ok){
					throw new Error ("No se pudo eliminar la tarea")
				}
				const data = await response
				console.log(data)
				const newArray = tasks.filter(item => item.id != id )
				setTasks(newArray)
			} catch (error) {
				console.log(error)
			}
		}
 
		useEffect(() => {
			getList()
		}, [])


		return (
			<div className="container">
			<h1 className="text-center">todos</h1>
			<div className="card todo-card mx-auto mt-5" style={{ maxWidth: "800px" }}>
				<ul className="list-group list-group-flush">
					<li className="list-group-item">
						<input 
							type="text"
							className="form-control"
							value={inputByUser}
							onChange={taskAdder}
							placeholder="What needs to be done?"
							onKeyDown={pressEvent}
						/>
					</li>
					{tasks.length == 0 ? (
						<li className="list-group-item no-tasks">-- No tasks, add a task --</li>
					) : (
						tasks.map((task) => (
							<div
							  key={task.id}
							  className="task justify-content-between text-start container d-flex my-2"
							>
							  <p>{task.label}</p>
							  <button type="button" class="btn-close" aria-label="Close"
								onClick={() => deleteTask(task.id)}
							  >
							  </button>
							</div>
						  ))
					)}
				</ul>
				<div className="card-footer text-secondary">
					{tasks.length} {tasks.length === 1 ? "item" : "items"} left
				</div>
			</div>
		</div>
	);
  };
  
export default Home;