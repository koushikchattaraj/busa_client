import React from "react";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import AuctionCard from "../AuctionTab/AuctionCard/AuctionCard";

const FullscreenModal = ({ show, handleClose, player }) => {
  return (
    <Modal show={show} onHide={handleClose} fullscreen>
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        {player?.playerName?.length > 0 && (
          <AuctionCard
            playerName={player.playerName}
            playerId={player.playerId}
            nickname={player.playerNickName}
            district={player.district}
            playerType={player.playerType}
            battingArm={player.battingArm}
            bowlingArm={player.bowlingArm}
            dob={player.dob}
            image={player.photo}
          />
        )}
      </Modal.Body>
    </Modal>
  );
};

export default FullscreenModal;
