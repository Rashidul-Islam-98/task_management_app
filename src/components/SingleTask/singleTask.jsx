import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { openDatabase } from '../../config/db';
import './singleTask.css';

const SingleTask = () => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('Low');
  const [status, setStatus] = useState('');
  const [assignedTeam, setAssignedTeam] = useState('');
  const { taskId } = useParams();

  useEffect(() => {
    async function fetchTasks() {
      try {
        const db = await openDatabase();
        const transaction = db.transaction(['tasks'], 'readonly');
        const store = transaction.objectStore('tasks');

        store.openCursor().onsuccess = function (event) {
            const cursor = event.target.result;
            if (cursor) {
              const foundTask = cursor.value;
              if (foundTask.id.toString() === taskId) {
                setTitle(foundTask.title);
                setDesc(foundTask.desc);
                setDueDate(foundTask.dueDate);
                setPriority(foundTask.priority);
                setStatus(foundTask.status);
                setAssignedTeam(foundTask.assignedTeam);
              } else {
                cursor.continue();
              }
            }
          };
          
      } catch (error) {
        console.error('Error opening database:', error);
      }
    }

    fetchTasks();
  }, [taskId]);

  return (
    <div className='singleTask-container'>
      <h3 className="singleTask-title">{ title }</h3>
          <p className="singleTask-description">{desc}</p>
          <div className="singleTask-details">
            <p className="singleTask-due-date">Due Date: { dueDate }</p>
            <p className="singleTask-priority">Priority: { priority }</p>
          </div>
          <div className="singleTask-actions">
            <p className="complete-singleTask-button">Task Status: { status }</p>
            <p className="assign-singleTask-button">Assigned Team: { assignedTeam }</p>
          </div>
    </div>
  );
}

export default SingleTask;
