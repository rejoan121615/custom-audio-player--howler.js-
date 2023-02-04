var elms = [
    "track",
    "title",
    "subtitle",
    "timer",
    "duration",
    "playBtn",
    "pauseBtn",
    "progress",
    "thumb",
    "c-thumb",
];
elms.forEach(function (elm) {
    window[elm] = document.getElementById(elm);
});

var Player = function (playlist) {
    this.playlist = playlist;
    this.index = 0;
};
Player.prototype = {
    /**
     * Play a song in the playlist.
     * @param  {Number} index Index of the song in the playlist (leave empty to play the first or current).
     */
    play: function (index) {
        var self = this;
        var sound;

        index = typeof index === "number" ? index : self.index;
        var data = self.playlist[index];

        // If we already loaded this track, use the current one.
        // Otherwise, setup and load a new Howl.
        if (data.howl) {
            sound = data.howl;
        } else {
            sound = data.howl = new Howl({
                src: [
                    "https://res.cloudinary.com/n3pu/video/upload/v1571849541/80s_vibe.mp3",
                ],
                html5: true, // Force to HTML5 so that the audio can stream in (best for large files).
                onplay: function () {
                    // Display the duration.
                    duration.innerHTML = self.formatTime(
                        Math.round(sound.duration())
                    );
                    // track.classList.add("up");
                    // Start upating the progress of the track.
                    requestAnimationFrame(self.step.bind(self));
                },
            });
        }

        // Begin playing the sound.
        sound.play();

        // Show the pause button.
        if (sound.state() === "loaded") {
            playBtn.style.display = "none";
            pauseBtn.style.display = "block";
        } else {
            playBtn.style.display = "none";
            pauseBtn.style.display = "block";
            // track.classList.remove("up");
        }

        // Keep track of the index we are currently playing.
        self.index = index;
    },

    /**
     * Pause the currently playing track.
     */
    pause: function () {
        var self = this;

        // Get the Howl we want to manipulate.
        var sound = self.playlist[self.index].howl;

        // Puase the sound.
        sound.pause();

        // Show the play button.
        playBtn.style.display = "block";
        pauseBtn.style.display = "none";
    },

    /**
     * The step called within requestAnimationFrame to update the playback position.
     */
    step: function () {
        var self = this;
        // Get the Howl we want to manipulate.
        var sound = self.playlist[self.index].howl;
        // Determine our current seek position.
        // get seek value
        var seek = sound.seek() || 0;
        progress.setAttribute(
            "value",
            (sound.seek() / sound.duration()) * 100 || 0
        );
        // If the sound is still playing, continue stepping.
        if (sound.playing()) {
            requestAnimationFrame(self.step.bind(self));
        }
    },

    /**
     * Format the time from seconds to M:SS.
     * @param  {Number} secs Seconds to format.
     * @return {String}      Formatted time.
     */
    formatTime: function (secs) {
        var minutes = Math.floor(secs / 60) || 0;
        var seconds = secs - minutes * 60 || 0;

        return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
    },
};

// Setup our new audio player class and pass it the playlist.
var player = new Player([
    {
        title: "Rave Digger",
        subtitle: "80s vibe",
        file: "rave_digger",
        howl: null,
    },
]);

// Bind our player controls.
playBtn.addEventListener("click", function () {
    player.play();
});
pauseBtn.addEventListener("click", function () {
    player.pause();
});

// -----------------------------------------------------------------------------------------------------

var timer = 0;

var timerFunction;

var audio1 = new Howl({
    src: "../assets/audio.mp3",
});

audio1.once("load", function () {
    // update the progress bar
    const progress1 = document.querySelector("#progress1");
    // play
    const play1 = document.querySelector("#playBtn1");
    const pauseBtn1 = document.querySelector("#pauseBtn1");

    play1.addEventListener("click", () => {
        audio1.play();
        play1.style.display = "none";
        pauseBtn1.style.display = "block";
        // start timer function
        timerFunction = setInterval(() => {
            // update timer

            progress1.setAttribute("value", timer);
            timer++;
        }, 1000);
    });

    // pause
    const pause1 = document.querySelector("#pauseBtn1");

    pauseBtn1.addEventListener("click", () => {
        audio1.pause();
        pauseBtn1.style.display = "none";
        play1.style.display = "block";
        // clear interval
        clearInterval(timerFunction);
    });

    // change progress bar on interaction

    progress1.addEventListener("change", (e) => {
        timer = e.target.value;
        // audio1.seek(timer * audio1.duration());
        // console.log(timer * audio1.duration());
        // console.log(audio1.duration())
    });

    // change speed of audio
    const speed = document.querySelector("#speed1");
    speed.addEventListener("change", (e) => {
        audio1.rate(e.target.value);
    });

    // mute and unmute function
    const sound = document.querySelector("#sound1");
    sound.addEventListener("click", () => {
        // console.log(audio1._muted);
        // audio1.mute(true);
        // audio1._muted ? audio1.mute(false) : audio1.mute(true);
        if (audio1._muted) {
            audio1.mute(false);
            sound.classList.remove("down");
            sound.classList.add("up");
        } else {
            audio1.mute(true);
            sound.classList.add("down");
            sound.classList.remove("up");
        }
    });

    console.log(audio1);
});
