import React, { useCallback, useEffect, useState } from "react";
import { getAllPlayers } from "../../services/services";
import PlayerCard from "./PlayerCard";
import { FaDownload } from "react-icons/fa";
import * as XLSX from "xlsx";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Loader from "../Loader/Loader";
import { convertToTitleCase, toProperCase } from "../../util/util";

const Players = () => {
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // const [selectFilter, setSelectFilter] = useState({});

  const [players, setPlayers] = useState([]);
  const [registeredPlayers, setRegisteredPlayers] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setSelectFilter({ ...selectFilter, [name]: value });
  //   if (value === "allPlayerType" && value === "allDistrict") {
  //     setPlayers(registeredPlayers);
  //   } else {
  //   }
  //   console.log(name, value);
  // };

  const handleCheckboxChange = () => {
    setIsVerified((prevState) => !prevState);
    if (!isVerified) {
      setPlayers(filterUnverifiedPayments(registeredPlayers));
    } else {
      setPlayers(registeredPlayers);
    }
  };

  const handlePlayersDownload = () => {
    // Define the columns you want to export and their corresponding header names
    const columns = [
      { key: "playerId", header: "Player Id" },
      { key: "playerName", header: "Player Name" },
      { key: "playerNickName", header: "Player Nick Name" },
      { key: "dob", header: "Date of Birth" },
      { key: "mobile", header: "Mobile No" },
      { key: "aadharId", header: "Aadhar Id" },
      { key: "address", header: "Address" },
      { key: "district", header: "District" },
      { key: "playerType", header: "Player Type" },
      { key: "battingArm", header: "Batting Arm" },
      { key: "bowlingArm", header: "Bowling Arm" },
      { key: "bowlingPace", header: "Bowling Pace" },
      { key: "wicketKeeper", header: "Wicket Keeper" },
      { key: "paymentVerified", header: "Player Verified" },
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
        } else if (column.key === "playerType") {
          // Capitalize the player type
          transformedPlayer[column.header] = convertToTitleCase(
            player[column.key]
          );
        } else if (column.key === "paymentVerified") {
          transformedPlayer[column.header] = player.tournaments[0][column.key]
            ? "Yes"
            : "No";
        } else {
          transformedPlayer[column.header] = toProperCase(player[column.key]);
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
    setIsLoading(true);
    try {
      const data = await getAllPlayers();
      const sortedData = data.data.sort((a, b) => b?.playerId - a?.playerId);
      setRegisteredPlayers(sortedData);
      setPlayers(sortedData);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
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
            {/* <Form.Group
              controlId="playerType"
              className="d-flex flex-wrap justify-content-center align-items-center gap-3 mt-2"
            >
              <Form.Control
                as="select"
                name="playerType"
                value={selectFilter.playerType}
                onChange={handleChange}
                required
              >
                <option value="allPlayerType">All Player Type</option>
                <option value="batsman">Batsman</option>
                <option value="bowler">Bowler</option>
                <option value="battingAllRounder">Batting All Rounder</option>
                <option value="bowlingAllRounder">Bowling All Rounder</option>
              </Form.Control>
              <Form.Control
                as="select"
                name="district"
                value={selectFilter.district}
                onChange={handleChange}
                required
              >
                <option value="allDistrict">All District</option>
                <option value="bankura">Bankura</option>
                <option value="purulia">Purulia</option>
              </Form.Control>
            </Form.Group> */}
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
        {isLoading && <Loader />}
        {!isLoading && filteredPlayers.length !== 0 ? (
          <>
            {filteredPlayers.map((player) => (
              // <div className="d-flex">
              <PlayerCard key={player._id} player={player} />
              // </div>
            ))}
          </>
        ) : (
          !isLoading && (
            <div className="text-center mt-5">
              <h1>No Players Found</h1>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Players;
