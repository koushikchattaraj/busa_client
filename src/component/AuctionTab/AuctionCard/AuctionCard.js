import React from "react";
import cardBackground from "../../../assets/images/cardBackground.jpg";
import { convertToTitleCase } from "../../../util/util";
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
  dob,
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
  return (
    <div
      className="card position-relative"
      style={{
        backgroundImage: `url(${cardBackground})`,
        backgroundSize: "contain", // Ensures the entire image is visible
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        width: "100%",
        borderRadius: "15px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "#fff",
      }}
    >
      <div className="d-flex flex-column flex-md-row justify-content-center align-items-center w-100 p-3">
        <img
          className="img-fluid rounded-circle mb-3 mb-md-0 me-md-4"
          src={image}
          alt="player"
          loading="lazy"
          style={{
            width: "clamp(120px, 80vw, 700px)",
            height: "clamp(120px, 80vw, 700px)",
            objectFit: "contain",
            border: "4px solid #fff",
          }}
        />
        <div className="text-center text-md-start">
          <p
            style={{ fontSize: "clamp(1rem, 3vw, 1.5rem)", fontWeight: "bold" }}
          >
            {playerId}
          </p>
          <h1
            className="mb-3"
            style={{
              fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
              fontWeight: "bold",
            }}
          >
            <div
              className="d-flex justify-content-center justify-content-md-start align-items-center"
              style={{ gap: "1.5rem" }}
            >
              {convertToTitleCase(playerName)}
              {age < 21 && (
                <div
                  className="badge bg-warning text-dark"
                  style={{ fontSize: "clamp(0.8rem, 2vw, 1.2rem)" }}
                >
                  Under 21
                </div>
              )}
            </div>
          </h1>
          <p className="mb-2" style={{ fontSize: "clamp(1rem, 3vw, 1.8rem)" }}>
            {convertToTitleCase(nickname)}
          </p>
          <p className="mb-2" style={{ fontSize: "clamp(1rem, 3vw, 1.8rem)" }}>
            {convertToTitleCase(district)}
          </p>
          <p className="mb-2" style={{ fontSize: "clamp(1rem, 3vw, 1.8rem)" }}>
            {convertToTitleCase(playerType)}
          </p>
          <p className="mb-2" style={{ fontSize: "clamp(1rem, 3vw, 1.8rem)" }}>
            Batting - {convertToTitleCase(battingArm)}
          </p>
          <p className="mb-2" style={{ fontSize: "clamp(1rem, 3vw, 1.8rem)" }}>
            Bowling - {convertToTitleCase(bowlingArm)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuctionCard;
