const countTime = array => {
  if (!array) return;

  let time = 0;

  if (array[0]?.duration_ms) {
    for (let i = 0; i < array.length; i++) {
      if (time + (array[i]?.duration_ms && array[i].duration_ms) > 86400000) {
        time = "24h +";
        break;
      } else {
        if (array[i].duration_ms) time += array[i].duration_ms;
      }
    }
  } else {
    for (let i = 0; i < array.length; i++) {
      if (
        time + (array[i]?.track?.duration_ms && array[i].track.duration_ms) >
        86400000
      ) {
        time = "24h +";
        break;
      } else {
        if (array[i].track) time += array[i]?.track.duration_ms;
      }
    }
  }

  if (time === "24h +") return time;
  if (time === 0) return "0 s";

  let h, m, s;
  h = Math.floor(time / 1000 / 60 / 60);
  m = Math.floor((time / 1000 / 60 / 60 - h) * 60);
  s = Math.floor(((time / 1000 / 60 / 60 - h) * 60 - m) * 60);

  // :)
  return `${h > 0 ? `${h} h` : ""} ${h === 0 && m === 0 ? "" : m > 0 ? `${m} min` : ""} ${
    h === 0 ? `${s !== 0 ? `${s} s` : ""}` : ""
  }`.trim();
};

export default countTime;
