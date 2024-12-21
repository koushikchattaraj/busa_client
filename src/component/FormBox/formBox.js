import React, { useCallback, useEffect, useState } from "react";
import "./formBox.css";
import { createPlayer } from "../../services/services";
import UnderConstruction from "../UnderConstruction/UnderConstruction";
import { Form, Button, Col, Row, Container } from "react-bootstrap";
import lalmati from "../../assets/images/lalmati.png";
import TandCModal from "../TandCModal/TandCModal";

const FormBox = ({ isPlayerRegistrationFeatureEnabled }) => {
  const [showModal, setShowModal] = useState(true);
  useEffect(() => {
    setShowModal(true);
  }, []);
  const [formData, setFormData] = useState({
    playerName: "",
    playerNickName: "",
    dob: "",
    weight: "",
    height: "",
    tShirtSize: "",
    mobile: "",
    aadharId: "",
    address: "",
    district: "",
    state: "WB",
    pinCode: "",
    playerType: "",
    battingArm: "",
    bowlingArm: "",
    bowlingPace: "",
    wicketKeeper: "",
    preferredJerseyNumber: "",
    photo: null,
    uploadPaymentProof: null,
    year: "2025",
    leauge: "lalmatir_cricket_league",
    season: "1",
  });
  const [photoPreview, setPhotoPreview] = useState(null);

  // const isFormIncomplete = () => {
  //   return Object.values(formData).some((value) => {
  //     return value === "" || value === null;
  //   });
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { files } = e.target;
    if (files && files[0]) {
      const file = files[0];
      setFormData({ ...formData, photo: file });
      // Create a URL for the file and set it as the photo preview
      const fileReader = new FileReader();
      fileReader.onloadend = () => {
        setPhotoPreview(fileReader.result); // Store the image preview URL
      };
      fileReader.readAsDataURL(file); // Read the file as a data URL
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleCreate();
  };

  const handleCreate = useCallback(async () => {
    try {
      await createPlayer(formData);
      alert("Player Registration Successful!");
      setFormData({
        playerName: "",
        playerNickName: "",
        dob: "",
        weight: "",
        height: "",
        tShirtSize: "",
        mobile: "",
        aadharId: "",
        address: "",
        district: "",
        state: "WB",
        pinCode: "",
        playerType: "",
        battingArm: "",
        bowlingArm: "",
        bowlingPace: "",
        wicketKeeper: "",
        preferredJerseyNumber: "",
        photo: null,
        uploadPaymentProof: null,
        year: "2025",
        leauge: "lalmatir_cricket_league",
        season: "1",
      });
    } catch (error) {
      alert("Player Registration unsuccesfull!");
    }
  }, [formData]);

  return (
    <>
      {!isPlayerRegistrationFeatureEnabled ? (
        <UnderConstruction />
      ) : (
        <>
          <TandCModal
            show={showModal}
            handleClose={() => setShowModal(false)}
          />
          <Container className="form-container">
            {/* Profile photo preview */}

            <Form onSubmit={handleSubmit} className="registration-form">
              <div className="text-center mb-4">
                <img
                  src={lalmati}
                  alt="Profile Preview"
                  style={{
                    width: "75px",
                    height: "75px",
                    objectFit: "cover",
                    borderRadius: "50%",
                  }}
                />
              </div>
              <h2 className="text-center mb-4">Player Registration Form</h2>
              {photoPreview && (
                <div className="text-center mb-4">
                  <img
                    src={photoPreview}
                    alt="Profile Preview"
                    style={{
                      width: "200px",
                      height: "200px",
                      objectFit: "cover",
                      borderRadius: "10%",
                    }}
                  />
                </div>
              )}
              {/* Personal Details Section */}
              <h3>Personal Details</h3>
              <Row className="mb-3">
                <Col md={6} xs={12}>
                  <Form.Group controlId="playerName">
                    <Form.Control
                      type="text"
                      placeholder="Player Name"
                      name="playerName"
                      value={formData.playerName}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6} xs={12}>
                  <Form.Group controlId="playerNickName">
                    <Form.Control
                      type="text"
                      placeholder="Nick Name"
                      name="playerNickName"
                      value={formData.playerNickName}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col md={6} xs={12}>
                  <Form.Group controlId="height">
                    <Form.Control
                      type="text"
                      placeholder="Height (Ft)"
                      name="height"
                      value={formData.height}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6} xs={12}>
                  <Form.Group controlId="weight">
                    <Form.Control
                      type="text"
                      placeholder="Weight (kg)"
                      name="weight"
                      value={formData.weight}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col md={6} xs={12}>
                  <Form.Group controlId="dob">
                    <Form.Label>Date of Birth</Form.Label>
                    <Form.Control
                      type="date"
                      name="dob"
                      value={formData.dob}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6} xs={12}>
                  <Form.Group controlId="photo">
                    <Form.Label>Profile Photo</Form.Label>
                    <Form.Control
                      type="file"
                      name="photo"
                      accept="image/*"
                      onChange={handleFileChange}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
              {/* Contact Details Section */}
              <h3>Contact Details</h3>
              <Row className="mb-3">
                <Col md={6} xs={12}>
                  <Form.Group controlId="mobile">
                    <Form.Control
                      type="tel"
                      placeholder="Mobile Number"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6} xs={12}>
                  <Form.Group controlId="aadhar">
                    <Form.Control
                      type="number"
                      placeholder="Aadhar Number"
                      name="aadharId"
                      value={formData.aadharId}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group controlId="address" className="mb-3">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Row className="mb-3">
                <Col md={6} xs={12}>
                  <Form.Group controlId="district">
                    <Form.Control
                      type="text"
                      placeholder="District"
                      name="district"
                      value={formData.district}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6} xs={12}>
                  <Form.Group controlId="pinCode">
                    <Form.Control
                      type="number"
                      placeholder="Pin Code"
                      name="pinCode"
                      value={formData.pinCode}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              {/* About Your Game Section */}
              <h3>About Player</h3>
              <Row className="mb-3">
                <Col md={6} xs={12}>
                  <Form.Group controlId="playerType">
                    <Form.Control
                      as="select"
                      name="playerType"
                      value={formData.playerType}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Player Type</option>
                      <option value="Batsman">Batsman</option>
                      <option value="Bowler">Bowler</option>
                      <option value="AllRounder">AllRounder</option>
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col md={6} xs={12}>
                  <Form.Group controlId="bowlingPace">
                    <Form.Control
                      as="select"
                      name="bowlingPace"
                      value={formData.bowlingPace}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Bowling Type</option>
                      <option value="Pace">Pace</option>
                      <option value="Leg Spin">Leg Spin</option>
                      <option value="Off Spin">Off Spin</option>
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={6} xs={12}>
                  <Form.Group controlId="BattingArm">
                    <Form.Control
                      as="select"
                      name="BattingArm"
                      value={formData.BattingArm}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Batting Arm</option>
                      <option value="left">Left</option>
                      <option value="right">Right</option>
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col md={6} xs={12}>
                  <Form.Group controlId="BowlingArm">
                    <Form.Control
                      as="select"
                      name="BowlingArm"
                      value={formData.BowlingArm}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Bowling Arm</option>
                      <option value="left">Left</option>
                      <option value="right">Right</option>
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={6} xs={12}>
                  <Form.Group controlId="wicketKeeper">
                    <Form.Control
                      as="select"
                      name="wicketKeeper"
                      value={formData.wicketKeeper}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Wicket Keeper</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col md={6} xs={12}>
                  <Form.Group controlId="tshirtSize">
                    <Form.Control
                      as="select"
                      name="tshirtSize"
                      value={formData.tshirtSize}
                      onChange={handleChange}
                      required
                    >
                      <option value="">T-Shirt Size</option>
                      <option value="S">S</option>
                      <option value="M">M</option>
                      <option value="L">L</option>
                      <option value="XL">XL</option>
                      <option value="XXL">XXL</option>
                      <option value="XXXL">XXXL</option>
                      <option value="4XL">4XL</option>
                      <option value="5XL">5XL</option>
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={6} xs={12}>
                  <Form.Group controlId="preferredJerseyNumber">
                    <Form.Control
                      type="number"
                      placeholder="Preferred Jersey Number"
                      name="preferredJerseyNumber"
                      value={formData.preferredJerseyNumber}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6} xs={12}>
                  <Form.Group controlId="nameOnJersey">
                    <Form.Group controlId="preferredJerseyName">
                      <Form.Control
                        type="number"
                        placeholder="Preferred Name on Jersey"
                        name="preferredJerseyNumber"
                        value={formData.preferredJerseyName}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mb-3">
                <Form.Label>Upload Payment Proof</Form.Label>
                <Form.Control
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={handleFileChange}
                  required
                />
              </Row>

              <Button type="submit" className="submit-button">
                Submit
              </Button>
            </Form>
          </Container>
        </>
      )}
    </>
  );
};

export default FormBox;
