import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const PlayerCard = ({ player }) => {
  const playerData = player;

  return (
    <div className="card mx-auto mt-4" style={{ width: "24rem" }}>
      <div className="card-header text-center bg-primary text-white">
        <h4>{playerData.playerName}</h4>
        <p className="mb-0">{playerData.playerNickName}</p>
      </div>
      <div className="card-body">
        <div className="text-center mb-3">
          <img
            src={playerData.photo || "https://via.placeholder.com/150"}
            alt="Player Photo"
            className="rounded-circle img-fluid"
            style={{ width: "100px", height: "100px" }}
          />
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <strong>DOB:</strong> {playerData.dob}
          </li>
          <li className="list-group-item">
            <strong>Height:</strong> {playerData.height}
          </li>
          <li className="list-group-item">
            <strong>Weight:</strong> {playerData.weight} kg
          </li>
          <li className="list-group-item">
            <strong>T-Shirt Size:</strong> {playerData.tShirtSize}
          </li>
          <li className="list-group-item">
            <strong>Mobile:</strong> {playerData.mobile}
          </li>
          <li className="list-group-item">
            <strong>Aadhar ID:</strong> {playerData.aadharId}
          </li>
          <li className="list-group-item">
            <strong>Address:</strong> {playerData.address},{" "}
            {playerData.district}, {playerData.state} - {playerData.pinCode}
          </li>
          <li className="list-group-item">
            <strong>Player Type:</strong> {playerData.playerType}
          </li>
          <li className="list-group-item">
            <strong>Batting Arm:</strong> {playerData.battingArm}
          </li>
          <li className="list-group-item">
            <strong>Bowling Arm:</strong> {playerData.bowlingArm} (
            {playerData.bowlingPace})
          </li>
          <li className="list-group-item">
            <strong>Wicket Keeper:</strong> {playerData.wicketKeeper}
          </li>
          <li className="list-group-item">
            <strong>Preferred Jersey Number:</strong>{" "}
            {playerData.preferredJerseyNumber}
          </li>
          <li className="list-group-item">
            <strong>Preferred Jersey Name:</strong>{" "}
            {playerData.preferredJerseyName}
          </li>
          <li className="list-group-item">
            <strong>League:</strong> {playerData.league}
          </li>
          <li className="list-group-item">
            <strong>Season:</strong> {playerData.season} ({playerData.year})
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PlayerCard;
