// function formatTime(secs) {
//     var minutes = Math.floor(secs / 60) || 0;
//     var seconds = secs - minutes * 60 || 0;
//     return (
//         (minutes < 10 ? "0" : "") +
//         minutes +
//         ":" +
//         (seconds < 10 ? "0" : "") +
//         seconds
//     );
// }

// // let podcasts = document.querySelectorAll(".custom-podcast-section");

// // if (podcasts.length) {
//     //console.log(podcasts)
//     // podcasts.forEach((podcast) => {
//         //console.log(podcast.id)
//         var timer = 0;
//         var timerFunction;
//         // audio loader for liquid -----
//         // var wrapperID = document.querySelector(`#${podcast.id}`);
//         // var audio_src = wrapperID.dataset.src;
//         // audio loader for development -----
//         var wrapperID = document.querySelector(".audio-player");
//         var audio_src = 'assets/audio.mp3';
//         var audio = new Howl({
//             src: `${audio_src}`,
//             html5: true,
//         });

//         audio.once("load", function () {
//             //console.log('loaded audio')
//             //console.log(wrapperID)
//             // update duration

//             var durationElement = wrapperID.querySelector(
//                 ".audio-duration-second"
//             );
//             durationElement.innerHTML = formatTime(
//                 Math.round(audio.duration())
//             );

//             var elapsedTimeElement = wrapperID.querySelector(
//                 ".audio-duration-elapsed"
//             );
//             elapsedTimeElement.innerHTML = formatTime(0);

//             // update the progress bar
//             var progress1 = wrapperID.querySelector(".duration-slider");
//             progress1.setAttribute("max", audio._duration);
//             progress1.style.setProperty("--max", audio._duration);
//             progress1.style.setProperty("--min", 0);
//             progress1.style.setProperty("--value", 0);
//             progress1.setAttribute("value", timer);
//             progress1.disabled = true;

//             // play
//             var play1 = wrapperID.querySelector(".play-btn");
//             var pauseBtn1 = wrapperID.querySelector(".pause-btn");

//             //console.log(progress1)

//             play1.addEventListener("click", () => {
//                 audio.play();
//                 play1.style.display = "none";
//                 pauseBtn1.style.display = "block";
//                 progress1.disabled = false;

//                 // start timer function
//                 timerFunction = setInterval(() => {
//                     // update timer
//                     // console.log(timer);

//                     progress1.setAttribute("value", timer);
//                     progress1.style.setProperty("--value", timer);
//                     timer++;

//                     elapsedTimeElement.innerHTML = formatTime(
//                         Math.round(timer)
//                     );
//                 }, 1000);
//             });

//             // pause
//             pauseBtn1.addEventListener("click", () => {
//                 audio.pause();
//                 pauseBtn1.style.display = "none";
//                 play1.style.display = "block";
//                 progress1.disabled = true;
//                 // clear interval
//                 clearInterval(timerFunction);
//             });

//             // change progress bar on interaction
//             var changing = false;

//             progress1.addEventListener("input", (e) => {
//                 progress1.style.setProperty("--value", e.target.value);
//                 changing = true;
//             });

//             // change progress bar on interaction

//             progress1.addEventListener("change", (e) => {
//                 audio.pause();
//                 clearInterval(timerFunction);
//                 audio.seek(e.target.value);
//                 audio.play();
//                 timer = e.target.value;

//                 elapsedTimeElement.innerHTML = formatTime(Math.round(timer));

//                 // start new timer
//                 timerFunction = setInterval(() => {
//                     if (!changing) {
//                         progress1.value = timer;
//                         progress1.style.setProperty("--value", timer);
//                     }
//                     // update current timer
//                     timer++;
//                     elapsedTimeElement.innerHTML = formatTime(
//                         Math.round(timer)
//                     );
//                 }, 1000);
//             });

//             // change speed of audio
//             var speed = wrapperID.querySelector(".audio-speed");
//             speed.addEventListener("change", (e) => {
//                 audio.rate(e.target.value);
//             });

//             // mute and unmute function
//             var sound = wrapperID.querySelector(".audio-sound");
//             sound.addEventListener("click", () => {
//                 // self.formatTime(Math.round(sound.duration()));
//                 // console.log(formatTime(Math.round(audio.duration())));
//                 if (audio._muted) {
//                     audio.mute(false);
//                     sound.classList.remove("down");
//                     sound.classList.add("up");
//                 } else {
//                     audio.mute(true);
//                     sound.classList.add("down");
//                     sound.classList.remove("up");
//                 }
//             });

//             audio.on("end", function () {
//                 timer = 0;
//                 clearInterval(timerFunction);
//                 audio.seek(0);
//                 pauseBtn1.style.display = "none";
//                 play1.style.display = "block";
//                 progress1.value = timer;
//                 progress1.disabled = true;
//                 elapsedTimeElement.innerHTML = formatTime(Math.round(timer));
//             });

//             audio.on("seek", () => {
//                 changing = false;
//                 elapsedTimeElement.innerHTML = formatTime(
//                     Math.round(audio.seek())
//                 );
//                 progress1.style.setProperty(
//                     "--value",
//                     Math.round(audio.seek())
//                 );
//             });
//         });
//     // });
// // }

// // progress bar setter
// for (let e of document.querySelectorAll(
//     'input[type="range"].slider-progress'
// )) {
//     e.style.setProperty("--value", e.value);
//     e.style.setProperty("--min", e.min == "" ? "0" : e.min);
//     e.style.setProperty("--max", e.max == "" ? "100" : e.max);
//     e.addEventListener("input", () => e.style.setProperty("--value", e.value));
// }

// ------------------------------------------ new architechture
/*!
 *  Howler.js Audio Player Demo
 *  howlerjs.com
 *
 *  (c) 2013-2019, James Simpson of GoldFire Studios
 *  goldfirestudios.com
 *
 *  MIT License
 */

// Cache references to DOM elements.
// var elms = [
//     "track",
//     "title",
//     "subtitle",
//     "timer",
//     "duration",
//     "playBtn",
//     "pauseBtn",
//     "progress",
//     "thumb",
//     "c-thumb",
// ];
var wrapperID = document.querySelector(".audio-player");
const playBtn = document.querySelector("#playBtn");
const pauseBtn = document.querySelector("#pauseBtn");
const progressBar = document.querySelector("#progress");
const audioDuration = document.querySelector(".audio-duration");
const elapsedTime = document.querySelector("#current-time");
const duration = document.querySelector("#duration");
const audioSpeed = document.querySelector("#speed");
const sound = document.querySelector("#speed");



elms.forEach(function (elm) {
    window[elm] = document.getElementById(elm);
});

var Player = function (playlist) {
    this.playlist = playlist;
    this.index = 0;

    // Display the title of the first track.
    title.innerHTML = playlist[0].title;
    subtitle.innerHTML = playlist[0].subtitle;
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
                    thumb.classList.add("spin");
                    c_thumb.classList.add("shadow");
                    track.classList.add("up");
                    // Start upating the progress of the track.
                    requestAnimationFrame(self.step.bind(self));
                },
            });
        }

        // Begin playing the sound.
        sound.play();

        // Update the track display.
        title.innerHTML = data.title;
        subtitle.innerHTML = data.subtitle;

        // Show the pause button.
        if (sound.state() === "loaded") {
            playBtn.style.display = "none";
            pauseBtn.style.display = "block";
            thumb.classList.add("spin");
            c_thumb.classList.add("shadow");
            track.classList.add("up");
        } else {
            playBtn.style.display = "none";
            pauseBtn.style.display = "block";
            thumb.classList.remove("spin");
            c_thumb.classList.remove("shadow");
            track.classList.remove("up");
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
        thumb.classList.remove("spin");
        c_thumb.classList.remove("shadow");
        track.classList.remove("up");
    },

    /**
     * The step called within requestAnimationFrame to update the playback position.
     */
    step: function () {
        var self = this;

        // Get the Howl we want to manipulate.
        var sound = self.playlist[self.index].howl;

        // Determine our current seek position.
        var seek = sound.seek() || 0;
        timer.innerHTML = self.formatTime(Math.round(seek));
        progress.style.width = ((seek / sound.duration()) * 100 || 0) + "%";

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
