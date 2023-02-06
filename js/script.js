var timer = 0;

var timerFunction;

var audio1 = new Howl({
    src: "../assets/audio.mp3",
});

audio1.once("load", function () {
    // update duration
    function formatTime(secs) {
        var minutes = Math.floor(secs / 60) || 0;
        var seconds = secs - minutes * 60 || 0;
        return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
    }
    const durationElement = document.querySelector("#duration");
    const currentTime = document.querySelector("#current-time");
    durationElement.innerHTML = formatTime(Math.round(audio1.duration()));
    // update the progress bar
    const progress = document.querySelector("#progress");
    progress.setAttribute("max", audio1._duration);
    progress.style.setProperty("--max", audio1._duration);
    progress.style.setProperty("--min", 0);
    progress.style.setProperty("--value", 0);
    progress.disabled = true;
    // progress.addEventListener("input", (e) =>
    //     progress.style.setProperty("--value", e.target.value)
    // );

    // timer

    // play
    const play1 = document.querySelector("#playBtn");
    const pauseBtn = document.querySelector("#pauseBtn");

    play1.addEventListener("click", () => {
        audio1.play();
        play1.style.display = "none";
        pauseBtn.style.display = "block";
        progress.disabled = false;
        // start timer function
        timerFunction = setInterval(() => {
            // update timer
            console.log(" timer on interval", timer);
            progress.setAttribute("value", timer);
            progress.style.setProperty("--value", timer);
            // update current time
            currentTime.innerHTML = formatTime(timer);
            timer++;
        }, 1000);
    });

    // pause
    pauseBtn.addEventListener("click", () => {
        audio1.pause();
        pauseBtn.style.display = "none";
        play1.style.display = "block";
        progress.disabled = true;
        // clear interval
        clearInterval(timerFunction);
    });

    // change progress bar on interaction

    progress.addEventListener("input", (e) => {
        progress.style.setProperty("--value", e.target.value);
    });

    progress.addEventListener("change", (e) => {
        audio1.pause();
        clearInterval(timerFunction);
        audio1.seek(e.target.value);
        audio1.play();
        timer = e.target.value;
        // update progress
        timerFunction = setInterval(() => {
            // update timer
            progress.value = timer;
            progress.style.setProperty("--value", timer);
            // update current time
            currentTime.innerHTML = formatTime(Math.round(audio1.seek()));
            timer++;
        }, 1000);
    });

    // change speed of audio
    const speed = document.querySelector("#speed1");
    speed.addEventListener("change", (e) => {
        audio1.rate(e.target.value);
    });

    // mute and unmute function
    const sound = document.querySelector("#sound1");
    sound.addEventListener("click", () => {
        // duration
        function formatTime(secs) {
            var minutes = Math.floor(secs / 60) || 0;
            var seconds = secs - minutes * 60 || 0;
            return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
        }
        // self.formatTime(Math.round(sound.duration()));
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

    audio1.on("end", function () {
        timer = 0;
        clearInterval(timerFunction);
        pauseBtn.style.display = "none";
        play1.style.display = "block";
        progress.style.setProperty("--value", 0);
        progress.value = timer;
        progress.disabled = "true";
    });

    audio1.on("seek", () => {
        currentTime.innerHTML = formatTime(Math.round(audio1.seek()));
        progress.style.setProperty("--value", Math.round(audio1.seek()));
    });
});

console.log(audio1);
