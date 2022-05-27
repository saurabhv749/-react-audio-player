import React from "react";
import {
  MdPlayArrow,
  MdPause,
  MdOutlineSkipPrevious,
  MdOutlineSkipNext,
} from "react-icons/md";
import RippleButton from "./RippleButton";

const MiniPlayer = ({ setScreen, song, running, changeSong, play }) => {
  const openMain = () => setScreen(1);
  const prev = () => changeSong(song.id - 1);
  const next = () => changeSong(song.id + 1);
  return (
    <section className="mini-wrapper">
      <div className="mini">
        <img src={song.poster} className="mini-poster" onClick={openMain} />
        <div className="mini-info" onClick={openMain}>
          <p className="mini-info-title">
            <span>
              {song.title} (from "{song.album}")
            </span>
            <span>
              {song.title} (from "{song.album}")
            </span>
          </p>
          <p className="mini-info-artist">{song.artists.join(",")}</p>
        </div>
        <div className="mini-controls">
          <RippleButton>
            <MdOutlineSkipPrevious onClick={prev} size={35} />
          </RippleButton>
          <RippleButton>
            {running ? (
              <MdPause size={35} onClick={play} />
            ) : (
              <MdPlayArrow size={35} onClick={play} />
            )}
          </RippleButton>
          <RippleButton>
            <MdOutlineSkipNext onClick={next} size={35} />
          </RippleButton>
        </div>
      </div>
    </section>
  );
};

export default MiniPlayer;
