const levenshtein = require("js-levenshtein");
const commandLineArgs = require("command-line-args");
const commandLineUsage = require("command-line-usage");
const chalk = require("chalk");
const fs=require('fs');
const path=require('path');
function findNearest(str, array) {
  let min = 999999999;
  let minIndex = 0;
  for (let i = 0; i < array.length; i++) {
    let distance = levenshtein(str, array[i]);
    if (distance < min) {
      min = distance;
      minIndex = i;
    }
  }
  return array[minIndex];
}

function initCli() {
  const optionDefinitions = [
    { name: "preset", alias: "p", type: String, defaultValue: "",description:"Available operations: "+getFilesFromFolder("./presets").join(', ') },
    {
      name: "help",
      alias: "h",
      description: "Display this usage guide.",
      type: Boolean,
      defaultValue: false,
    },
    { name: "multiple", alias: "m", type: Boolean, defaultValue: false,description:"Process multiple files" },
  ];
  const sections = [
    {
      header: chalk.red(`
          █▀▀ █▀▀   █▀▄▀█ █▀█ █▀▀ █▀▀  
          █▀░ █▀░   █░▀░█ █▀▀ ██▄ █▄█  
          
          ▀█▀ █▀█ █▀█ █░░ █▀
          ░█░ █▄█ █▄█ █▄▄ ▄█`),
      content: chalk.blueBright(
        "Handy Video & Audio & Image Tools with presets for FFMPEG."
      ),
    },
    {
      header: "Commands",
      optionList: optionDefinitions,
    },
  ];
  const usage = commandLineUsage(sections);

  const options = commandLineArgs(optionDefinitions);

  let { multiple, preset, help } = options;
  if (help) {
    console.log(usage);
  }
  return { multiple, preset, help };
}

function getFilesFromFolder(dir){
  return fs.readdirSync(dir, {withFileTypes: true})
.filter(item => !item.isDirectory())
.map(item => path.parse(item.name).name)
}

//a function that takes string and split return last item
function getLastItem(str,delimeter="_") {
  return str.split(delimeter).pop();
}
module.exports = { findNearest, initCli,getFilesFromFolder,getLastItem };
