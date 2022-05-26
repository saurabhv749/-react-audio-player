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
  // console.log(song);
  const openMain = () => setScreen(1);
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

// const songLyrics = `Some keep a diary;
// Seems like a fantasy;
// But it may require some love and desire;
// It's something to cover me;
// There's never a guarantee;
// That loving is so easy;
// Some may define it as sugar and brownies;
// But sour just as lime is;
// Uhh na na na uhh na na na na na na.. na na na;
// Uhh na na na uhh na na na na na na.. na na na;
// Uhh na na na na na uhh na na na na na;
// Uhh na na na na na uhh na na na na na;
// Son of the ocean breeze;
// Somewhere you promised me;
// A love like a fire, no fears, no denial;
// Just something to gladden me;
// I feel electricity;
// Your lighting is guiding me;
// I fear that I like it;
// No place we can hide it;
// So hard not to find it;
// Uhh na na na uhh na na na na na na.. na na na;
// Uhh na na na uhh na na na na na na.. na na na;
// Uhh na na na na na uhh na na na na na;
// Uhh na na na na na uhh na na na na na;
// The reason why we don't give up on our love is simple;
// We're like the sun and moon;
// We like to see each other shining bright;
// We have tonight, tomorrow;
// And the other days that follow;
// We have to try to make things right;
// I'll sing to you like;
// Uhh na na na uhh na na na na na na.. na na na;
// Uhh na na na uhh na na na na na na.. na na na;
// Uhh na na na na na uhh na na na na na;
// Uhh na na na na uhh na na na na na na;
// The reason the reason the reason why ...
// `.split(";");
