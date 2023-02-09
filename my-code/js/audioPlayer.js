// setTimeout(() => {
//   console.clear();
// }, 400);

// player codes 
var wrapperID = document.querySelector(".audio-player");
const playBtn = document.querySelector("#playBtn");
const pauseBtn = document.querySelector("#pauseBtn");
const progressBar = document.querySelector("#progress");
const audioDuration = document.querySelector(".audio-duration");
const elapsedTime = document.querySelector("#current-time");
const duration = document.querySelector("#duration");
const audioSpeed = document.querySelector("#speed");
const sound = document.querySelector("#speed");


class Player {
  constructor(track) {
    this.track = track;
  }

  init() {
    
  }

  play() {
    
  }
}



const song = new Player('../assets/audio.mp3');


console.log(song.init());