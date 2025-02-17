import React, { useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./PlayerCard.css";
import { toPng } from "html-to-image";
import { convertToTitleCase, toProperCase } from "../../util/util";

const PlayerCard = ({ player }) => {
  const data = player;

  console.log(data, "------");

  const cardRef = useRef(null);

  const downloadImage = async () => {
    try {
      if (!cardRef.current) return;
      const dataUrl = await toPng(cardRef.current, { cacheBust: true });
      const link = document.createElement("a");
      link.download = `${data.playerName}-profile.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Error generating image:", err);
    }
  };

  function isAllRounder(playerType) {
    return playerType.toLowerCase().includes("allrounder");
  }

  function isBatsman(playerType) {
    return playerType.toLowerCase().includes("batsman");
  }

  function isBowler(playerType) {
    return playerType.toLowerCase().includes("bowler");
  }

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

  const age = calculateAge(data.dob);

  return (
    <div onClick={downloadImage} style={{ cursor: "pointer" }}>
      <div className="player-card" ref={cardRef}>
        {age < 21 && <div className="under-21-label-circle">Under 21</div>}
        <div className="playerId">{data.playerId}</div>
        <div className="card-image">
          <img src={data.photo} alt={`${data.playerName}'s Profile`} />
        </div>
        <div className="card-details" style={{ color: "white" }}>
          <h2 style={{ color: "white" }}>{toProperCase(data?.playerName)}</h2>
          <p className="nickname" style={{ color: "white" }}>
            {toProperCase(data?.playerNickName)}
          </p>
          <p style={{ color: "white" }}>
            <strong>
              {toProperCase(data?.address)} || {toProperCase(data?.district)}
            </strong>
          </p>
          <h4 style={{ color: "white" }}>
            <strong>{convertToTitleCase(data?.playerType)}</strong>
          </h4>
          {isAllRounder(data?.playerType) && (
            <div
              style={{ display: "flex", justifyContent: "center", gap: "5px" }}
            >
              <h4 style={{ color: "white", fontSize: "17px" }}>
                <strong>{convertToTitleCase(data?.battingArm)} Batting</strong>
              </h4>
              <h4 style={{ color: "white", fontSize: "17px" }}>
                <strong>{convertToTitleCase(data?.bowlingArm)} Bowling</strong>
              </h4>
            </div>
          )}
          {isBatsman(data?.playerType) && (
            <h4 style={{ color: "white", fontSize: "17px" }}>
              <strong>{convertToTitleCase(data?.battingArm)} Batting</strong>
            </h4>
          )}
          {isBowler(data?.playerType) && (
            <h4 style={{ color: "white", fontSize: "17px" }}>
              <strong>{convertToTitleCase(data?.bowlingArm)} Bowling</strong>
            </h4>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlayerCard;
