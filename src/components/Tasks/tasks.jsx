import React, { useState, useEffect } from 'react';
import Task from '../Task/task';
import './tasks.css';
import { openDatabase } from '../../config/db';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    async function fetchTasks() {
      try {
        const db = await openDatabase();
        const transaction = db.transaction(['tasks'], 'readonly');
        const store = transaction.objectStore('tasks');
        const getAllRequest = store.getAll();

        getAllRequest.onsuccess = (event) => {
          const tasks = event.target.result;
          setTasks(tasks);
        };
      } catch (error) {
        console.error('Error opening database:', error);
      }
    }

    fetchTasks(); // Call the async function to fetch tasks.
  }, []);

  return (
    <div className='tasks'>
      {tasks.map((task, index) => (
        <Task task={task} key={index} />
      ))}
    </div>
  );
}

export default Tasks;
