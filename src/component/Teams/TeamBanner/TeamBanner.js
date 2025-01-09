import React from "react";
import "./TeamBanner.css"; // Updated CSS

const TeamBanner = () => {
  const importAll = (r) => r.keys().map(r);
  const images = importAll(
    require.context(
      "../../../assets/lalmatirleagues1/TeamBanner",
      false,
      /\.(png|jpe?g|svg)$/
    )
  );

  return (
    <div className="team-banner-container">
      {images.map((image, index) => (
        <div className="image-wrapper" key={index}>
          <img
            src={image}
            alt={`Team Banner ${index + 1}`}
            className="team-banner-image"
          />
        </div>
      ))}
    </div>
  );
};

export default TeamBanner;
