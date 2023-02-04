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
                    // track.classList.add("up");
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
            // track.classList.add("up");
        } else {
            playBtn.style.display = "none";
            pauseBtn.style.display = "block";
            thumb.classList.remove("spin");
            c_thumb.classList.remove("shadow");
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
        thumb.classList.remove("spin");
        c_thumb.classList.remove("shadow");
        // track.classList.remove("up");
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
        timer.innerHTML = self.formatTime(Math.round(seek));
        progress.setAttribute("value", (sound.seek() / sound.duration()) * 100 || 0);
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
