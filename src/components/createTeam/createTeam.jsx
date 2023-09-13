import React, { useState, useEffect } from 'react';
import { openDatabase } from '../../config/db';
import "./createTeam.css";

const CreateTeam = () => {
  const [newTeamName, setNewTeamName] = useState('');
  const [users, setUsers] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const db = await openDatabase();
        const transaction = db.transaction(['users'], 'readonly');
        const store = transaction.objectStore('users');
        const getAllRequest = store.getAll();

        getAllRequest.onsuccess = (event) => {
          setUsers(event.target.result);
        };
      } catch (error) {
        console.error('Error opening database:', error);
      }
    }

    fetchUsers();
  }, []);

  const toggleMemberSelection = (userId) => {
    if (selectedMembers.includes(userId)) {
      setSelectedMembers((prevSelected) =>
        prevSelected.filter((id) => id !== userId)
      );
    } else {
      setSelectedMembers((prevSelected) => [...prevSelected, userId]);
    }
  };

  const createTeam = () => {
    if (newTeamName.trim() === '') {
      alert('Please enter a team name.');
      return;
    }

    const newTeam = {
      name: newTeamName,
      members: users.filter((user) => selectedMembers.includes(user.id)),
    };

    const existingTeams = JSON.parse(localStorage.getItem("Teams")) || [];
    const updatedTeams = [...existingTeams, newTeam];
    localStorage.setItem("Teams", JSON.stringify(updatedTeams));

    setNewTeamName('');
    setSelectedMembers([]);
  };

  return (
    <div className='createTeam'>
      <div>
        <h2>Create a New Team</h2>
        <input
          type="text"
          placeholder="Team Name"
          value={newTeamName}
          onChange={(e) => setNewTeamName(e.target.value)}
        />
        <h3>Select Team Members:</h3>
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <label>
                <input
                  type="checkbox"
                  value={user.id}
                  checked={selectedMembers.includes(user.id)}
                  onChange={() => toggleMemberSelection(user.id)}
                />
                {user.username}
              </label>
            </li>
          ))}
        </ul>
        <button onClick={createTeam}>Create Team</button>
      </div>
    </div>
  );
};

export default CreateTeam;
