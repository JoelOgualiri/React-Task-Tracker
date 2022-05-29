import { Header } from "./components/Header";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Tasks } from "./components/Tasks";
import { useState, useEffect } from "react";
import { AddTask } from "./components/AddTask";
import { Footer } from "./components/Footer";
import { About } from "./components/About";

import axios from "axios";
function App() {
  const title = 'Task Tracker';
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([
  ])
  const fetchData = async (url) => {
    try {
      await axios.get(url).then((res) => setTasks(res.data))
    } catch (error) {
      return error
    }
  }
  useEffect(() => {
    const getTasks = async () => {
      const data = await fetchData('http://localhost:4000/tasks')
      if (data) {
        console.log(data)
      }
    }
    getTasks()
  }, [])

  //Add Task
  const addTask = async (task) => {
    const id = Math.floor(Math.random() * 10000) + 1;
    const newTask = { id: id, ...task }
    await axios.post('http://localhost:4000/tasks', newTask)
    setTasks([...tasks, newTask])
  }
  //Delete Task
  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:4000/tasks/${id}`)
    setTasks(tasks.filter((task) => task.id !== id))
  }

  //Toggle Reminder
  const toggleReminder = async (id) => {
    const amendTask = tasks.find((task) => task.id === id)
    await axios.put(`http://localhost:4000/tasks/${id}`, { ...amendTask, reminder: !amendTask.reminder })
    setTasks(tasks.map((task) => task.id === id ? { ...task, reminder: !task.reminder } : task))
  }

  return (
    <BrowserRouter>
      <div className="container">
        <Header title={title} showAddTask={showAddTask} toggleShowAddTask={setShowAddTask} />
        <Routes>
          <Route path='/' exact element={<>
            {showAddTask && <AddTask onAdd={addTask} />}
            {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} /> : "No Tasks"}
          </>
          }> </Route>
          <Route path='/about' element={<About />} >
          </Route>
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>

  );
}

export default App;
