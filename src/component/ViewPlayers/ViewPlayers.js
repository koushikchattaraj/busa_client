import React, { useCallback, useEffect, useState } from "react";
import Loader from "../Loader/Loader";
// import { getAllPlayers } from "../../services/services";
import PlayerCard from "../Players/PlayerCard";
import { allPlayerDataResponse } from "../../assets/data/allPlayerDataResponse";
import { Container, Row, Col, Form } from "react-bootstrap";

export const ViewPlayers = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [players, setPlayers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleFetch = useCallback(async () => {
    setIsLoading(true);
    try {
      // const data = await getAllPlayers();
      const data = allPlayerDataResponse;
      const sortedData = data.data.sort((a, b) => a?.playerId - b?.playerId);
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

  const filteredPlayers = players.filter((player) =>
    player.playerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="playerBody">
      <Container fluid className="player-grid-header">
        <Row className="justify-content-center">
          <Col xs={12}>
            <Form.Control
              type="text"
              placeholder="Search by Name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-bar"
            />
          </Col>
        </Row>
      </Container>
      <div className="player-grid">
        {isLoading ? (
          <Loader />
        ) : filteredPlayers && filteredPlayers.length > 0 ? (
          filteredPlayers.map((player) => (
            <PlayerCard key={player._id} player={player} />
          ))
        ) : (
          <div className="text-center mt-5">
            <h1>No Players Found</h1>
          </div>
        )}
      </div>
    </div>
  );
};
