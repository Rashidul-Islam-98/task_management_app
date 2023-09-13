import { Link } from "react-router-dom";
import './header.css';
import { useAuth } from '../Auth/auth';

const Header = () => {
    const { state }=useAuth();
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
           {state.isAuthenticated?(
            <div className="topRight">
          <Link to="/dashboard">
            <img className="topImg" src="https://i.ibb.co/bzK7Ww7/profile.jpg" alt="" />
          </Link></div>
        ): (<div className="topRight">
                
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
        </div>)}
        </div>
    )
}

export default Header;