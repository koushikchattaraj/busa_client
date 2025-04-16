import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Form, Button, Col, Row, Container } from "react-bootstrap";
import { getAllPlayers, getPlayerById } from "../../../services/services";
import { UpdatePlayer } from "./UpdatePlayer";
import Loader from "../../Loader/Loader";
import { allPlayerDataResponse } from "../../../assets/data/allPlayerDataResponse";

export const GetPlayer = () => {
  const [allPlayerDataResponse, setAllPlayerDataResponse] = useState({});
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [apiStatus, setApiStatus] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [aadhar, setAadhar] = useState("");
  const [dob, setDob] = useState("");
  const [message, setMessage] = useState("");
  const [playerData, setPlayerData] = useState({});

  const handleLogin = (e) => {
    e.preventDefault();

    try {
      // Basic validation
      if (aadhar.length !== 12 || isNaN(aadhar)) {
        alert("Please enter a valid 12-digit Aadhar ID.");
        return;
      }

      const playerData = allPlayerDataResponse?.data?.find(
        (item) => item?.aadharId.replace(/\s+/g, "") == aadhar
      );
      const normalizeAadhar = (aadhar) => aadhar.replace(/\s+/g, "");
      const extractDate = (dobObj) => {
        const iso = typeof dobObj === "string" ? dobObj : dobObj?.$date;
        return iso?.split("T")[0];
      };
      const inputAadhar = normalizeAadhar(aadhar);
      const storedAadhar = normalizeAadhar(playerData.aadharId);
      const storedDob = extractDate(playerData.dob);
      const isAadharMatch = inputAadhar === storedAadhar;
      const isDobMatch = dob === storedDob;

      if (isAadharMatch && isDobMatch) {
        setPlayerData(playerData);
        setIsAuthenticated(true);
        setMessage(`Welcome, ${playerData.playerName}! ✅`);
        function generateToken() {
          return process.env.REACT_APP_AUTH_PLAYER_TOKEN;
        }
        localStorage.setItem("authPlayerToken", generateToken());
      } else {
        setMessage("❌ Invalid Aadhar ID or Date of Birth.");
      }
    } catch (error) {
      setMessage(
        "❌ Invalid Aadhar ID or Date of Birth. Still need help? Call at +91 6294959483"
      );
    }
  };

  const handleFetch = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getAllPlayers();
      setAllPlayerDataResponse(data);
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

  return (
    <div>
      <>
        {isLoading && <Loader />}
        {!isLoading && apiStatus === "success" && (
          <>
            {isAuthenticated ? (
              <UpdatePlayer player={playerData} />
            ) : (
              <div className="container d-flex align-items-center justify-content-center min-vh-100">
                <div
                  className="card shadow-lg p-4"
                  style={{ width: "100%", maxWidth: "400px" }}
                >
                  <h3 className="text-center mb-4">Login with Aadhar</h3>
                  <form onSubmit={handleLogin}>
                    <div className="mb-3">
                      <label htmlFor="aadhar" className="form-label">
                        Aadhar ID
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="aadhar"
                        maxLength="12"
                        value={aadhar}
                        onChange={(e) => setAadhar(e.target.value)}
                        required
                        placeholder="Enter 12-digit Aadhar ID"
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="dob" className="form-label">
                        Date of Birth
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        id="dob"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                        required
                      />
                    </div>

                    <button type="submit" className="btn btn-primary w-100">
                      Login
                    </button>
                  </form>
                  {message && (
                    <div
                      className={`mt-3 text-center ${
                        message.includes("Welcome")
                          ? "text-success"
                          : "text-danger"
                      }`}
                    >
                      {message}
                    </div>
                  )}
                </div>
              </div>
            )}
          </>
        )}
        {playerData.length === 0 && apiStatus === "success" && (
          <div className="text-center mt-5">
            <h1>No Players Found</h1>
          </div>
        )}
      </>
    </div>
  );
};
