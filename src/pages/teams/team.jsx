import React from "react";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import "./team.css";

const Teams = () => {
  const teams = localStorage.getItem("Teams") ? JSON.parse(localStorage.getItem("Teams")) : [];

  return (
    <div className="teams-container">
      <div>
      <Link to='/teams/create-team'>
        <h2>Create Team.</h2>
      </Link>
        <h2>List of team.</h2>
        <ul>
          {teams.map((team) => (
            <li key={uuidv4()}>{team.name} : {team.members.map((member) => (
              <div key={uuidv4()}>
                <p><b>{member.username}</b>, {member.role}, {member.expertise}</p>
              </div>
            ))}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Teams;
