const audio = new Howl({
    src: ["../assets/audio.mp3"],
    volume: 1,
});

audio.once("load", function () {
    // state
    var playState = true;
    var sound = 0;

    const audioPlayer = document.querySelector(".audio-player");

    // play and pause
    const playPauseBtn = document.querySelector(".play-pause-btn");
    playPauseBtn.addEventListener("click", () => {
        if (playState) {
            playPauseBtn.style.backgroundImage =
                'url("../assets/pause-btn.svg")';
            playState = false;
            audio.play();
            console.log(audio);
        } else {
            playPauseBtn.style.backgroundImage =
                'url("../assets/play-btn.svg")';
            playState = true;
            audio.pause();
        }
    });

    // sound
    const soundControl = document.querySelector(".audio-sound");
    soundControl.addEventListener("click", () => {
        if (sound) {
            audio.volume(1);
            sound = 0;
        } else {
            audio.volume(0);
            sound = 1;
        }
    });

    // load duration
    const durationSlider = document.querySelector(".duration-slider");
  durationSlider.setAttribute("max", Math.round(audio._duration));
  
    // durationSlider.setAttribute("value", Math.round(audio._duration));
  audio.on('play', () => {
    console.log('play');
  })

  audio.on('pause', (e) => {
    console.log('pause');
    console.log('e', e);
    console.log(audio);
  })
});


