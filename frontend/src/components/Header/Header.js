import React, { useState } from "react";
import "./Header.css";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, logout } from "../../features/userSlice";

function Header() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    setMenuOpen(false);
    navigate("/auth");
  };

  const handleLogin = () => {
    setMenuOpen(false);
    navigate("/auth");
  };

  return (
    <header>
      <div className="header-container">
        <div className="header-left">
          <Link to="/">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Stack_Overflow_logo.svg/220px-Stack_Overflow_logo.svg.png"
              alt="logo"
            />
          </Link>
          <h4>About</h4>
          <h4>Products</h4>
          <h4>OverflowAI</h4>
        </div>

        <div className="header-middle">
          <div className="header-search-container">
            <SearchIcon />
            <input type="text" placeholder="Search..." />
          </div>
        </div>

        <div className="header-right">
          <div className="account-icon" onClick={() => setMenuOpen(!menuOpen)}>
            <AccountCircleIcon />
            {menuOpen && (
              <div className="dropdown-menu">
                {user ? (
                  <p onClick={handleLogout}>Logout</p>
                ) : (
                  <p onClick={handleLogin}>Login</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
