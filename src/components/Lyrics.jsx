import React from "react";
import {
  MdPlayArrow,
  MdOutlinePause,
  MdOutlineSkipPrevious,
  MdOutlineSkipNext,
} from "react-icons/md";
import { BsChevronCompactDown } from "react-icons/bs";
import RippleButton from "./RippleButton";

const Lyrics = ({ setScreen, song, running, changeSong, play }) => {
  const prev = () => changeSong(song.id - 1);
  const next = () => changeSong(song.id + 1);
  const openMain = () => setScreen(2);
  return (
    <section className="lyrics">
      <div className="container">
        <p className="lyrics-close" onClick={openMain}>
          <BsChevronCompactDown size={30} />
        </p>
        <div className="mini-p">
          <img src={song.poster} className="mini-p-poster" />
          <div className="mini-p-info">
            <p className="title">{song.title}</p>
            <p className="artists">{song.artists.join(",")}</p>
            <p></p>
          </div>
          <div className="mini-p-controls">
            <RippleButton>
              <MdOutlineSkipPrevious size={35} onClick={prev} />
            </RippleButton>
            <RippleButton>
              {running ? (
                <MdOutlinePause size={35} onClick={play} />
              ) : (
                <MdPlayArrow size={35} onClick={play} />
              )}
            </RippleButton>
            <RippleButton>
              <MdOutlineSkipNext size={35} onClick={next} />
            </RippleButton>
          </div>
        </div>

        <div className="lyrics-content">
          {song.lyrics &&
            song.lyrics.split(";").map((_, i) => <p key={i}>{_}</p>)}
        </div>
      </div>
    </section>
  );
};

export default Lyrics;
