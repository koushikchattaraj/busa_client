import React from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import lalmati from "../../assets/images/lalmati.png";

const Home = ({ isPlayerRegistrationFeatureEnabled }) => {
  const navigate = useNavigate();

  return (
    <div>
      <div>
        <div class="starsec"></div>
        <div class="starthird"></div>
        <div class="starfourth"></div>
        <div class="starfifth"></div>
      </div>

      <div className="PlayerDetailsBody">
        <div className="text-center">
          <img
            src={lalmati}
            alt="Profile Preview"
            style={{
              width: "300px",
              height: "300px",
              objectFit: "cover",
              borderRadius: "50%",
            }}
          />
        </div>
        <h1 className="text-center color-white">
          Welcome to Lal Matir Cricket Leauge
        </h1>
        {!isPlayerRegistrationFeatureEnabled && (
          <h3 className="text-center color-white">
            Player Registration will start on 12th Janury 2025 10:00 AM
          </h3>
        )}
        {isPlayerRegistrationFeatureEnabled && (
          <>
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
            <h3 className="text-center color-white mt-2">
              Registration window will close by 31th Janury 2025 11:59 PM
            </h3>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
