import React, { useEffect, useState } from "react";
import { allPlayerDataResponse } from "../../assets/data/allPlayerDataResponse";
import FullscreenModal from "../FullscreenModal/FullscreenModal";
import mpcup from "../../assets/images/mpcup.png";

export const AuctionTab = () => {
  const handleFullscreen = () => {
    const elem = document.documentElement;

    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen(); // Safari
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen(); // Firefox
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen(); // IE/Edge
    }
  };
  const [searchText, setSearchText] = useState("");
  const [player, setPlayer] = useState({});
  const [showModal, setShowModal] = useState(false);

  const handleSearch = () => {
    const filteredPlayers = allPlayerDataResponse?.data?.filter(
      (player) => player?.playerId == searchText?.toLowerCase()
    );
    setPlayer(filteredPlayers[0]);
    setShowModal(true);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="playerBody" style={{ height: "92vh" }}>
      <div>
        <div class="starsec"></div>
        <div class="starthird"></div>
        <div class="starfourth"></div>
        <div class="starfifth"></div>
      </div>
      <div className="container p-3">
        <div className="text-center mt-5">
          <div
            className="d-flex flex-column"
            style={{
              justifyContent: "center",
              justifySelf: "center",
              alignItems: "center",
              width: "50rem",
              gap: "1rem",
            }}
          >
            <img
              src={mpcup}
              alt="MPCup"
              style={{ width: "400px", height: "400px" }}
              onClick={handleFullscreen}
            />
            <h1>Welcome To Bankura MP Cup 2025</h1>
            <h3>Mega Auction</h3>
            <div className="input-group mt-3" style={{ width: "100%" }}>
              <input
                type="text"
                className="form-control"
                placeholder="Search..."
                aria-label="Search"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <button
                className="btn btn-primary"
                type="button"
                onClick={handleSearch}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <>
          {player?.playerName?.length > 0 && (
            <FullscreenModal
              show={showModal}
              handleClose={() => setShowModal(false)}
              player={player}
            />
          )}
        </>
      </div>
    </div>
  );
};
