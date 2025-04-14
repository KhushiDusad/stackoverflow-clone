import React from "react";
import MainQuestion from './MainQuestion'
import Sidebar from "../StackOverflow/Sidebar";
import Header from "../Header/Header";

function index() {
  return (
      <div style={{width:"100%"}}>
      <Header/>
        <div className="stack-index-content">
          <Sidebar />
          <MainQuestion />
        </div>
      </div>
  );
}

export default index;