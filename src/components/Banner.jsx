import React from "react";
import { AiFillPlayCircle, AiOutlinePauseCircle } from "react-icons/ai";

const Banner = ({ cover, singers, play, running }) => {
  return (
    <section className="banner-wrapper">
      <img src={cover} alt="cover" className="banner-img" />
      <div className="banner-content">
        <p className="banner-cap">{singers.join(",")}</p>
        <p className="play-btn">
          {!running ? (
            <AiFillPlayCircle onClick={play} title="start radio" size={50} />
          ) : (
            <AiOutlinePauseCircle onClick={play} title="stop radio" size={50} />
          )}
        </p>
      </div>
    </section>
  );
};
export default Banner;
