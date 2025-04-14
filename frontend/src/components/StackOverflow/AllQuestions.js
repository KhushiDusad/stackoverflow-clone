import React from "react";
import { Link } from "react-router-dom";
import "./css/AllQuestions.css";
import { Avatar } from "@mui/material";
import parse from 'react-html-parser';

function AllQuestions({ question }) {
  
  function truncate(str, len){
    return str?.length > len ? str.substr(0, len-1) + "..." : str
   }

  let tags = JSON.parse(question?.tags[0]);

  return (
    <div className="all-questions">
      <div className="all-questions-container">
        <div className="all-questions-left">
          <div className="all-options">
            <div className="option">
              <p>0 Votes</p>
            </div>
            <div className="option">
              <p>{question?.answerDetails?.length} Answers</p>
            </div>
            <div className="option">
              <p>10 Views</p>
            </div>
          </div>
        </div>
        <div className="question-answer">
          <Link to={`/question?q=${question?._id}`}>{question?.title}</Link>
          <div style={{ width: "90%" }}>
            <div>{parse(truncate(question?.body, 200))}</div>
          </div>
          <div className="tags-author">
            {tags.map((_tag) => (
              <>
                <div className="tags">
                  <div className="tag">
                    <Link className="question-tags">{_tag}</Link>
                  </div>
                </div>
              </>
            ))}
            <div className="author">
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Avatar />
                <Link style={{ color: " #0151f0d8", marginLeft: "5px" }}>
                  {question?.user?.email
                    ? (question?.user?.email).split("@")[0]
                    : "Anonymous"}
                </Link>
              </div>
              <p>{new Date(question?.created_at).toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllQuestions;
