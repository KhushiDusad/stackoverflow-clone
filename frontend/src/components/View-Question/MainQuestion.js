import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import { Avatar } from "@mui/material";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import "./index.css";
import axios from "axios";
import parse from "react-html-parser";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";

function MainQuestion() {
  const [questionData, setQuestionData] = useState();
  const [answer, setAnswer] = useState("");
  const user = useSelector(selectUser);

  let search = window.location.search;
  const params = new URLSearchParams(search);
  const id = params.get("q");

  useEffect(() => {
    async function getQuestionDetails() {
      await axios
        .get(`/api/question/${id}`)
        .then((res) => {
          console.log("data: ", res.data);
          setQuestionData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    getQuestionDetails();
  }, [id]);

  async function getUpdatedAnswer() {
    //to get latest posted answer on the screen
    await axios
      .get(`/api/question/${id}`)
      .then((res) => {
        console.log("data: ", res.data);
        setQuestionData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleQuill = (value) => {
    setAnswer(value);
  };

  const handleSubmit = async () => {
    if (answer !== "") {
      const body = {
        question_id: id,
        answer: answer,
        user: user,
      };
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      await axios
        .post("/api/answer", body, config)
        .then((res) => {
          console.log(res.data);
          alert("Answer posted successfully");
          setAnswer("");
          getUpdatedAnswer();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className="main">
      <div className="main-container">
        <div className="main-top">
          <h2 className="main-question">{questionData?.title}</h2>
          <Link to="/add-question">
            <button>Add Question</button>
          </Link>
        </div>
        <div className="main-desc">
          <div className="info">
            <p>Asked {new Date(questionData?.created_at).toLocaleString()}</p>
            <p>Viewed 10 times</p>
          </div>
        </div>
        <div className="all-questions">
          <div className="all-questions-container">
            <div className="all-questions-left">
              <div className="all-options">
                <p className="arrow">▲</p>
                <p className="arrow">0</p>
                <p className="arrow">▼</p>
                <BookmarkBorderOutlinedIcon />
                <HistoryOutlinedIcon />
              </div>
            </div>
            <div className="question-answer">
              <div className="content-wrapper">{parse(questionData?.body)}</div>
              <div className="author">
                <small>
                  asked {new Date(questionData?.created_at).toLocaleString()}
                </small>
                <div className="auth-details">
                  <Avatar />
                  <p>
                    {questionData?.user?.email
                      ? (questionData?.user?.email).split("@")[0]
                      : "Anonymous"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <h4 style={{ fontWeight: "normal" }}>
          {questionData?.answerDetails?.length} Answer(s)
        </h4>
        {questionData?.answerDetails?.map((_q) => (
          <div className="all-questions">
            <div key={_q?._id} className="all-questions-container">
              <div className="all-questions-left">
                <div className="all-options">
                  <p className="arrow">▲</p>
                  <p className="arrow">0</p>
                  <p className="arrow">▼</p>
                  <BookmarkBorderOutlinedIcon />
                  <HistoryOutlinedIcon />
                </div>
              </div>
              <div className="question-answer">
                <div className="content-wrapper">{parse(_q?.answer)}</div>
                <div className="author">
                  <small>
                    answered {new Date(_q?.created_at).toLocaleString()}
                  </small>
                  <div className="auth-details">
                    <Avatar />
                    <p>
                      {_q?.user?.email
                        ? (_q?.user?.email).split("@")[0]
                        : "Anonymous"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="main-answer">
        <h3>Your Answer</h3>
        <ReactQuill
          value={answer}
          onChange={handleQuill}
          className="react-quill"
          theme="snow"
          style={{ height: "200px", marginBottom: "4rem" }}
        />
        <button type="submit" onClick={handleSubmit}>
          Post Your Answer
        </button>
      </div>
    </div>
  );
}

export default MainQuestion;
