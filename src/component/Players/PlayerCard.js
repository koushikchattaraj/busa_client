import React from "react";
import koushikImg from "../../assets/images/koushik.jpeg";

const PlayerCard = ({ player }) => {
  return (
    <div class="profile-card">
      <div class="playerno-label">
        <strong>{player.playerId}</strong>
      </div>
      <div class="card-content">
        <div class="avatar-wrapper">
          <div class="avatar">
            <img src={player?.photo} alt="..." style={{ height: "100%" }} />
          </div>
        </div>

        <div class="profile-info">
          <div class="stats">
            <div class="d-flex-column">
              <h2 class="name">{player?.playerNickName}</h2>
              <p class="title">{player.playerName}</p>
            </div>
          </div>

          <div class="bio">
            Creative designer with 5+ years of experience in digital product
            design and brand identity.
          </div>

          <div class="skills">
            <span class="skill">UI/UX</span>
            <span class="skill">Branding</span>
            <span class="skill">Motion</span>
          </div>

          <div class="actions">
            <button class="action-btn primary">
              <span>Follow</span>
              <div class="btn-effect"></div>
            </button>
            <button class="action-btn secondary">
              <span>Message</span>
              <div class="btn-effect"></div>
            </button>
          </div>
        </div>
      </div>

      <div class="card-shine"></div>
      <div class="card-border"></div>
      <div class="card-glow"></div>
    </div>
  );
};

export default PlayerCard;
