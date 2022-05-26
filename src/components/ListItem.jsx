import React from "react";
import { AiOutlineDownload } from "react-icons/ai";
import { formatDuration } from "../utils";
import RippleButton from "./RippleButton";

const ListItem = ({ item, playing, change }) => {
  return (
    <div className={playing ? "song playing" : "song"}>
      <img
        onClick={() => change(item.id)}
        src={item.poster}
        className="song-poster"
      />
      <div className="song-info">
        <p className="song-info-title">
          {item.title} (from "{item.album}")
        </p>
        <p className="song-info-artists">
          <span className="song-lyrics">LYRICS</span>
          {item.artists.join(",")}
        </p>
      </div>
      <span className="duration">{formatDuration(item.duration)}</span>
      <RippleButton>
        <a href={item.url} download target="_blank">
          <AiOutlineDownload size={30} className="download" />
        </a>
      </RippleButton>
    </div>
  );
};

export default ListItem;
