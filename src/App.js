import React from "react";
import FormBox from "./component/FormBox/formBox";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Players from "./component/Players/Players";
import Home from "./component/Home/Home";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./component/Login/Login";

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/player_registration" element={<FormBox />} />
            <Route
              path="/players"
              element={<ProtectedRoute element={<Players />} />}
            />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
