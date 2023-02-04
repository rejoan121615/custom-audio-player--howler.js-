const sound = new Howl({
  src: ['../assets/audio.mp3'],
})

// sound.play()

// state 
var playState = true;

const audioPlayer = document.querySelector('.audio-player');

const playPauseBtn = document.querySelector('.play-pause-btn');

playPauseBtn.addEventListener('click', () => {
  if (playState) {
    playPauseBtn.style.backgroundImage = 'url("../assets/pause-btn.svg")';
    playState = false;
    sound.play();
    
  } else {
    playPauseBtn.style.backgroundImage = 'url("../assets/play-btn.svg")';
    playState = true;
    sound.pause();
  }
})