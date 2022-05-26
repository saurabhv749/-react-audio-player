import React from "react";
import Banner from "./Banner";
import SongsList from "./SongsList";
import MiniPlayer from "./MiniPlayer";

const Playlist = ({
  setScreen,
  cover,
  singers,
  song,
  play,
  running,
  changeSong,
}) => {
  return (
    <section className="playlist">
      <Banner cover={cover} singers={singers} play={play} running={running} />
      <SongsList id={song.id} change={changeSong} />
      <MiniPlayer
        song={song}
        changeSong={changeSong}
        setScreen={setScreen}
        running={running}
        play={play}
      />
    </section>
  );
};

export default Playlist;
