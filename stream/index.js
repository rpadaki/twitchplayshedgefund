const config = require("../config");
const { spawn } = require("child_process");
var N = 44100;

console.log(config);
while (1);
// prettier-ignore
var ffmpeg = spawn("ffmpeg", [
    "-loop", "1",
    "-framerate", "15",
    "-i", "image.jpg",
    "-f", "s16le",
    "-ar", "" + N,
    "-ac", "1",
    "-i", "pipe:0",
    "-c:v", "libx264",
    "-tune", "stillimage",
    "-pix_fmt", "yuv420p",
    "-b:v", "1000k",
    "-minrate", "1000k",
    "-maxrate", "1000k",
    "-c:a", "libmp3lame",
    "-f", "flv",
    "rtmp://" + config.twitchstream.endpoint + ".twitch.tv/app/" + config.twitchstream.streamkey
]);

// ffmpeg.stdout.on("data", function(data) {
//     console.log("stdout: " + data.toString());
// });

// ffmpeg.stderr.on("data", function(data) {
//     console.log("stderr: " + data.toString());
// });

// 2 bytes needed to store signed 16-bit little-endian int
var buf = Buffer(2);
var ratio = Math.pow(2, 1 / 12);
var notes = [...Array(13).keys()].map(i =>
    Math.floor(242 * Math.pow(ratio, i))
);
var scale = [0, 2, 4, 5, 7, 9, 11, 12].map(i => notes[i]);
var vol = 10000;
scale.push(0);
var music = [0, 1, 2, 3, 4, 5, 3, 4, 1, 2, 6];
var song = music.map(i => scale[i]);
// for (n = 0; n < N; ++n) {
//     buf.writeInt16LE(Math.floor(vol * Math.sin(((400 * n) / N) * 2 * Math.PI)));
//     // console.log(buf, vol * Math.sin(((400 * n) / N) * 2 * Math.PI));
//     ffmpeg.stdin.write(buf);
// }

function playSong() {
    for (t = 0; t < song.length; ++t) {
        for (n = 0; n < N / 2; ++n) {
            buf.writeInt16LE(
                Math.floor(
                    vol * Math.sin((song[t] * n * 2 * Math.PI) / (N / 2)) +
                        (vol / 2) *
                            Math.sin((song[t + 2] * n * 2 * Math.PI) / (N / 2))
                )
            );
            process.stdout.write(buf);
        }
    }
}
for (i = 0; i < 5; ++i) {
    playSong();
}
process.stdout.end();

// setInterval(playSong, 500 * song.length);
ffmpeg.stdin.end();

// instrument = function() {
//     var time = (Date.now() - start) / 1000;
// };

// // console.log("not yet");
// // page.open(url, status => {
// //     console.log("yet");
// //     var svg = page.evaluate(svgDrawer);
// //     console.log(typeof svg);
// //     console.log(svg);
// // });
