import React from "react";
import FormBox from "./component/FormBox/formBox";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Players from "./component/Players/Players";
import Home from "./component/Home/Home";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./component/Login/Login";
import { PlayerDetails } from "./component/PlayerDetails/PlayerDetails";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./component/Navbar/Navbar";
import { useIsFeatureEnabled } from "./util/util";
import { Teams } from "./component/Teams/Teams";
import { About } from "./component/About/About";
import { Contact } from "./component/Contact/Contact";
import { PlayerVerification } from "./component/PlayerVerification/PlayerVerification";

function App() {
  const isPlayerRegistrationFeatureEnabled = useIsFeatureEnabled(
    "PLAYER_REGISTRATION"
  );
  const isPlayerVerificationFeatureEnabled = false;
  return (
    <div className="App">
      <Router>
        <div>
          <Navbar />
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  isPlayerRegistrationFeatureEnabled={
                    isPlayerRegistrationFeatureEnabled
                  }
                />
              }
            />
            <Route path="/login" element={<Login />} />
            <Route
              path="/player_registration"
              element={
                <FormBox
                  isPlayerRegistrationFeatureEnabled={
                    isPlayerRegistrationFeatureEnabled
                  }
                />
              }
            />
            <Route
              path="/players"
              element={<ProtectedRoute element={<Players />} />}
            />
            <Route
              path="/players_details/:id"
              element={<ProtectedRoute element={<PlayerDetails />} />}
            />
            <Route
              path="/players_verification"
              element={
                <ProtectedRoute
                  element={
                    <PlayerVerification
                      isPlayerVerificationFeatureEnabled={
                        isPlayerVerificationFeatureEnabled
                      }
                    />
                  }
                />
              }
            />
            <Route path="/teams" element={<Teams />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
