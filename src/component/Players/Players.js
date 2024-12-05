import React, { useCallback, useEffect, useState } from "react";
import { getAllPlayers } from "../../services/services";
import PlayerCard from "./PlayerCard";
import { FaDownload } from "react-icons/fa";
import * as XLSX from "xlsx";

const Players = () => {
  const [players, setPlayers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handlePlayersDownload = () => {
    const ws = XLSX.utils.json_to_sheet(players);
    // Create a new workbook
    const wb = XLSX.utils.book_new();
    // Append the worksheet to the workbook
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    // Trigger the download
    XLSX.writeFile(wb, "players_data.xlsx");
  };

  const handleFetch = useCallback(async () => {
    try {
      const data = await getAllPlayers();
      setPlayers(data.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    handleFetch();
  }, [handleFetch]);

  const filteredPlayers = players.filter((player) =>
    player.playerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="playerBody">
      <div className="player-grid-header">
        <div
          style={{
            display: "flex",
            gap: "10px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h1 style={{ textAlign: "center" }}>Player Cards</h1>
          <button
            className="downloadButton"
            onClick={handlePlayersDownload}
            isDisable={players.length === 0}
          >
            <FaDownload />
          </button>
        </div>
        <input
          type="text"
          placeholder="Search by player name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar"
        />
      </div>
      <div className="player-grid">
        {filteredPlayers.map((player) => (
          <PlayerCard key={player._id} player={player} />
        ))}
      </div>
    </div>
  );
};

export default Players;
