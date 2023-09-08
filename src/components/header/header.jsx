import { Link } from "react-router-dom";
import './header.css';
import { useAuth } from '../Auth/auth';

const Header = () => {
    const { dispatch,state }=useAuth();
    const handleLogout = ()=>{
        dispatch({ type: "LOGOUT"});
    }
    return (
        <div className='top'>
            <div className="topleft">
                <ul className="topList">
                    <li className="topListItem">
                        <Link className="link" to="/">
                            HOME
                        </Link>
                    </li>
                    <li className="topListItem">
                        <Link className="link" to="/create">
                            CREATE
                        </Link>
                    </li>
                    <li className="topListItem">
                        <Link className="link" to="/teams">
                            TEAMS
                        </Link>
                    </li>
                </ul>
            </div>
           {state.isAuthenticated?<div className="topRight">
            <ul className="topList">
                <li onClick={handleLogout} className="topListItem">LOGOUT</li>
            </ul>
           </div>: <div className="topRight">
                
                <ul className="topList">
                    <li className="topListItem">
                        <Link className="link" to="/login">
                            LOGIN
                        </Link>
                    </li>
                    <li className="topListItem">
                        <Link className="link" to="/register">
                            REGISTER
                        </Link>
                    </li>
                </ul>
        </div>}
        </div>
    )
}

export default Header;