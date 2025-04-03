import React from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import mpcup from "../../assets/images/mpcup.png";

const Home = ({
  isPlayerRegistrationFeatureEnabled,
  isViewPlayersFeatureEnabled,
}) => {
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
            src={mpcup}
            alt="Profile Preview"
            style={{
              width: "300px",
              height: "300px",
              objectFit: "cover",
              borderRadius: "50%",
            }}
          />
        </div>
        <h1 className="text-center color-white mx-3 my-0">
          Bankura MP Cup 2025
        </h1>
        <span className="text-center color-white mx-3 my-0">
          Management & Cooperation By: District Sports Association Bankura
        </span>
        <span className="text-center color-white mx-3 my-0">
          Player Registration Period : 5th April 2025 - 15th April 2025
        </span>
        {/* <span className="text-center color-white">
          Organized by: District Sports Association Bankura
        </span>
        <span className="text-center color-white mb-3">
          In Association with: Bankura United Sports Association
        </span> */}
        {isViewPlayersFeatureEnabled && (
          <>
            <h3 className="text-center color-white mx-3 my-0">
              Auction Date : 19th April 2025
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
            <h3 className="text-center color-white mt-2 mx-3 my-0">
              Registration window will close by 17th April 2025 7:00 PM
            </h3>
            test
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
