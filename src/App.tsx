import React, { FC, ChangeEvent, useState } from 'react';
import './App.css';
import Task from './components/Task';

const App: FC = () => {

  const [task, setTask] = useState<string>("")
  const [todo, setTodo] = useState<string[]>([])
  const [showChangeDialog, switchShowChangeDialog] = useState<boolean>(false)
  const [taskToChange, setTaskToChange] = useState<string>("")

  const handleInput = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.name === "taskDescription") {
      setTask(event.target.value)
    }
  }

  const addTask = (): void => {
    setTodo([...todo, task])
    setTask("")
  }

  const completeTask = (taskName: string): void => {
    setTodo(todo.filter((task) => {
      return task !== taskName;
    }))
  }

  const renameTask = (oldTaskName: string): void => {

    setTaskToChange(oldTaskName);
    switchShowChangeDialog(true);
  }

  const applyRenameTask = (newTaskName: string): void => {
    setTodo(todo.map((task) => {
      return task && task !== taskToChange ? task : newTaskName;
    }))
    setTaskToChange("");
    setTask("")
    switchShowChangeDialog(false);
  }

  /* It is ugly, but I don't know how to implement it better */
  if (showChangeDialog) {
    return (
      <div className="App">
        <div className="header">
          <div className="inputContainer">
            <input type="text" placeholder={taskToChange} name="taskDescription" value={task} onChange={handleInput} />
            <div className="control">
              <div><button onClick={() => applyRenameTask(task)}>Apply</button></div>
              <div><button onClick={() => switchShowChangeDialog(false)}>Cancel</button></div>
            </div>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div className="App">
        <div className='header'>
          <div className='inputContainer'>
            <input type="text" placeholder='Insert new task here' name="taskDescription" value={task} onChange={handleInput} />
            <button onClick={addTask}>Add New Task</button>
          </div>
        </div>
        <div className='list'>
          {todo.map(
            (task: string) => {
              return <Task task={task} completeTask={completeTask} renameTask={renameTask} />
            }
          )}
        </div>
      </div>
    );
  }
}

export default App;
