import React from "react";
import { createRoot } from "react-dom/client";
//
import "./style.scss";

//
import MainPlayer from "./components/MainPlayer";
import Lyrics from "./components/Lyrics";
import Playlist from "./components/Playlist";
// db
import songs from "./db/songs";
import { shuffleArray } from "./utils";
const length = songs.songs.length - 1;
const musicData = songs.songs;
const org = Array.from({ length: 10 }).map((_, i) => i);
let copy = Array.from({ length: 10 }).map((_, i) => i);

function App() {
  const audio = React.useRef(null);

  // this array only stores arry of original indexes
  const [arr, setArr] = React.useState(org);
  const [current, setCurrent] = React.useState(musicData[arr[0]]);
  //current.id will give the index of currently
  // playing so we can use +1 for next and -1 for prev

  const [screen, setScreen] = React.useState(0);
  const [running, setRunning] = React.useState(false);
  const [loop, setLoop] = React.useState(false);
  const [shuffle, setShuffle] = React.useState(false);
  const [position, setPosition] = React.useState(0);

  const pause = () => {
    audio.current.pause();
    setRunning(false);
  };
  const play = () => {
    audio.current.play();
    setRunning(true);
  };

  function togglePlayback() {
    if (running) {
      pause();
    } else {
      play();
    }
  }

  function shuffleMusic() {
    if (shuffle) {
      setArr(org);
    } else {
      shuffleArray(copy);
      setArr(copy);
    }
    setShuffle(!shuffle);
  }

  function updateTime(e, to) {
    to
      ? (audio.current.currentTime = to)
      : setPosition(Math.floor(audio.current.currentTime));
  }

  function changeSong(pos) {
    if (pos === current.id) return;

    pause();
    audio.current.src = "";
    if (pos < 0) {
      setCurrent(musicData[arr[length]]);
    } else if (pos > length) {
      setCurrent(musicData[arr[0]]);
    } else setCurrent(musicData[arr[pos]]);

    audio.current.addEventListener("loadedmetadata", play, { once: true });
    audio.current.addEventListener("timeupdate", updateTime);
  }

  function toggleLoop() {
    audio.current.loop = !loop;
    setLoop(!loop);
  }

  function handlePlaybackEnd() {
    audio.current.currentTime = 0;
    pause();
  }

  React.useEffect(() => {
    audio.current.addEventListener("timeupdate", updateTime);
    audio.current.addEventListener("ended", handlePlaybackEnd);
  }, []);

  return (
    <div className="container">
      <audio ref={audio} src={current.url} className="audio" />
      {screen === 0 && (
        <Playlist
          cover={songs.cover}
          singers={songs.artists}
          song={current}
          setScreen={setScreen}
          play={togglePlayback}
          running={running}
          changeSong={changeSong}
        />
      )}
      {screen === 1 && (
        <MainPlayer
          playlist={songs.album}
          setScreen={setScreen}
          song={current}
          running={running}
          play={togglePlayback}
          changeSong={changeSong}
          position={position}
          updateTime={updateTime}
          toggleLoop={toggleLoop}
          loop={loop}
          shuffleMusic={shuffleMusic}
          shuffle={shuffle}
        />
      )}
      {screen === 2 && (
        <Lyrics
          song={current}
          setScreen={setScreen}
          running={running}
          changeSong={changeSong}
          play={togglePlayback}
        />
      )}
    </div>
  );
}

const renderer = createRoot(document.querySelector("#root"));
renderer.render(<App />);
