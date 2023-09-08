import React from 'react';
import { Link } from "react-router-dom";
import './task.css';

const Task = (props) => {
  console.log(props);
    return (
        <div className="task-card">
          <Link to={`/tasks/${props.task.id}`} className="link">
          <h3 className="task-title">{ props.task.title }</h3>
          </Link>
          <p className="task-description">{ props.task.desc}</p>
          <div className="task-details">
            <p className="task-due-date">{ props.task.dueDate }</p>
            <p className="task-priority">{ props.task.priority }</p>
          </div>
          <div className="task-details">
            <p className="task-status">{ props.task.status }</p>
            <p className="task-assignedTeam">{ props.task.assignedTeam }</p>
          </div>
        </div>
      );
}

export default Task;