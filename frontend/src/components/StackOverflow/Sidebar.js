import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import SellIcon from "@mui/icons-material/Sell";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import QuestionAnswerOutlinedIcon from "@mui/icons-material/QuestionAnswerOutlined";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import BusinessIcon from "@mui/icons-material/Business";
import "./css/Sidebar.css";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-container">
        <div className="sidebar-options">
          <div className="sidebar-option">
            <div className="sidebar-link">
              <HomeIcon />
              <Link to="/">Home</Link>
            </div>
            <div className="sidebar-link">
              <QuestionAnswerIcon />
              <Link to="/">Questions</Link>
            </div>
            <div className="sidebar-link">
              <SellIcon />
              <Link>Tags</Link>
            </div>
          </div>
          <div className="sidebar-option">
            <div className="sidebar-link">
              <ChatOutlinedIcon />
              <Link>Discussions</Link>
            </div>
            <div className="sidebar-link">
              <QuestionAnswerOutlinedIcon />
              <Link>Chat</Link>
            </div>
            <div className="sidebar-link">
              <PeopleAltIcon />
              <Link>Users</Link>
            </div>
          </div>
          <div className="sidebar-option">
            <div className="sidebar-link">
              <BusinessIcon />
              <Link>Companies</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
