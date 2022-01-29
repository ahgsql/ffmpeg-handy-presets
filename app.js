const dialog = require("node-file-dialog");

const { findNearest, initCli,getFilesFromFolder } = require("./helpers");
let { multiple, preset } = initCli();
if (preset &&preset.length > 2) {
  preset = findNearest(preset, getFilesFromFolder("./presets"));
  console.log(preset);
}
let isyap = async () => {
  let fileDialogConfig;
  if (multiple) {
    fileDialogConfig = { type: "open-files" };
  } else {
    fileDialogConfig = { type: "open-file" };
  }
  if(preset=="imgSequenceToMp4"){
    fileDialogConfig={type:'directory'}
  }
  let files = await dialog(fileDialogConfig);
  let isci=require('./presets/'+preset+".js");
  isci(multiple,files);
  return;
};

if (preset != "") {
  isyap();
}
