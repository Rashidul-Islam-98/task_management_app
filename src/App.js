import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home/home';
import Header from './components/header/header';
import Create from './pages/create/create';
import Teams from './pages/teams/team';
import Login from './pages/login/login';
import Register from './pages/register/register';
import { openDatabase } from './config/db';
import SingleTask from './components/SingleTask/singleTask';
import CreateTeam from './components/createTeam/createTeam';
import { useAuth} from "./components/Auth/auth";

openDatabase();

function App() {
  const { state } = useAuth();
  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/create" element={state.isAuthenticated? <Create /> : <Login />} />
        <Route path="/teams" element={<Teams />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route path="/tasks/:taskId" element={<SingleTask />} />
        <Route path="/teams/create-team" element={state.isAuthenticated? <CreateTeam /> : <Login />} />
      </Routes>
    </Router>
  );
}

export default App;
