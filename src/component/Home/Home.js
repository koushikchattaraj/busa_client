import React from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import isAuthenticated from "../../auth";

const Home = () => {
  const isAuthenticatedUser = isAuthenticated();
  const [playerId, setPlayerId] = React.useState("");
  const navigate = useNavigate();
  return (
    <div>
      <div className="PlayerDetailsBody">
        <div className="loginBox">
          {!isAuthenticatedUser && (
            <button
              class="button-90"
              onClick={() => {
                navigate("/login");
              }}
            >
              Login
            </button>
          )}
          {isAuthenticatedUser && (
            <div className="userButtonBox">
              <button
                class="button-90"
                onClick={() => {
                  navigate("/players");
                }}
              >
                Players
              </button>
              <div className="form-group" style={{ margin: 0 }}>
                <input
                  placeholder="Player Id"
                  name="playerId"
                  value={playerId}
                  onChange={(e) => setPlayerId(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault(); // Only prevent default behavior for "Enter"
                      navigate(`/players_details/${playerId}`);
                    }
                  }}
                  required
                />
              </div>
              <button
                class="button-90"
                onClick={() => {
                  navigate(`/players_details/${playerId}`);
                }}
                disabled={!playerId}
              >
                Search Players Details
              </button>
            </div>
          )}
        </div>
        <div>
          <div class="starsec"></div>
          <div class="starthird"></div>
          <div class="starfourth"></div>
          <div class="starfifth"></div>
        </div>
        <div className="buttonbox">
          <button
            class="button-85"
            onClick={() => {
              navigate("/player_registration");
            }}
          >
            Player Registration
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
