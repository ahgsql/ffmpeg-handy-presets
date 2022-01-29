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
      await   new Promise((resolve, reject) => {
        ffmpeg(files[0])
        .videoCodec("libx265")
        .output(klasor + "/" + filename +"_.mp4").addOption("-crf 20")
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
          resolve()
        }).run();
      });
    
    } catch (error) {
      console.log(error);
    }
  }else{
    try {
      for (const file of files) {
        let fileinfo = path.parse(file);
        let klasor = fileinfo.dir;
        let filename = fileinfo.name;
        let out = 0;
        await   new Promise((resolve, reject) => {
          ffmpeg(file)
          .videoCodec("libx265")
          .output(klasor + "/" + filename + "_.mp4").addOption("-crf 20").addOption("-preset ultrafast")
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
            resolve()
          }).run();
        });

      }

    
    } catch (error) {
      console.log(error);
    }
  }
};

module.exports = worker;
