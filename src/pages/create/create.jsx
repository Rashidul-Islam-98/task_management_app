import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './create.css';
import { getDatabase } from '../../config/db';

const Create = () => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('Low');
  const teams = localStorage.getItem("Teams") ? JSON.parse(localStorage.getItem("Teams")) : [];
  const [status, setStatus] = useState('New');
  const [assignedTeam, setAssignedTeam] = useState(teams[0].name);


  const handleSubmit = (e) => {
    e.preventDefault();
    let db=getDatabase();

    const newTask = {
      title,
      desc,
      dueDate,
      priority,
      status,
      assignedTeam
    };
    const transaction = db.transaction(['tasks'], 'readwrite');
    const store = transaction.objectStore('tasks');
    store.add(newTask);

    setTitle('');
    setDesc('');
    setDueDate('');
    setPriority('Low');
    setStatus('New');
    setAssignedTeam(teams[0].name);
  };

  return (
    <div>
      <form className="create-form">
        <div>
          <input
            type="text"
            placeholder="Title"
            className='create-title'
            autoFocus={true}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <textarea
            placeholder="Write task description..."
            className='create-desc'
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
        </div>
        <div className='create-info-wrapper'>
          <div className="create-date">
            <label>Due Date:</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>
          <div className="create-priority">
            <label>Priority:</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
          <div className="create-status">
            <label>Status:</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="New">New</option>
              <option value="In Progress">In Progress</option>
              <option value="Code Completed">Code Completed</option>
              <option value="Testing">Testing</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <div className="create-assignedTeam">
            <label>Assigned Team:</label>
            <select
              value={assignedTeam}
              onChange={(e) => setAssignedTeam(e.target.value)}
            >
              {teams.map((team)=>(
                <option key={uuidv4()}>{team.name}</option>
              ))}
            </select>
          </div>
        </div>
        <button className='create-button' onClick={ handleSubmit}>Publish</button>
      </form>
    </div>
  );
};

export default Create;
