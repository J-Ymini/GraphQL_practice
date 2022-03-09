import React from "react";
import logo from "src/logo.svg";
import "src/styles/App.css";
import CreateLink from "./CreateLink";
import LinkList from "./LinkList";

function App() {
  return (
    <div className="App">
      <LinkList />
      <CreateLink />
    </div>
  );
}

export default App;
