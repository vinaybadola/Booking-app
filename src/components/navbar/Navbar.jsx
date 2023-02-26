import "./navbar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext.js";
const Navbar = () => {
  const {user} = useContext(AuthContext);
  function logout(e){ 
    e.preventDefault()
    localStorage.clear();
    window.location.href="/";

    
  }

  return (
    <div className="navbar">
        <div className="navContainer">
          <Link to= "/" style={{color:"inherit", textDecoration:"none"}}>
            <span className="logo">PreBook</span>
            </Link>
            {user ? user.username : (
            <div className="navItems">
                <button className="navButton"><Link to ="/register" style={{textDecoration:"none"}} >Register </Link></button>
                <button className="navButton"><Link to ="/login"style={{textDecoration:"none"}} >Login</Link></button>
            </div>
            )}
             {user?  <button onClick={logout} className="navButton1">Logout</button> : "" }
        </div>
    </div>
  );
};

export default Navbar