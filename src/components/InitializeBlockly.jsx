import Blockly from 'blockly';

const InitializeBlockly = (toolboxXml) => {
  return Blockly.inject('blocklyDiv', {
    toolbox: toolboxXml,
    zoom: {
      controls: true,
      wheel: true,
      startScale: 1.0,
      maxScale: 3,
      minScale: 0.3,
      scaleSpeed: 1.2,
      pinch: true,
    },
    grid: {
      spacing: 20,
      length: 3,
      colour: "#ccc",
      snap: true,
    },
    trashcan: false,
    move: {
      scrollbars: true,
      drag: true,
      wheel: true,
    },
  });
};

export default InitializeBlockly;
