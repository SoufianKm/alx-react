import React from "react";
import Login from "../Login/Login";
import Footer from "../Footer/Footer";
import "./App.css";
import Notifications from "../Notifications/Notifications";
import Header from "../Header/Header";

function App() {
  return (
    <React.Fragment>
      <Notifications />
      <div className="App">
        <div className="App-header">
          <Header />
        </div>
        <div className="App-body">
          <Login />
        </div>
        <div className="App-footer">
          <Footer />
        </div>
      </div>
    </React.Fragment>
  );
}

export default App;
