import React from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { TagsInput } from "react-tag-input-component";
import { useState } from "react";
import "./Question.css";
import Sidebar from "../StackOverflow/Sidebar";
import Header from "../Header/Header";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import axios from "axios";

function Question() {
  const user = useSelector(selectUser);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);

  const navigate = useNavigate();

  const handleQuill = (value) => {
    setBody(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title !== "" && body !== "" && tags.length !== 0) {
      const bodyJSON = {
        title: title,
        body: body,
        tags: JSON.stringify(tags),
        user: user,
      };
      await axios
        .post("/api/question", bodyJSON)
        .then((res) => {
          alert("Question added successfully");
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <Header />
      <div style={{ display: "flex", flexDirection: "row" }}>
        <Sidebar />
        <div className="add-question">
          <div className="add-question-container">
            <div className="head-title">
              <h1>Ask a public question</h1>
            </div>
            <div className="question-container">
              <div className="question-options">
                <div className="question-option">
                  <div className="title">
                    <h3>Title</h3>
                    <small>
                      Be specific and imagine you’re asking a question to
                      another person.
                    </small>
                    <input
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      type="text"
                      placeholder="Add question title"
                    />
                  </div>
                </div>
                <div className="question-option">
                  <div className="title">
                    <h3>Body</h3>
                    <small>
                      Introduce the problem and expand on what you put in the
                      title. Minimum 20 characters.
                    </small>
                    <ReactQuill
                      value={body}
                      onChange={handleQuill}
                      className="react-quill"
                      theme="snow"
                    />
                  </div>
                </div>
                <div className="question-option">
                  <div className="title">
                    <h3>Tags</h3>
                    <small>
                      Add up to 5 tags to describe what your question is about.
                      Start typing to see suggestions.
                    </small>
                    <TagsInput
                      value={tags}
                      onChange={setTags}
                      name="tags"
                      placeHolder="Press Enter to add a new tag"
                    />
                  </div>
                </div>
              </div>
            </div>
            <button type="submit" onClick={handleSubmit}>
              Add your question
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Question;
