import React from "react";
import { Modal, Button } from "react-bootstrap";
import upi from "../../assets/images/upi.png";
import qrcode from "../../assets/images/qrcode.jpeg";

const PaymentProcessModal = ({ show, handleClose }) => {
  const phoneNumber = "+916294959483";
  const upiId = "Q923802744@ybl";
  const name = "BankuraUnitedSportsAssociation";
  const amount = "200";
  const currency = "INR";
  const note = "Payment";
  const handleSendMoney = () => {
    let phonepeUrl = `phonepe://pay?pa=${upiId}&pn=${name}&am=${amount}&cu=${currency}&tn=${note}`;
    window.location.href = phonepeUrl;
  };
  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="lg"
      centered
      backdrop="static"
    >
      <Modal.Header>
        <Modal.Title>Payment Process</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="container">
          <div className="row text-center mb-3">
            <h4 className="col-12">
              Registration fee Rs 200/- (Non Refundable) and save the screenshot
            </h4>
          </div>

          {/* <div className="row justify-content-center mb-3">
            <h5 className="col-12 text-center">Pay via:</h5>
            <div className="col-auto">
              <button
                className="button-33"
                onClick={() => handleSendMoney("phonepe")}
              >
                <img
                  src={upi}
                  alt="phonepe"
                  className="img-fluid"
                  style={{ maxWidth: "85px" }}
                />
              </button>
            </div>
          </div> */}

          {/* <div className="row text-center mb-3">
            <h5 className="col-12 text-decoration-underline">OR</h5>
          </div> */}

          <div
            className="d-flex flex-column justify-content-center mb-3"
            style={{ alignItems: "center" }}
          >
            <h5 className="col-auto">Scan the QR Code:</h5>
            <div className="col-auto">
              <img
                src={qrcode}
                alt="qrcode"
                className="img-fluid"
                style={{ maxWidth: "250px" }}
              />
            </div>
          </div>

          <div className="row justify-content-center">
            <div className="col-12 text-center">
              <p>
                Any Help Required? Call us at:{" "}
                <a
                  href={`tel:${phoneNumber}`}
                  className="text-primary text-decoration-underline"
                >
                  {phoneNumber}
                </a>{" "}
                (10:00 AM - 6:00 PM)
              </p>
            </div>
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="primary" onClick={() => handleClose()}>
          Paid & Next
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PaymentProcessModal;
