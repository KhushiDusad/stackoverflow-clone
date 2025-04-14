import React from "react";
import { Link } from "react-router-dom";
import FilterListIcon from "@mui/icons-material/FilterList";
import AllQuestions from "./AllQuestions";
import "./css/Main.css";

function Main({questions}) {
  return (
    <div className="main">
      <div className="main container">
        <div className="main-top">
          <h2>Newest Questions</h2>
          <Link to="/add-question">
            <button>Ask Question</button>
          </Link>
        </div>
        <div className="main-desc">
          <p>{questions && questions.length} Questions </p>
          <div className="main-filter">
            <div className="main-tabs">
              <div
                className="main-tab"
                style={{
                  background: "#ddd",
                  padding: "2px",
                  margin: "2px",
                  borderRadius: "5px",
                }}
              >
                <Link
                  style={{
                    fontWeight: "bold",
                    color: "rgba(0, 0, 0, 0.8)",
                  }}
                >
                  Newest
                </Link>
              </div>
              <div className="main-tab">
                <Link>Active</Link>
              </div>
              <div className="main-tab">
                <Link>Bountied</Link>
              </div>
              <div className="main-tab">
                <Link>Unanswered</Link>
              </div>
              <div className="main-tab">
                <Link>More</Link>
              </div>
            </div>
            <div className="main-filter-item">
              <FilterListIcon />
              <p>Filter</p>
            </div>
          </div>
        </div>
        <div className="questions">
        {
          questions.map((_q, index)=>(<>
            <div key={index} className="question">
            <AllQuestions question = {_q}/>
          </div>
          </>))
        }          
        </div>
      </div>
    </div>
  );
}

export default Main;
