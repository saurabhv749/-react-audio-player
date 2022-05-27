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

/**
 *  insted of db[0] we'll use db[ copy[0] ] which will initially result in
 *  db[0]
 *
 * when shuffle is on copy[0] will be some random number for the playlist
 * so db[ copy[0] ] will be a different song from db.
 */
const org = Array.from({ length: 10 }).map((_, i) => i);
let copy = Array.from({ length: 10 }).map((_, i) => i);

function App() {
  const audio = React.useRef(null);

  // this array only stores arry of original indexes
  const [arr, setArr] = React.useState(org);
  const [current, setCurrent] = React.useState(musicData[arr[0]]);
  //current.id will give the index of currently
  // playing so we can use +1 for next and -1 for prev

  // Widget Transitions
  const screens = ["playlist", "main-p", "lyrics"];
  function setScreen(s) {
    const el = document.querySelector("." + screens[s]);
    const open = el.classList.contains("slide-up");
    open ? el.classList.remove("slide-up") : el.classList.add("slide-up");
  }
  //
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
      <Playlist
        cover={songs.cover}
        singers={songs.artists}
        song={current}
        setScreen={setScreen}
        play={togglePlayback}
        running={running}
        changeSong={changeSong}
      />

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

      <Lyrics
        song={current}
        setScreen={setScreen}
        running={running}
        changeSong={changeSong}
        play={togglePlayback}
      />
    </div>
  );
}

const renderer = createRoot(document.querySelector("#root"));
renderer.render(<App />);
