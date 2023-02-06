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
    const durationElement = document.querySelector("#duration1");
    durationElement.innerHTML = formatTime(Math.round(audio1.duration()));
    // update the progress bar
    const progress1 = document.querySelector("#progress1");
    progress1.setAttribute("max", audio1._duration);
    progress1.style.setProperty("--max", audio1._duration);
    progress1.style.setProperty("--min", 0);
    progress1.style.setProperty("--value", 0);
    progress1.addEventListener("input", (e) => progress1.style.setProperty("--value", e.target.value));
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
            console.log(timer);

            progress1.setAttribute("value", timer);
            // progress1.setProperty("--value", timer);
            timer++;
            console.log(audio1.seek() > timer);
            // if (Math.round(audio1.seek()) <= timer) {
            //   timer = 1;
            //   clearInterval(timerFunction);
            // }
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
        clearInterval(timerFunction);
        timer = e.target.value;
        progress1.setAttribute("value", e.target.value);
        audio1.seek(e.target.value);
        // start new timer
        timerFunction = setInterval(() => {
            // progress1.setAttribute("value", timer);
            progress1.value = timer;
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
        pauseBtn1.style.display = "none";
        play1.style.display = "block";
    });
});
