import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Form, Button, Col, Row, Container } from "react-bootstrap";
import { getPlayerById } from "../../../services/services";
import { UpdatePlayer } from "./UpdatePlayer";
import Loader from "../../Loader/Loader";

export const GetPlayer = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [player, setPlayer] = useState([]);
  const [apiStatus, setApiStatus] = useState("");
  const token = localStorage.getItem("authToken");

  const handleFetch = useCallback(async () => {
    setIsLoading(true);
    try {
      if (id) {
        const data = await getPlayerById(id);
        setPlayer(data.data);
        setApiStatus("success");
        setIsLoading(false);
      }
    } catch (error) {
      setApiStatus("error");
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    handleFetch();
  }, [handleFetch]);
  return (
    <div>
      <>
        {isLoading && <Loader />}
        {!isLoading && apiStatus === "success" && (
          <>
            <UpdatePlayer player={player} />
          </>
        )}
        {player.length === 0 && apiStatus === "success" && (
          <div className="text-center mt-5">
            <h1>No Players Found</h1>
          </div>
        )}
      </>
    </div>
  );
};
