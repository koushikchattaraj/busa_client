import React, { useCallback, useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import { getAllPlayers } from "../../services/services";
import PlayerCard from "../Players/PlayerCard";

export const ViewPlayers = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [players, setPlayers] = useState([]);

  const handleFetch = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getAllPlayers();
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

  return (
    <div className="player-grid playerBody">
      {isLoading && <Loader />}
      {!isLoading && players.length !== 0 ? (
        <>
          {players.map((player) => (
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
  );
};
