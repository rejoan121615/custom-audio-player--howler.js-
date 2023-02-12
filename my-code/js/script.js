// re-usable global player object 
function Player({
    file,
    playBtn,
    pauseBtn,
    progressBar,
    elapsedTime,
    duration,
    sound,
    soundController,
}) {
    this.howl = new Howl({
        src: file,
        html5: true,
        defer: true, // control the lazy loading
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
    this.volume = function (value) {
        // control volume
        this.howl.volume(Number((1 / 100) * value).toFixed(2));
        // control progress bar
        soundController.style.setProperty("--value", this.format(value));
        // control sound icon
        const iconList = sound.querySelectorAll(".icon");
        if (value > 0) {
            iconList.forEach((icon, index) => {
                icon.style.backgroundImage = "url('assets/volume-up.png')";
            });
        } else {
            iconList.forEach((icon, index) => {
                icon.style.backgroundImage = "url('assets/volume-down.png')";
            });
        }
    };
    // control player playing speed
    this.playbackSpeed = function (data) {
        // set the user data
        this.howl.rate(data);
    };

    // control user progress control
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

// select all cutom podcast section
// update your podcast id --------------------------------------------------------------------------
let podcasts = document.querySelectorAll(".custom-podcast-section"); 
if (podcasts.length) {
    // loop over podcast
    podcasts.forEach((podcast) => {
        // parent podcast
        const wrapperTag = document.querySelector(`#${podcast.id}`);
        // all tag selector
        const playBtn = wrapperTag.querySelector("#playBtn");
        const pauseBtn = wrapperTag.querySelector("#pauseBtn");
        const progressBar = wrapperTag.querySelector("#progress");
        const audioDuration = wrapperTag.querySelector(".audio-duration");
        const elapsedTime = wrapperTag.querySelector("#current-time");
        const duration = wrapperTag.querySelector("#duration");
        const audioSpeed = wrapperTag.querySelector("#speed");
        const sound = wrapperTag.querySelector("#sound");
        const soundController = wrapperTag.querySelector("#sound-control");
        var audio_src = wrapperTag.dataset.src;
        // // create player object
        var player = new Player({
            file: `${audio_src}`,
            // pass all the tag name to the player object
            playBtn,
            pauseBtn,
            progressBar,
            elapsedTime,
            duration,
            sound,
            soundController,
        });

        // Bind our player controls.
        playBtn.addEventListener("click", function () {
            // player.play();
            player.play();
        });
        pauseBtn.addEventListener("click", function () {
            player.pause();
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

        // sound control event
        soundController.addEventListener("input", (e) => {
            // console.log(((1 / 100) * e.target.value).toFixed(2));
            player.volume(e.target.value);
        });

        // custom handler function for separate prodcust 
        
    });
}
