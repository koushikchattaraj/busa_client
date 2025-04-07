import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Form, Button, Col, Row, Container } from "react-bootstrap";
import { getPlayerById } from "../../../services/services";

export const UpdatePlayer = ({ player }) => {
  const [formData, setFormData] = useState({
    playerName: player?.playerName,
    playerNickName: player?.playerNickName,
    dob: player?.dob,
    height: player?.height,
    tShirtSize: player?.tShirtSize,
    mobile: player?.mobile,
    aadharId: player?.aadharId,
    address: player?.address,
    district: "Bankura",
    pinCode: player?.pinCode,
    playerType: player?.playerType,
    battingArm: player?.battingArm,
    bowlingArm: player?.bowlingArm,
    bowlingPace: player?.bowlingPace,
    wicketKeeper: player?.wicketKeeper,
    preferredJerseyNumber: player?.preferredJerseyNumber,
    state: "WB",
    year: "2025",
    league: "mp_cup_bankura",
    season: "s1",
    photo: player?.photo,
  });

  const [photoPreview, setPhotoPreview] = useState(player?.photo);

  const handlePhotoFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, photo: file });
      const fileReader = new FileReader();
      fileReader.onloadend = () => setPhotoPreview(fileReader.result);
      fileReader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <Container className="form-container">
      <Form
        // onSubmit={handleSubmit}
        className="registration-form"
        enctype="multipart/form-data"
      >
        <h2 className="text-center mb-4">Player Update Form</h2>
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
                placeholder="Name on Jersey"
                name="playerNickName"
                value={formData.playerNickName}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
{/* 
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
            <Form.Group controlId="preferredJerseyNumber">
              <Form.Control
                type="text"
                placeholder="Jersey Number"
                name="preferredJerseyNumber"
                value={formData.preferredJerseyNumber}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row> */}

        <Row className="mb-3">
          {/* <Col md={6} xs={12} className="mb-3 mb-md-0">
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
          </Col> */}
          <Col md={12} xs={12} className="mb-3 mb-md-0">
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
          {/* <Col md={6} xs={12} className="mb-3 mb-md-0">
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
                  </Col> */}
          <Col md={12} xs={12} className="mb-3 mb-md-0">
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
        {/* <h3>About Player</h3>
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
                <option value="battingAllRounder">Batting All Rounder</option>
                <option value="bowlingAllRounder">Bowling All Rounder</option>
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
                <option value="na">NA</option>
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
                <option value="na">NA</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6} xs={12} className="mb-3 mb-md-0">
            <Form.Group controlId="wicketKeeper">
              <Form.Control
                as="select"
                name="wicketKeeper"
                value={formData.wicketKeeper}
                onChange={handleChange}
                required
              >
                <option value="">Wicket Keeper</option>
                <option value="yes">yes</option>
                <option value="no">No</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col md={6} xs={12} className="mb-3 mb-md-0">
            <Form.Group controlId="tShirtSize">
              <Form.Control
                as="select"
                name="tShirtSize"
                value={formData.tShirtSize}
                onChange={handleChange}
                required
              >
                <option value="">Jearsey Size</option>
                <option value="s">S</option>
                <option value="m">M</option>
                <option value="l">L</option>
                <option value="xl">XL</option>
                <option value="xxl">XXL</option>
                <option value="3xl">3XL</option>
                <option value="4xl">4XL</option>
                <option value="5xl">5XL</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row> */}
        <Button type="submit" className="submit-button">
          Submit
        </Button>
      </Form>
    </Container>
  );
};
