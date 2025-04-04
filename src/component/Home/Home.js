import React from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import mpcup from "../../assets/images/mpcup.png";
import arupc from "../../assets/images/profileimage/arupc.png";
import poster from "../../assets/images/poster.png";

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
        <div className="d-flex flex-column align-items-center position-relative w-100">
          {/* Profile Image */}
          <div
            className="position-absolute"
            style={{
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -110%)",
              zIndex: 1, // Ensure it stays above the poster
            }}
          >
            <img
              src={arupc}
              alt="Profile Preview"
              className="img-fluid shadow justify-content-center align-items-center"
              style={{
                width: "26vw", // Responsive width based on viewport width
                maxWidth: "150px", // Ensures it doesn't get too big on desktops
                minWidth: "175px", // Ensures it doesn’t get too small on mobile
                height: "auto",
                objectFit: "cover",
              }}
            />
          </div>

          {/* Poster/Banner Image */}
          <div className="w-100 position-relative" style={{ zIndex: 2 }}>
            <img
              src={poster}
              alt="Banner"
              className="img-fluid w-100"
              style={{
                objectFit: "contain",
              }}
            />
          </div>
          <span className="text-center color-white mb-3">
            Powred By : SUHMOBHUMI PROJECT PVT LTD.
          </span>
          <span className="text-center color-white">
            Management & Cooperation By: Bankura District Sports Association
          </span>
        </div>

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
            <span className="text-center color-white mt-2 mx-3 my-0">
              Registration window will close by 15th April 2025 7:00 PM
            </span>
            test
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
