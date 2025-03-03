import React from "react";
import cardBackground from "../../../assets/images/cardBackground.jpg";
import "./AuctionCard.css";
import { convertToTitleCase, formatPlayerType } from "../../../util/util";

const AuctionCard = ({
  playerName,
  playerId,
  nickname,
  district,
  address,
  playerType,
  battingArm,
  bowlingArm,
  image,
}) => {

  function isBatsman(playerType) {
    return playerType.toLowerCase().includes("batsman");
  }

  function isBowler(playerType) {
    return playerType.toLowerCase().includes("bowler");
  }

  function isAllRounder(playerType) {
    return playerType.toLowerCase().includes("allrounder");
  }

  return (
    <div 
      className="auction-card" 
      style={{
        backgroundImage: `url(${cardBackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Player ID in the top right corner */}
      
      
      <div className="auction-card-container">
        {/* Left Side - Player Image */}
        <div className="player-image-container">
          <div className="player-image-border">
            <img src={image} alt="player" className="player-image" />
          </div>
        </div>

        {/* Right Side - Player Info */}
        <div className="player-info">
          <p className="player-id">{playerId}</p>
          <h1 className="player-name">{playerName.toUpperCase()}</h1>
          <h2 className="player-nickname">{convertToTitleCase(nickname)}</h2>
          <p className="player-district">{convertToTitleCase(address)} || {convertToTitleCase(district)}</p>
          <p className="player-stats">{formatPlayerType(playerType)}</p>

          {isAllRounder(playerType) && (
            <div>
                <p className="player-stats">{convertToTitleCase(battingArm)} Batting</p>
                <p className="player-stats">{convertToTitleCase(bowlingArm)} Bowling</p>
            </div>
          )}

          {isBatsman(playerType) && (
              <p className="player-stats">{convertToTitleCase(battingArm)} Batting</p>
          )}
          {isBowler(playerType) && (
              <p className="player-stats">{convertToTitleCase(bowlingArm)} Bowling</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuctionCard;
