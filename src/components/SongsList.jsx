import React from "react";
import ListItem from "./ListItem";

import songs from "../db/songs";

const SongsList = ({ id, change }) => {
  return (
    <section className="songs">
      {songs.songs.map((el) => (
        <ListItem
          change={change}
          item={el}
          playing={id === el.id}
          key={el.id}
        />
      ))}
    </section>
  );
};

export default SongsList;
