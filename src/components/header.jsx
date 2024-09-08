import React, { useState } from "react";
import "./Header.css"; // Make sure to style the popup properly

export const Header = (props) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleLearnMoreClick = () => {
    setIsPopupOpen(true);
  };

  const handleCloseClick = () => {
    setIsPopupOpen(false);
  };

  return (
    <header id="header">
      <div className="intro">
        <div className="overlay">
          <div className="container">
            <div className="row">
              <div className="col-md-8 col-md-offset-2 intro-text">
                <h1>
                  {props.data ? props.data.title : "Loading"}
                  <span></span>
                </h1>
                <p>{props.data ? props.data.paragraph : "Loading"}</p>
                <button
                  className="btn btn-custom btn-lg page-scroll"
                  onClick={handleLearnMoreClick}
                >
                  Learn More
                </button>{" "}
              </div>
            </div>
          </div>
        </div>
      </div>

      {isPopupOpen && (
        <div className="video-popup">
          <div className="video-popup-content">
            <span className="close" onClick={handleCloseClick}>
              &times;
            </span>
            <video controls>
              <source src="path_to_your_video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}
    </header>
  );
};
