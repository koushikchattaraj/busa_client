import React, { useState } from "react";
import AuctionCard from "./AuctionCard/AuctionCard";
import { allPlayerDataResponse } from "../../assets/data/allPlayerDataResponse";
import FullscreenModal from "../FullscreenModal/FullscreenModal";

export const AuctionTab = () => {
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
    <div className="playerBody" style={{ height: "100vh" }}>
      <div className="container p-3">
        <div className="input-group mb-3">
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
        <div className="text-center mt-5">
          <div className="flex" style={{ justifyContent: "center" }}>
            <h1>Welcome To Lal Matir Cricket League</h1>
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
