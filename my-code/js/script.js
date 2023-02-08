function formatTime(secs) {
    var minutes = Math.floor(secs / 60) || 0;
    var seconds = secs - minutes * 60 || 0;
    return (
        (minutes < 10 ? "0" : "") +
        minutes +
        ":" +
        (seconds < 10 ? "0" : "") +
        seconds
    );
}

// let podcasts = document.querySelectorAll(".custom-podcast-section");

// if (podcasts.length) {
    //console.log(podcasts)
    // podcasts.forEach((podcast) => {
        //console.log(podcast.id)
        var timer = 0;
        var timerFunction;
        // audio loader for liquid -----
        // var wrapperID = document.querySelector(`#${podcast.id}`);
        // var audio_src = wrapperID.dataset.src;
        // audio loader for development -----
        var wrapperID = document.querySelector(".audio-player");
        var audio_src = 'assets/audio.mp3';
        var audio = new Howl({
            src: `${audio_src}`,
            html5: true,
        });

        audio.once("load", function () {
            //console.log('loaded audio')
            //console.log(wrapperID)
            // update duration

            var durationElement = wrapperID.querySelector(
                ".audio-duration-second"
            );
            durationElement.innerHTML = formatTime(
                Math.round(audio.duration())
            );

            var elapsedTimeElement = wrapperID.querySelector(
                ".audio-duration-elapsed"
            );
            elapsedTimeElement.innerHTML = formatTime(0);

            // update the progress bar
            var progress1 = wrapperID.querySelector(".duration-slider");
            progress1.setAttribute("max", audio._duration);
            progress1.style.setProperty("--max", audio._duration);
            progress1.style.setProperty("--min", 0);
            progress1.style.setProperty("--value", 0);
            progress1.setAttribute("value", timer);
            progress1.disabled = true;

            // play
            var play1 = wrapperID.querySelector(".play-btn");
            var pauseBtn1 = wrapperID.querySelector(".pause-btn");

            //console.log(progress1)

            play1.addEventListener("click", () => {
                audio.play();
                play1.style.display = "none";
                pauseBtn1.style.display = "block";
                progress1.disabled = false;

                // start timer function
                timerFunction = setInterval(() => {
                    // update timer
                    // console.log(timer);

                    progress1.setAttribute("value", timer);
                    progress1.style.setProperty("--value", timer);
                    timer++;

                    elapsedTimeElement.innerHTML = formatTime(
                        Math.round(timer)
                    );
                }, 1000);
            });

            // pause
            pauseBtn1.addEventListener("click", () => {
                audio.pause();
                pauseBtn1.style.display = "none";
                play1.style.display = "block";
                progress1.disabled = true;
                // clear interval
                clearInterval(timerFunction);
            });

            // change progress bar on interaction
            var changing = false;

            progress1.addEventListener("input", (e) => {
                progress1.style.setProperty("--value", e.target.value);
                changing = true;
            });

            // change progress bar on interaction

            progress1.addEventListener("change", (e) => {
                audio.pause();
                clearInterval(timerFunction);
                audio.seek(e.target.value);
                audio.play();
                timer = e.target.value;

                elapsedTimeElement.innerHTML = formatTime(Math.round(timer));

                // start new timer
                timerFunction = setInterval(() => {
                    if (!changing) {
                        progress1.value = timer;
                        progress1.style.setProperty("--value", timer);
                    }
                    // update current timer
                    timer++;
                    elapsedTimeElement.innerHTML = formatTime(
                        Math.round(timer)
                    );
                }, 1000);
            });

            // change speed of audio
            var speed = wrapperID.querySelector(".audio-speed");
            speed.addEventListener("change", (e) => {
                audio.rate(e.target.value);
            });

            // mute and unmute function
            var sound = wrapperID.querySelector(".audio-sound");
            sound.addEventListener("click", () => {
                // self.formatTime(Math.round(sound.duration()));
                // console.log(formatTime(Math.round(audio.duration())));
                if (audio._muted) {
                    audio.mute(false);
                    sound.classList.remove("down");
                    sound.classList.add("up");
                } else {
                    audio.mute(true);
                    sound.classList.add("down");
                    sound.classList.remove("up");
                }
            });

            audio.on("end", function () {
                timer = 0;
                clearInterval(timerFunction);
                audio.seek(0);
                pauseBtn1.style.display = "none";
                play1.style.display = "block";
                progress1.value = timer;
                progress1.disabled = true;
                elapsedTimeElement.innerHTML = formatTime(Math.round(timer));
            });

            audio.on("seek", () => {
                changing = false;
                elapsedTimeElement.innerHTML = formatTime(
                    Math.round(audio.seek())
                );
                progress1.style.setProperty(
                    "--value",
                    Math.round(audio.seek())
                );
            });
        });
    // });
// }

// progress bar setter 
for (let e of document.querySelectorAll(
    'input[type="range"].slider-progress'
)) {
    e.style.setProperty("--value", e.value);
    e.style.setProperty("--min", e.min == "" ? "0" : e.min);
    e.style.setProperty("--max", e.max == "" ? "100" : e.max);
    e.addEventListener("input", () => e.style.setProperty("--value", e.value));
}
