import React from "react";
import { Link } from "react-router-dom";

const Teams = () => {
  const teams = localStorage.getItem("Teams") ? JSON.parse(localStorage.getItem("Teams")) : [];

  return (
    <div className="teams-container">
      <Link to='/teams/create-team'>
        <h2>Create Team.</h2>
      </Link>
      <h2>List of team.</h2>
      <ul>
        {teams.map((team) => (
          <li key={team.name}>{team.name} : {team.members.map((member) => (
            <div>
              <p><b>{member.username}</b>, {member.role}, {member.expertise}</p>
            </div>
          ))}</li>
        ))}
      </ul>
    </div>
  );
};

export default Teams;
