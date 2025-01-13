import React, { useCallback, useEffect, useState } from "react";
import { getAllPlayers } from "../../services/services";
import PlayerCard from "./PlayerCard";
import { FaDownload } from "react-icons/fa";
import * as XLSX from "xlsx";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

const Players = () => {
  const [isVerified, setIsVerified] = useState(false);

  const handleCheckboxChange = () => {
    setIsVerified((prevState) => !prevState);
    if (!isVerified) {
      setPlayers(filterUnverifiedPayments(registeredPlayers));
    } else {
      setPlayers(registeredPlayers);
    }
  };

  const [players, setPlayers] = useState([]);
  const [registeredPlayers, setRegisteredPlayers] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");


  const handlePlayersDownload = () => {
    // Define the columns you want to export and their corresponding header names
    const columns = [
      { key: "playerId", header: "Player Id" },
      { key: "playerName", header: "Player Name" },
      { key: "playerNickName", header: "Player Nick Name" },
      { key: "dob", header: "Date of Birth" },
      { key: "mobile", header: "Mobile No" },
      { key: "aadharId", header: "Aadhar Id" },
      { key: "district", header: "District" },
      { key: "playerType", header: "Player Type" },
      { key: "battingArm", header: "Batting Arm" },
      { key: "bowlingArm", header: "Bowling Arm" },
      { key: "bowlingPace", header: "Bowling Pace" },
      { key: "wicketKeeper", header: "Wicket Keeper" },
    ];

    const transformedPlayers = players.map((player) => {
      let transformedPlayer = {};

      columns.forEach((column) => {
        if (column.key === "dob") {
          // Format the Date of Birth (dob)
          const dob = new Date(player[column.key]);
          const day = String(dob.getDate()).padStart(2, "0");
          const month = String(dob.getMonth() + 1).padStart(2, "0");
          const year = dob.getFullYear();
          let formattedDob = `${day}/${month}/${year}`;

          // Check if the player's age is under 21
          const age = new Date().getFullYear() - dob.getFullYear();
          if (age < 21) {
            // Add " U21" in bold to the formatted date
            formattedDob += " U21";
          }

          transformedPlayer[column.header] = formattedDob;
        } else {
          transformedPlayer[column.header] = player[column.key];
        }
      });

      return transformedPlayer;
    });

    // Create a worksheet from the transformed data
    const ws = XLSX.utils.json_to_sheet(transformedPlayers, {
      header: columns.map((col) => col.header),
    });

    // Create a new workbook
    const wb = XLSX.utils.book_new();

    // Append the worksheet to the workbook
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    // Trigger the download
    XLSX.writeFile(wb, "players_data.xlsx");
  };

  function filterUnverifiedPayments(players) {
    return players.filter((player) =>
      player.tournaments.some((tournament) => tournament.paymentVerified)
    );
  }

  const handleFetch = useCallback(async () => {
    try {
      const data = await getAllPlayers();
      const sortedData = data.data.sort((a, b) => b?.playerId - a?.playerId);
      setRegisteredPlayers(sortedData);
      setPlayers(sortedData);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    handleFetch();
  }, [handleFetch]);

  const filteredPlayers = players.filter(
    (player) =>
      player.playerName.toLowerCase().includes(searchTerm.toLowerCase()) || // Search by name
      player.playerId.toString().includes(searchTerm) // Search by ID
  );

  return (
    <div className="playerBody">
      <Container fluid className="player-grid-header">
        <Row className="justify-content-center text-center mb-3">
          <Col xs={12} md={8} className="d-flex flex-column align-items-center">
            <h1>Player Cards</h1>
            <div className="d-flex flex-wrap justify-content-center align-items-center gap-3 mt-2">
              <Button
                className="downloadButton d-flex align-items-center justify-content-center"
                onClick={handlePlayersDownload}
                disabled={players.length === 0}
                variant="primary"
              >
                <FaDownload />
              </Button>
              <Form.Group
                controlId="verifiedPlayerCheckbox"
                className="d-flex align-items-center gap-2"
              >
                <input
                  type="checkbox"
                  checked={isVerified}
                  onChange={handleCheckboxChange}
                  style={{ cursor: "pointer", width: "20px", height: "20px" }}
                />
                <Form.Label
                  htmlFor="verifiedPlayerCheckbox"
                  className="mb-0"
                  style={{ cursor: "pointer" }}
                >
                  Verified Players
                </Form.Label>
              </Form.Group>
            </div>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col xs={12} md={8}>
            <Form.Control
              type="text"
              placeholder="Search by player Name / Id..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-bar"
            />
          </Col>
        </Row>
      </Container>
      <div className="player-grid">
        {registeredPlayers.length === 0 && filteredPlayers.length === 0 && (
          <>
            {registeredPlayers.map((player) => (
              // <div className="d-flex">
              <PlayerCard key={player._id} player={player} />
              // </div>
            ))}
          </>
        )}

        {filteredPlayers.map((player) => (
          // <div className="d-flex">
          <PlayerCard key={player._id} player={player} />
          // </div>
        ))}
      </div>
    </div>
  );
};

export default Players;
