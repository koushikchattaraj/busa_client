import React, { useCallback, useEffect, useState } from "react";
import "./PlayerDetails.css";
import koushikImg from "../../assets/images/koushik.jpeg";
import Loader from "../Loader/Loader";
import { getPlayerById } from "../../services/services";
import { useParams } from "react-router-dom";

export const PlayerDetails = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [playerDetails, setPlayerDetails] = useState({});
  const [apiStatus, setApiStatus] = useState("");
  const [playerId, setPlayerId] = useState("");

  const { id: idFromParams } = useParams();

  const getPlayerDetails = useCallback(async (id) => {
    setIsLoading(true);
    try {
      const res = await getPlayerById(id);
      setTimeout(() => {
        setPlayerDetails(res.data);
        setApiStatus("success");
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      setTimeout(() => {
        setApiStatus("error");
        setIsLoading(false);
      }, 1000);
    }
  }, []);

  useEffect(() => {
    console.log(playerDetails);
  }, [playerDetails]);

  useEffect(() => {
    if (idFromParams) {
      setPlayerId(idFromParams);
    }
  }, [idFromParams]);

  useEffect(() => {
    if (playerId) {
      getPlayerDetails(playerId);
    }
  }, [getPlayerDetails, playerId]);

  return (
    <div className="PlayerDetailsBody">
      <div>
        <div class="starsec"></div>
        <div class="starthird"></div>
        <div class="starfourth"></div>
        <div class="starfifth"></div>
      </div>
      {isLoading && <Loader />}
      {!isLoading && apiStatus === "success" && (
        <div className="PlayerDetailscontainer">
          <div className="PlayerDetailscontainerBox">
            <div className="PlayerDetailsleft-side">
              <img
                src={koushikImg}
                alt="playerphoto"
                className="PlayerDetailsphoto"
              />
            </div>
            <div className="PlayerDetailsright-side">
              <div class="typography-container">
                <h1
                  class="typographyText nickName"
                  data-default-gradient="linear-gradient(90deg, #ff1493, #8a2be2, #ff8c00, #00c8ff)"
                >
                  Koushik
                </h1>
                <p className="typographyText fullName">Koushik Chattaraj</p>
                <p className="typographyText address">Jagadalla</p>
                <p className="typographyText playerskill">All Rounder</p>
                <p className="typographyText playerskill">Left Arm Batsman</p>
                <p className="typographyText playerskill">Right Arm Bowler</p>
                <p className="typographyText playerskill">Wicket Keeper</p>
                <p className="typographyText playerskill">
                  Base Price : ₹ 1000
                </p>
              </div>
            </div>
            <div className="playerNumberBox">
              <div class="fancy-shadow-card">
                <span class="card-title">1001</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {!isLoading && apiStatus === "error" && (
        <div className="noResultBox">
          <h1
            class="typographyText nickName"
            data-default-gradient="linear-gradient(90deg, #ff1493, #8a2be2, #ff8c00, #00c8ff)"
          >
            No Player Found
          </h1>
        </div>
      )}
    </div>
  );
};
