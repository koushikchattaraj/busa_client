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
          <>
            <h3 className="text-center color-white">
              Auction Date : 2nd March 2025 || Chhatna Auditorium
            </h3>
            <div className="buttonbox">
              <button
                class="button-85"
                onClick={() => {
                  navigate("/view_players");
                }}
              >
                View Registred Players
              </button>
            </div>
          </>
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
              Registration window will close by 25th February 2025 7:00 PM
            </h3>
            test
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
