const ffmpeg = require("fluent-ffmpeg");
const path = require("path");
const chalk = require("chalk");

const worker = async (multiple, files) => {
  if (!multiple) {
    try {
      let fileinfo = path.parse(files[0]);
      let klasor = fileinfo.dir;
      let filename = fileinfo.name;
      let out = 0;
      var command = ffmpeg(files[0])
        .videoCodec("libvpx-vp9")
        .output(klasor + "/" + filename + "_processed.webm")
        .on("progress", function (progress) {
          let percent = progress.percent.toFixed(2);
          if (percent / 15 > out) {
            console.log(
              "Processing " +
                chalk.blue(filename + fileinfo.ext) +
                " : " +
                chalk.green(percent + "%")
            );
            out++;
          }
        }).on("end", function () {
          console.log(chalk.red("Done"));
        });
      command.run();
    } catch (error) {
      console.log(error);
    }
  }
};

module.exports = worker;
