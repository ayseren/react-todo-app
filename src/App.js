import { nanoid } from "nanoid";
import React, {useState} from 'react'
import Todo from "./components/Todo";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";

function App(props) {
  const [tasks, setTasks] = useState(props.tasks); 
  const [filter, setFilter] = useState('All');

  const FILTER_MAP = {
    All: () => true,
    Active: task => !task.completed,
    Completed: task => task.completed
  };

  const FILTER_NAMES = Object.keys(FILTER_MAP);

  const filterList = FILTER_NAMES.map(name => (
    <FilterButton 
      key={name} 
      name={name} 
      isPressed = {name === filter}
      setFilter={setFilter}
    />
  ));

  const toggleTaskCompleted = (id) => {
    const updatedTasks = tasks.map((task) => {
      if(id === task.id){
        return {...task, completed:!task.completed}
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  const deleteTask = (id) => {
    const remainingTasks = tasks.filter(task => id !== task.id);
    setTasks(remainingTasks);
  }

  const editTask = (id, newName) => {
    const editedTasks = tasks.map(task => {
      if(id === task.id){
        return {...task, name:newName}
      }
      return task;
    });
    setTasks(editedTasks);
  }

  const taskList = tasks
  .filter(FILTER_MAP[filter])
  .map(task => (
    <Todo 
      propsId={task.id} 
      name={task.name} 
      completed={task.completed} 
      key={task.id}
      toggleTaskCompleted={toggleTaskCompleted}
      deleteTask={deleteTask}
      editTask={editTask}
    />
  ));

  const tasksNoun = taskList.length !== 1 ? 'tasks' : 'task';
  const headingText = `${taskList.length} ${tasksNoun} remaining`;

  const addTask = (name) => {
    const newTask = {id: "todo-" + nanoid(), name:name, completed:false};
    setTasks([...tasks, newTask]);
  }

  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">
        {filterList}
      </div>
      <h2 id="list-heading">
         {headingText}
      </h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {taskList}
      </ul>
    </div>
  );
}

export default App;
