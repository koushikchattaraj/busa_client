import React, { useCallback, useState } from "react";
import "./formBox.css";
import { createPlayer } from "../../services/services";

const FormBox = () => {
  const [formData, setFormData] = useState({
    playerName: "",
    playerNickName: "",
    dob: "",
    weight: "",
    height: "",
    tShirtSize: "",
    mobile: "",
    email: "",
    address: "",
    district: "",
    state: "",
    pinCode: "",
    playerType: "",
    battingArm: "",
    bowlingArm: "",
    bowlingPace: "",
    wicketKeeper: "",
    teamCaptionExperience: "",
    photo: null,
  });

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
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, photo: file });
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
        email: "",
        address: "",
        district: "",
        state: "",
        pinCode: "",
        playerType: "",
        battingArm: "",
        bowlingArm: "",
        bowlingPace: "",
        wicketKeeper: "",
      });
    } catch (error) {
      alert("Player Registration unsuccesfull!");
    }
  }, [formData]);

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="registration-form">
        <h2>Player Registration Form</h2>

        {/* Section 1: Personal Details */}
        <div className="form-section">
          <h3>Personal Details</h3>
          <div className="form-group">
            <input
              placeholder="Player Name"
              type="text"
              name="playerName"
              value={formData.playerName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              placeholder="Nick Name"
              type="text"
              name="playerNickName"
              value={formData.playerNickName}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <div
              style={{
                display: "flex",
                gap: "5px",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <strong style={{ width: "25%" }}>Date of Birth</strong>
              <input
                placeholder="Date of Birth"
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="form-group">
            <input
              placeholder="Weight (kg)"
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              placeholder="Height (Ft)"
              type="number"
              name="height"
              value={formData.height}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <div
              style={{
                display: "flex",
                gap: "5px",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <strong style={{ width: "25%" }}>Profile Photo</strong>
              <input
                placeholder="Upload Photo"
                type="file"
                id="photo"
                accept="image/*"
                onChange={handleFileChange}
                required
              />
            </div>
          </div>
        </div>

        {/* Section 2: Contact Details */}
        <div className="form-section">
          <h3>Contact Details</h3>
          <div className="form-group">
            <input
              placeholder="Mobile Number"
              type="tel"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              placeholder="Email Address"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <textarea
              placeholder="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <div className="form-group">
            <input
              placeholder="District"
              type="text"
              name="district"
              value={formData.district}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              placeholder="State"
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              placeholder="Pin Code"
              type="number"
              name="pinCode"
              value={formData.pinCode}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Section 3: About Your Game */}
        <div className="form-section">
          <h3>About Your Game</h3>
          <div className="form-group">
            <select name="playerType" onChange={handleChange} required>
              <option value="">Player Type</option>
              <option value="Batsman">Batsman</option>
              <option value="Bowler">Bowler</option>
              <option value="AllRounder">AllRounder</option>
            </select>
          </div>
          <div className="form-group">
            <select
              name="bowlingPace"
              value={formData.bowlingPace}
              onChange={handleChange}
              required
            >
              <option value="">Bowling Pace</option>
              <option value="Mid Pace">Mid Pace</option>
              <option value="Leg Spin">Leg Spin</option>
              <option value="Off Spin">Off Spin</option>
            </select>
          </div>
          <div className="form-group">
            <select name="BattingArm" onChange={handleChange} required>
              <option value="">Batting Arm</option>
              <option value="left">Left</option>
              <option value="right">Right</option>
            </select>
          </div>
          <div className="form-group">
            <select name="BowlingArm" onChange={handleChange} required>
              <option value="">Bowling Arm</option>
              <option value="left">Left</option>
              <option value="right">Right</option>
            </select>
          </div>
          <div className="form-group">
            <select name="wicketKeeper" onChange={handleChange} required>
              <option value="">Wicket Keeper</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          <div className="form-group">
            <select
              name="TeamCaptainExperience"
              onChange={handleChange}
              required
            >
              <option value="">Team Captain Experience</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          <div className="form-group">
            <select name="tshirtSize" onChange={handleChange} required>
              <option value="">T-Shirt Size</option>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
              <option value="XXL">XXL</option>
            </select>
          </div>
        </div>

        <button type="submit" className="submit-button">
          submit
        </button>
        {/* <PaymentButton
          handleCreate={handleSubmit}
          isDisable={isFormIncomplete}
        /> */}
      </form>
    </div>
  );
};

export default FormBox;
