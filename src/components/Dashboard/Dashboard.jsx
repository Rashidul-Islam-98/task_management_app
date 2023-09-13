import React from 'react';
import { useAuth } from '../Auth/auth';
import "./Dashboard.css";

const Dashboard = () => {
    const {dispatch,state} = useAuth();
    const user = state.user;
    const handleLogout = ()=>{
        dispatch({ type: "LOGOUT"});
    }
  return (
    <div className='dashboard'>
        <div>
            <img src="https://i.ibb.co/bzK7Ww7/profile.jpg" alt="Profile"/>
            <h2>{ user.username}</h2>
            <p>{ user.role}</p>
            <p>{ user.expertise}</p>
            <h4 onClick={handleLogout} className='logout'>Logout</h4>
        </div>
    </div>
  )
}

export default Dashboard;
