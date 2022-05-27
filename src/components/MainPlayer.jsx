import React from "react";
import Slider from "@mui/material/Slider";
import { AiOutlineDown, AiOutlineDownload } from "react-icons/ai";
import {
  MdShuffle,
  MdShuffleOn,
  MdSkipPrevious,
  MdMusicNote,
  MdKeyboardArrowUp,
  MdSkipNext,
  MdOutlineRepeat,
  MdOutlineRepeatOn,
  MdPlayCircleFilled,
  MdPauseCircleFilled,
} from "react-icons/md";
import RippleButton from "./RippleButton";
import { formatDuration } from "../utils";

const MainPlayer = ({
  setScreen,
  song,
  playlist,
  play,
  changeSong,
  running,
  position,
  updateTime,
  toggleLoop,
  loop,
  shuffleMusic,
  shuffle,
}) => {
  const duration = song.duration; //seconds

  const openMain = () => setScreen(1);
  const openLyrics = () => setScreen(2);
  const prev = () => changeSong(song.id - 1);
  const next = () => changeSong(song.id + 1);

  return (
    <section className="main-p">
      <div className="container">
        <div className="main-p-header">
          <AiOutlineDown size={30} onClick={openMain} />
          <div>
            <p>PLAYING FROM PLAYLIST</p>
            <p>{playlist}</p>
          </div>
        </div>
        <img
          src={song.poster}
          height={300}
          width={300}
          className="main-p-poster"
        />

        <div className="main-p-info">
          <div>
            <p>
              {song.title} from "{song.album}"
            </p>
            <p>{song.artists.join(",")}</p>
          </div>
          <a href={song.url} target="_blank" download>
            <AiOutlineDownload size={30} />
          </a>
        </div>

        <Slider
          aria-label="time-indicator"
          size="small"
          value={position}
          min={0}
          step={1}
          max={duration}
          onChange={(_, value) => updateTime(_, value)}
          sx={{
            color: "rgba(0,0,0,0.87)",
            height: 4,
            "& .MuiSlider-thumb": {
              width: 8,
              height: 8,
              transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
              "&:before": {
                boxShadow: "0 2px 12px 0 rgba(0,0,0,0.4)",
              },
              "&:hover, &.Mui-focusVisible": {
                boxShadow: `0px 0px 0px 8px rgb(0 0 0 / 16%)`,
              },
              "&.Mui-active": {
                width: 20,
                height: 20,
              },
            },
            "& .MuiSlider-rail": {
              opacity: 0.28,
            },
          }}
        />
        <div className="main-p-timing">
          <span>{formatDuration(position)}</span>
          <span>-{formatDuration(duration - position)}</span>
        </div>

        <div className="main-p-controls">
          <RippleButton>
            {shuffle ? (
              <MdShuffleOn size={30} onClick={shuffleMusic} />
            ) : (
              <MdShuffle size={30} onClick={shuffleMusic} />
            )}
          </RippleButton>
          <RippleButton>
            <MdSkipPrevious size={40} onClick={prev} />
          </RippleButton>
          <RippleButton>
            {running ? (
              <MdPauseCircleFilled size={60} onClick={play} />
            ) : (
              <MdPlayCircleFilled size={60} onClick={play} />
            )}
          </RippleButton>
          <RippleButton>
            <MdSkipNext size={40} onClick={next} />
          </RippleButton>
          <RippleButton>
            {loop ? (
              <MdOutlineRepeatOn size={30} onClick={toggleLoop} />
            ) : (
              <MdOutlineRepeat size={30} onClick={toggleLoop} />
            )}
          </RippleButton>
        </div>

        <div className="main-p-lyrics" onClick={openLyrics}>
          <MdKeyboardArrowUp size={20} />{" "}
          <p>
            <MdMusicNote style={{ marginRight: 10, verticalAlign: "middle" }} />
            LYRICS
          </p>
        </div>
      </div>
    </section>
  );
};
export default MainPlayer;
