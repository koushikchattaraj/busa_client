import React from "react";
import { Modal, Button } from "react-bootstrap";
import tc from "../../assets/images/tc.jpg";

const TandCModal = ({ show, handleClose }) => {
  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="lg"
      centered
      backdrop="static"
    >
      <Modal.Header>
        <Modal.Title>Trems & Condition</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img
          src={tc}
          alt="Profile Preview"
          style={{
            width: "100%",
            objectFit: "cover",
          }}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={() => handleClose()}>
          Accept
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TandCModal;
