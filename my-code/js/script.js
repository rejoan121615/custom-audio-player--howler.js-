var wrapperID = document.querySelector(".audio-player");
const playBtn = document.querySelector("#playBtn");
const pauseBtn = document.querySelector("#pauseBtn");
const progressBar = document.querySelector("#progress");
const audioDuration = document.querySelector(".audio-duration");
const elapsedTime = document.querySelector("#current-time");
const duration = document.querySelector("#duration");
const audioSpeed = document.querySelector("#speed");
const sound = document.querySelector("#sound");

function Player(data) {
    this.howl = new Howl({
        src: data.file,
        html5: true,
        onload: () => {
            // format progress bar
            progressBar.style.setProperty(
                "--max",
                this.format(this.howl.duration())
            );
            progressBar.setAttribute("max", this.format(this.howl.duration()));
            progressBar.style.setProperty("--min", 0);
            progressBar.style.setProperty("--value", 0);
            // Display total duration.
            duration.innerHTML = this.formatTime(
                this.format(this.howl.duration())
            );
            console.log(this.howl);
        },
        onplay: () => {
            playBtn.style.display = "none";
            pauseBtn.style.display = "block";
            requestAnimationFrame(this.step.bind(this));
        },
        onend: () => {
            // reset the play pause button
            playBtn.style.display = "block";
            pauseBtn.style.display = "none";
            // reset the progress bar
            progressBar.style.setProperty("--value", 0);
        },
    });

    // convert string into number and formate as round value like: 25, 54, 99
    this.format = function (a) {
        return Math.round(Number(a));
    };

    // play the current track
    this.play = function () {
        // play the current track
        this.howl.play();
        // control play and pause button
        playBtn.style.display = "none";
        pauseBtn.style.display = "block";
    };

    // pause the current track
    this.pause = function () {
        // Puase the current track
        this.howl.pause();
        // control play and pause button
        playBtn.style.display = "block";
        pauseBtn.style.display = "none";
    };

    // control play state (duration, progress bar )
    this.step = function (e) {
        // Determine our current seek position.
        var seek = this.howl.seek() || 0;
        // timer.innerHTML = this.formatTime(this.format(sound));
        // progress.style.width = (((seek / sound.duration()) * 100) || 0) + '%';
        // set progress bar value
        progressBar.style.setProperty("--value", this.format(seek));
        progressBar.value = this.format(seek);
        // update the elapsed time
        elapsedTime.innerHTML = this.formatTime(this.format(seek));
        // If the sound is still playing, continue stepping.
        if (this.howl.playing()) {
            // requestAnimationFrame(self.step.bind(self));
            requestAnimationFrame(this.step.bind(this));
        }
    };

    // volume control btn
    this.volume = function (volData) {
        // determine our current sound volume
        this.howl.mute(!this.howl.mute());
    };
    // control player playing speed
    this.playbackSpeed = function (data) {
        // set the user data
        this.howl.rate(data);
    };

    this.progressHandler = function (indicator, dataValue) {
        // progress start stop condition
        if (indicator === "start") {
            // pause the sound
            this.howl.pause();
            // change range value based user input
            progressBar.style.setProperty("--value", this.format(dataValue));
            progressBar.value = this.format(dataValue);
        } else if (indicator === "stop") {
            // apply the user change value
            this.howl.seek(this.format(dataValue));
            // play the sound after change the progress
            this.howl.play();
        }
    };
    // formate the sec based on munite and sec
    this.formatTime = function (secs) {
        var minutes = Math.floor(secs / 60) || 0;
        var seconds = secs - minutes * 60 || 0;
        return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
    };
}

// Setup our new audio player class and pass it the playlist.
var player = new Player({
    file: "https://res.cloudinary.com/n3pu/video/upload/v1571849541/80s_vibe.mp3",
    howl: null,
});

// Bind our player controls.
playBtn.addEventListener("click", function () {
    // player.play();
    player.play();
});
pauseBtn.addEventListener("click", function () {
    player.pause();
});
sound.addEventListener("click", () => {
    player.volume();
});
audioSpeed.addEventListener("change", (e) => {
    player.playbackSpeed(e.target.value);
});
// progress bar event
progressBar.addEventListener("change", (e) => {
    player.progressHandler("stop", e.target.value);
});

progressBar.addEventListener("input", (e) => {
    player.progressHandler("start", e.target.value);
});
