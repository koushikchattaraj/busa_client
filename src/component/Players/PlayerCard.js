import React, { useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./PlayerCard.css";
import { toPng } from "html-to-image";

const PlayerCard = ({ player }) => {
  const data = player;

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

  // const formatDate = (dateString) => {
  //   const date = new Date(dateString);
  //   const day = String(date.getDate()).padStart(2, "0");
  //   const month = String(date.getMonth() + 1).padStart(2, "0");
  //   const year = date.getFullYear();
  //   return `${day}-${month}-${year}`;
  // };

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
    // <div onClick={downloadImage} style={{ cursor: "pointer" }}>
    <div className="player-card" ref={cardRef}>
      {age < 21 && <div className="under-21-label-circle">Under 21</div>}
      <div className="playerId">{data.playerId}</div>
      <div className="card-image">
        <img src={data.photo} alt={`${data.playerName}'s Profile`} />
      </div>
      <div className="card-details" style={{ color: "white" }}>
        <h2 style={{ color: "white" }}>{data.playerName}</h2>
        <p className="nickname" style={{ color: "white" }}>
          Nickname: {data.playerNickName}
        </p>
        <p style={{ color: "white" }}>
          <strong>District:</strong> {data.district}
        </p>
        <p style={{ color: "white" }}>
          <strong>Player Type:</strong> {data.playerType}
        </p>
      </div>
    </div>
    // </div>
  );
};

export default PlayerCard;
