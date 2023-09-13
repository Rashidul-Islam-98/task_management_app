import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { openDatabase } from '../../config/db';
import { useAuth} from "../Auth/auth";
import { v4 as uuidv4 } from 'uuid';
import './singleTask.css';

const SingleTask = () => {
  const teams = localStorage.getItem("Teams") ? JSON.parse(localStorage.getItem("Teams")) : [];
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('Low');
  const [status, setStatus] = useState('New');
  const [assignedTeam, setAssignedTeam] = useState(teams[0].name);
  const [task,setTask] = useState({});
  const { taskId } = useParams();
  const navigate = useNavigate();
  const { state } = useAuth();

  useEffect(() => {
    async function fetchTasks() {
      try {
        const db = await openDatabase();
        const transaction = db.transaction(['tasks'], 'readonly');
        const store = transaction.objectStore('tasks');
        const request =await store.get(Number(taskId));
        request.onsuccess = function (event){
          setTask(event.target.result);
        }
          
      } catch (error) {
        console.error('Error opening database:', error);
      }
    }

    fetchTasks();
  }, [taskId]);

  const updateTask = async () => {
    try {
      const db = await openDatabase();
      const transaction = db.transaction(['tasks'], 'readwrite');
      const store = transaction.objectStore('tasks');
  
      const request = store.get(Number(taskId));
  
      request.onsuccess = function (event) {
        const updateTask = event.target.result;
  
        if (updateTask) {
          updateTask.dueDate = dueDate || task.dueDate;
          updateTask.priority = priority || task.priority;
          updateTask.status = status || task.status;
          updateTask.assignedTeam = assignedTeam || task.assignedTeam;
  
          const updateRequest = store.put(updateTask);
  
          updateRequest.onsuccess = function () {
            window.location.reload();
          };
  
          updateRequest.onerror = function (error) {
            console.error('Error updating task:', error);
          };
        }
      };
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const deleteTask = async () => {
    try {
      const db = await openDatabase();
      const transaction = db.transaction(['tasks'], 'readwrite');
      const store = transaction.objectStore('tasks');
  
      await store.delete(Number(taskId));
      navigate("/");
  
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };
  
  

  return (
    <div className='singleTask-container'>
      <h3 className="singleTask-title">{ task.title }</h3>
          <p className="singleTask-description">{ task.desc}</p>
          <div className="singleTask-details">
            <div className="singleTask-due-date">
            <p>Due Date: { task.dueDate }</p>
            {state.isAuthenticated && <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />}
            </div>
            <div className="singleTask-priority">
            <p>Priority: { task.priority }</p>
            { state.isAuthenticated && <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>}
            </div>
            <div className="singleTask-priority">
            <p>Task Status: { task.status }</p>
           { state.isAuthenticated && <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="New">New</option>
              <option value="In Progress">In Progress</option>
              <option value="Code Completed">Code Completed</option>
              <option value="Testing">Testing</option>
              <option value="Completed">Completed</option>
            </select>}
            </div>
            <div className="singleTask-priority">
            <p>Assigned Team: { task.assignedTeam }</p>
            { state.isAuthenticated && <select
              value={assignedTeam}
              onChange={(e) => setAssignedTeam(e.target.value)}
            >
              {teams.map((team)=>(
                <option key={uuidv4()}>{team.name}</option>
              ))}
            </select>}
            </div>
          </div>
          {state.isAuthenticated && <div className="singleTask-actions">
            <button className="complete-singleTask-button" onClick={updateTask}>Update</button>
            <button className="assign-singleTask-button" onClick={deleteTask}>Delete</button>
          </div>}
    </div>
  );
}

export default SingleTask;
