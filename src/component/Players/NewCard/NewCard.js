import React from "react";
import cardBackground from "../../../assets/images/cardBackground.jpg";
import "./NewCard.css";
import { convertToTitleCase } from "../../../util/util";

const NewCard = ({
  playerName,
  playerId,
  nickname,
  district,
  playerType,
  battingArm,
  bowlingArm,
  image,
  dob,
}) => {
  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date('2025-01-01');
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
  return (
    <div style={{ position: "relative" }}>
      <img className="cardBackgroundImg" src={cardBackground} alt="player" />
      <img className="cardTextPlayerImage" src={image} alt="player" />
      <p className="cardTextPlayerId cardFontView">{playerId}</p>
      <div className="cardTextContainar">
        <h1 className="cardTextName cardFontNameView">
          <div className="d-flex" style={{ gap: "1rem" }}>
            {convertToTitleCase(playerName)}
            <div className="cardFontView">
              {age < 21 && <div className="cardTextU21Circle ">Under 21</div>}
            </div>
          </div>
        </h1>
        <p className="cardTextNickName cardFontView">
          {convertToTitleCase(nickname)}
        </p>
        <p className="cardTextDistrict cardFontView">
          {convertToTitleCase(district)}
        </p>
        <p className="cardTextPlayerType cardFontView">
          {convertToTitleCase(playerType)}
        </p>
        <p className="cardTextBattingArm cardFontView">
          Batting - {convertToTitleCase(battingArm)}
        </p>
        <p className="cardTextBowlingArm cardFontView">
          Bowling - {convertToTitleCase(bowlingArm)}
        </p>
      </div>
    </div>
  );
};

export default NewCard;
