import React from "react";
import cardBackground from "../../../assets/images/cardBackground.jpg";
import "./AuctionCard.css";
import { convertToTitleCase, formatPlayerType } from "../../../util/util";
import mpcup from "../../../assets/images/mpcup.png";

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
  dob,
  wicketkeepr,
  bowlingType,
}) => {
  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  const age = calculateAge(dob);

  function isBatsman(playerType) {
    return playerType.toLowerCase().includes("batsman");
  }

  function isBowler(playerType) {
    return playerType.toLowerCase().includes("bowler");
  }

  function isAllRounder(playerType) {
    return playerType.toLowerCase().includes("allrounder");
  }

  function bowlingVarient(bowlingType) {
    if (bowlingType === "legSpin") {
      return "leg - spiner";
    } else if (bowlingType === "offSpin") {
      return "off - spiner";
    } else if (bowlingType === "pace") {
      return "fast bowler";
    } else return "fast bowler";
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
      <img src={mpcup} alt="MP Cup Logo" className="mpcuplogo" />
      <p className="player-id">{playerId}</p>

      <div className="auction-card-container">
        {/* Player Image Section */}
        <div className="player-image-container">
          <div className="player-image-border">
            <img src={image} alt="Player" className="player-image" />
          </div>
        </div>

        {/* Player Info Section */}
        <div className="player-info">
          <div className="d-flex flex-column align-items-center">
            {age < 19 && <div className="under-19-circle">Under 19</div>}
            <div className="typewriter-container">
              <div className="player-name typewriter">{playerName}</div>
            </div>
          </div>

          <div className="player-info-details">
            <p className="player-district">
              {convertToTitleCase(address)} || {convertToTitleCase(district)}
            </p>
            <p className="player-stats">{formatPlayerType(playerType)}</p>

            {isAllRounder(playerType) && (
              <>
                <p className="player-stats">
                  {convertToTitleCase(battingArm)} - handed batsman
                </p>
                <p className="player-stats">
                  {convertToTitleCase(bowlingArm)} - arm {""}
                  {bowlingVarient(bowlingType)}
                </p>
              </>
            )}

            {!isAllRounder(playerType) && isBatsman(playerType) && (
              <p className="player-stats">
                {convertToTitleCase(battingArm)} - handed batsman
              </p>
            )}

            {!isAllRounder(playerType) && isBowler(playerType) && (
              <p className="player-stats">
                {convertToTitleCase(bowlingArm)} - arm
                {bowlingVarient(bowlingType)}
              </p>
            )}

            {wicketkeepr && <p className="player-stats">Wicket Keeper</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuctionCard;
