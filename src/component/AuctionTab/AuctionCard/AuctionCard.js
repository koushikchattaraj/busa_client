import React from "react";
import cardBackground from "../../../assets/images/cardBackground.jpg";
import "./AuctionCard.css";

const AuctionCard = ({
  playerName,
  playerId,
  nickname,
  district,
  playerType,
  battingArm,
  bowlingArm,
  image,
}) => {
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
      <div className="player-id">{playerId}</div>
      
      <div className="auction-card-container">
        {/* Left Side - Player Image */}
        <div className="player-image-container">
          <div className="player-image-border">
            <img src={image} alt="player" className="player-image" />
          </div>
        </div>

        {/* Right Side - Player Info */}
        <div className="player-info">
          <h1 className="player-name">{playerName.toUpperCase()}</h1>
          <h2 className="player-nickname">{nickname}</h2>
          <p className="player-district">{district}</p>
          <h3 className="player-type">{playerType.toUpperCase()}</h3>
          <p className="player-stats">Batting - {battingArm}</p>
          <p className="player-stats">Bowling - {bowlingArm}</p>
        </div>
      </div>
    </div>
  );
};

export default AuctionCard;
