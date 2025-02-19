import React, { useEffect } from "react";
import FormBox from "./component/FormBox/formBox";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Players from "./component/Players/Players";
import Home from "./component/Home/Home";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./component/Login/Login";
import { PlayerDetails } from "./component/PlayerDetails/PlayerDetails";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./component/Navbar/Navbar";
import { useFeatureFlags } from "./util/util";
import { Teams } from "./component/Teams/Teams";
import { About } from "./component/About/About";
import { Contact } from "./component/Contact/Contact";
import { PlayerVerification } from "./component/PlayerVerification/PlayerVerification";
import { ViewPlayers } from "./component/ViewPlayers/ViewPlayers";

function App() {

  const featureFlags = useFeatureFlags();
  const useIsFeatureEnabled = (featureKey) => {
    if (featureFlags && featureFlags[featureKey.toLowerCase()]) {
      return featureFlags[featureKey.toLowerCase()].enabled;
    }
    return null;
  };

  const isPlayerRegistrationFeatureEnabled = useIsFeatureEnabled(
    "PLAYER_REGISTRATION"
  );
  const isPlayerVerificationFeatureEnabled = useIsFeatureEnabled(
    "PLAYER_VERIFICATION"
  );
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
            <Route path="/view_players" element={<ViewPlayers />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
