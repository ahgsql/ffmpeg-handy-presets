const ffmpeg = require("fluent-ffmpeg");
const path = require("path");

const worker = async (multiple, files) => {
  if (!multiple) {
    try {
      let fileinfo = path.parse(files[0]);
      let dir = fileinfo.dir;
      var command = ffmpeg(files[0])
        .on("filenames", function (filenames) {
          console.log(filenames.join(", ") + " will be created.");
        })
        .on("end", function () {
          console.log("Done");
        })
        .screenshots({
          count: 2,
          folder: dir,
        });
      command.run();
    } catch (error) {
      //console.log(error);
    }
  }
};

module.exports = worker;
