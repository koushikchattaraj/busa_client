import React, { useCallback, useEffect, useState } from "react";
import { getAllPlayers, verifiedPayment } from "../../services/services";
import Loader from "../Loader/Loader";

export const PlayerVerification = ({ isPlayerVerificationFeatureEnabled }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [players, setPlayers] = useState([]);
  const [apiStatus, setApiStatus] = useState("");

  const handleVerify = async (status, playerData) => {
    const userData = {
      playerId: playerData.playerId,
      league: playerData.tournaments[0].league,
      season: playerData.tournaments[0].season,
      paymentVerified: status === "verify" ? true : false,
    };
    try {
      await verifiedPayment(userData);
      setPlayers((prevPlayers) =>
        prevPlayers.filter((player) => player.playerId !== playerData.playerId)
      );
    } catch (error) {
      console.log(error);
    }
    console.log(userData);
  };

  function filterUnverifiedPayments(players) {
    return players.filter((player) =>
      player.tournaments.some((tournament) => !tournament.paymentVerified)
    );
  }

  const handleFetch = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getAllPlayers();
      setPlayers(filterUnverifiedPayments(data.data));
      setApiStatus("success");
      setIsLoading(false);
    } catch (error) {
      setApiStatus("error");
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    handleFetch();
  }, [handleFetch]);

  const players_card = (playerData) => {
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
    };
    return (
      <div className="card mx-auto mt-4" style={{ maxWidth: "1400px" }}>
        <div className="card-header text-center bg-primary text-white">
          <h1>{playerData.playerName}</h1>
          <p className="mb-0">{playerData.playerNickName}</p>
        </div>
        <div className="card-body">
          <div className="row mb-4">
            {/* Photos Row-wise */}
            <div className="col-12">
              <div className="row text-center">
                <div className="col-md-6 mb-4">
                  <h3>Player Photo</h3>
                  <img
                    src={playerData.photo || "https://via.placeholder.com/300"}
                    alt="Player Photo"
                    className="rounded img-fluid"
                    style={{
                      objectFit: "contain",
                      width: "100%",
                      maxWidth: "500px",
                      height: "350px",
                    }}
                  />
                </div>
                <div className="col-md-6 mb-4">
                  <h3>Payment Proof</h3>
                  <img
                    src={
                      playerData.tournaments[0]?.uploadPaymentProof ||
                      "https://via.placeholder.com/300"
                    }
                    alt="Payment Proof"
                    className="rounded img-fluid"
                    style={{
                      objectFit: "contain",
                      width: "100%",
                      maxWidth: "500px",
                      height: "350px",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Player Details */}
          <div className="row">
            <div className="col-md-4">
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <strong>Date of Birth:</strong> {formatDate(playerData.dob)}
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
                  <strong>Season:</strong> {playerData.season} (
                  {playerData.year})
                </li>
              </ul>
            </div>
            <div className="col-md-4">
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <strong>Mobile:</strong> {playerData.mobile}
                </li>
                <li className="list-group-item">
                  <strong>Aadhar ID:</strong> {playerData.aadharId}
                </li>
                <li className="list-group-item">
                  <strong>Address:</strong> {playerData.address},{" "}
                  {playerData.district}, {playerData.state} -{" "}
                  {playerData.pinCode}
                </li>
                <li className="list-group-item">
                  <strong>Player Type:</strong> {playerData.playerType}
                </li>
              </ul>
            </div>
            <div className="col-md-4">
              <ul className="list-group list-group-flush">
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
                  <strong>League:</strong> {playerData.tournaments[0]?.league}
                </li>
              </ul>
            </div>
          </div>

          {/* Action Buttons */}
          {isPlayerVerificationFeatureEnabled && (
            <div className="d-flex justify-content-around mt-4">
              <button
                className="btn btn-lg btn-success"
                onClick={() => handleVerify("verify", playerData)}
              >
                Verify
              </button>
              <button
                className="btn btn-lg btn-danger"
                onClick={() => handleVerify("reject", playerData)}
              >
                Reject
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };
  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && apiStatus === "success" && (
        <>
          {players.map((player) => {
            return players_card(player);
          })}
        </>
      )}
      {players.length === 0 && apiStatus === "success" && (
        <div className="text-center mt-5">
          <h1>No Players Found to Verify</h1>
        </div>
      )}
    </>
  );
};
