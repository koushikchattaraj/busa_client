import React, { useCallback, useState } from "react";
import "./formBox.css";
import { createPlayer } from "../../services/services";
import UnderConstruction from "../UnderConstruction/UnderConstruction";
import { Form, Button, Col, Row, Container } from "react-bootstrap";
import lalmati from "../../assets/images/lalmati.png";
import TandCModal from "../TandCModal/TandCModal";
import Loader from "../Loader/Loader";
import PaymentProcessModal from "../PaymentProcessModal/PaymentProcessModal";

const FormBox = ({ isPlayerRegistrationFeatureEnabled }) => {
  const [showModal, setShowModal] = useState(true);
  const [showPaymentProcessModal, setShowPaymentProcessModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    // playerName: "Koushik Chattaraj",
    // playerNickName: "1234567890",
    // dob: "1998-10-28",
    // weight: "85",
    // height: "5'11",
    // tShirtSize: "M",
    // mobile: "1234567890",
    // aadharId: "1234-5678-9012",
    // address: "123 Street",
    // district: "Example District",
    // state: "Example State",
    // pinCode: "123456",
    // playerType: "batsman",
    // battingArm: "right",
    // bowlingArm: "right",
    // bowlingPace: "pace",
    // wicketKeeper: "no",
    // preferredJerseyNumber: "18",
    // preferredJerseyName: "Koushik",
    // year: "2025",
    // league: "lalmatir_cricket_league",
    // season: "s1",
    // photo: null,
    // uploadPaymentProof: null,

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
    pinCode: "",
    playerType: "",
    battingArm: "",
    bowlingArm: "",
    bowlingPace: "",
    wicketKeeper: "",
    preferredJerseyNumber: "",
    preferredJerseyName: "",
    state: "WB",
    year: "2025",
    league: "lalmatir_cricket_league",
    season: "s1",
    photo: null,
    uploadPaymentProof: null,
  });
  const [photoPreview, setPhotoPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePhotoFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, photo: file });
      const fileReader = new FileReader();
      fileReader.onloadend = () => setPhotoPreview(fileReader.result);
      fileReader.readAsDataURL(file);
    }
  };

  const handleUploadPaymentFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, uploadPaymentProof: file });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleCreate();
  };

  const handleCreate = useCallback(async () => {
    setIsLoading(true);
    try {
      await createPlayer(formData);
      alert("Player registration successful!");
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
        preferredJerseyName: "",
        year: "2025",
        league: "lalmatir_cricket_league",
        season: "1",
        photo: null,
        uploadPaymentProof: null,
      });
      setPhotoPreview(null);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      alert(
        error?.response?.data?.message || "Player registration unsuccessful!"
      );
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
            handleClose={() => {
              setShowModal(false);
              setShowPaymentProcessModal(true);
            }}
          />
          <PaymentProcessModal
            show={showPaymentProcessModal}
            handleClose={() => setShowPaymentProcessModal(false)}
          />
          {isLoading && <Loader />}
          {!isLoading && (
            <Container className="form-container">
              <Form
                onSubmit={handleSubmit}
                className="registration-form"
                enctype="multipart/form-data"
              >
                <div className="text-center mb-4">
                  <img
                    src={lalmati}
                    alt="Lalmati Logo"
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
                  <Col md={6} xs={12} className="mb-3 mb-md-0">
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
                  <Col md={6} xs={12} className="mb-3 mb-md-0">
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
                  <Col md={6} xs={12} className="mb-3 mb-md-0">
                    <Form.Group controlId="height">
                      <Form.Control
                        type="text"
                        placeholder="Height (ft)"
                        name="height"
                        value={formData.height}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6} xs={12} className="mb-3 mb-md-0">
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
                  <Col md={6} xs={12} className="mb-3 mb-md-0">
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
                  <Col md={6} xs={12} className="mb-3 mb-md-0">
                    <Form.Group controlId="photo">
                      <Form.Label>Profile Photo</Form.Label>
                      <Form.Control
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoFileChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                {/* Contact Details Section */}
                <h3>Contact Details</h3>
                <Row className="mb-3">
                  <Col md={6} xs={12} className="mb-3 mb-md-0">
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
                  <Col md={6} xs={12} className="mb-3 mb-md-0">
                    <Form.Group controlId="aadharId">
                      <Form.Control
                        type="text"
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
                  <Col md={6} xs={12} className="mb-3 mb-md-0">
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
                  <Col md={6} xs={12} className="mb-3 mb-md-0">
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
                  <Col md={6} xs={12} className="mb-3 mb-md-0">
                    <Form.Group controlId="playerType">
                      <Form.Control
                        as="select"
                        name="playerType"
                        value={formData.playerType}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Player Type</option>
                        <option value="batsman">Batsman</option>
                        <option value="bowler">Bowler</option>
                        <option value="allRounder">AllRounder</option>
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col md={6} xs={12} className="mb-3 mb-md-0">
                    <Form.Group controlId="bowlingPace">
                      <Form.Control
                        as="select"
                        name="bowlingPace"
                        value={formData.bowlingPace}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Bowling Type</option>
                        <option value="pace">Pace</option>
                        <option value="legSpin">Leg Spin</option>
                        <option value="offSpin">Off Spin</option>
                      </Form.Control>
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col md={6} xs={12} className="mb-3 mb-md-0">
                    <Form.Group controlId="battingArm">
                      <Form.Control
                        as="select"
                        name="battingArm"
                        value={formData.battingArm}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Batting Arm</option>
                        <option value="left">Left</option>
                        <option value="right">Right</option>
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col md={6} xs={12} className="mb-3 mb-md-0">
                    <Form.Group controlId="bowlingArm">
                      <Form.Control
                        as="select"
                        name="bowlingArm"
                        value={formData.bowlingArm}
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
                  <Col md={6} xs={12} className="mb-3 mb-md-0">
                    <Form.Group controlId="preferredJerseyNumber">
                      <Form.Control
                        type="number"
                        placeholder="Preferred Jersey Number"
                        name="preferredJerseyNumber"
                        value={formData.preferredJerseyNumber}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6} xs={12} className="mb-3 mb-md-0">
                    <Form.Group controlId="preferredJerseyName">
                      <Form.Control
                        type="text"
                        placeholder="Preferred Jersey Name"
                        name="preferredJerseyName"
                        value={formData.preferredJerseyName}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col md={12} xs={12}>
                    <Form.Group controlId="uploadPaymentProof">
                      <Form.Label>Upload Payment Proof</Form.Label>
                      <Form.Control
                        type="file"
                        accept="image/*,application/pdf"
                        onChange={handleUploadPaymentFileChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Button type="submit" className="submit-button">
                  Submit
                </Button>
              </Form>
            </Container>
          )}
        </>
      )}
    </>
  );
};

export default FormBox;
