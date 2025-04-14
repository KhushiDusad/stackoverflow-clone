import React, { useEffect, useState } from "react";
import Main from "./Main";
import "./css/index.css";
import Sidebar from "./Sidebar";
import Header from "../Header/Header";
import axios from 'axios';

function Index() {
  const [questions, setQuestions] =useState([])

  useEffect(()=>{
    async function getQuestion() {
      await axios.get('/api/question').then((res)=>{
      console.log(res.data)
      setQuestions(res.data.reverse())
    }).catch((error)=>{
      console.log(error)
    })
    }
    getQuestion()
  },[])

  return (
    <div className="stack-index">
    <Header/>
      <div className="stack-index-content">
        <Sidebar />
        <Main questions= {questions} />
      </div>
    </div>
  );
}

export default Index;
