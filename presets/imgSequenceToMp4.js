const ffmpeg = require("fluent-ffmpeg");
const chalk = require("chalk");
const { getLastItem } = require("../helpers");
var fs = require("fs");
var dialog = require("dialog-node");
//will be called after user closes the dialog

const worker = async (multiple, files) => {
  if (!multiple) {
    try {
      var randomFile = fs.readdirSync(files[0])[0];
      let framePattern = getLastItem(randomFile, "_").length - 4;
      let pattern = "%0" + framePattern + "d";
      var lastIndex = randomFile.lastIndexOf("_");
      var startName = randomFile.slice(0, lastIndex + 1);
      let fps = 25;
      let out=0;
      var callback = async function (code, retVal, stderr) {
        fps = retVal;
        ffmpeg()
          .addInput(files[0] + "/" + startName + pattern + ".jpg")
          .inputFPS(fps)
          .output(files[0] + "/"+startName+".mp4").on("progress", function (progress) {
            let percent = progress.percent.toFixed(2);
            if (percent / 5> out) {
              console.log(
                "Processing " +
                  chalk.blue(files[0]) +
                  " : " +
                  chalk.green(percent + "%")
              );
              out++;
            }
          })
          .on("end", function () {
            console.log("Jpegs to mp4 conversion done !");
          })
          .run();
      };
      dialog.entry("Please Type FPS in Numbers", "FPS", 0, callback);
    } catch (error) {
      //console.log(error);
    }
  }
};

module.exports = worker;
