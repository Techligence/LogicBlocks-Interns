// Looks.js
import { Block } from '@mui/icons-material';
import Blockly from 'blockly';
import { javascriptGenerator } from 'blockly/javascript';

Blockly.Blocks['hide'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('hide');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
  }
};

Blockly.Blocks['show'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('show');

    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
  }
};

Blockly.Blocks['sayforsecs'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('say');

    this.appendValueInput('MESSAGE')
      .appendField('message')
      .setCheck('String');

    this.appendValueInput('SECS')
      .appendField('for')
      .setCheck('Number');

    this.appendDummyInput()
      .appendField('seconds');

    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
  }
};

Blockly.Blocks['say'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('say');

    this.appendValueInput('MESSAGE')
      .appendField('message')
      .setCheck('String');

    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    // this.setOutputs(true, null);
  }
};

Blockly.Blocks['thinkforsecs'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('think');

    this.appendValueInput('MESSAGE')
      .appendField('message')
      .setCheck('String');

    this.appendValueInput('SECS')
      .appendField('for')
      .setCheck('Number');

    this.appendDummyInput()
      .appendField('seconds');

    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
  }
};

Blockly.Blocks['think'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('think');

    this.appendValueInput('MESSAGE')
      .appendField('message')
      .setCheck('String');

    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
  }
};

Blockly.Blocks['changesizeby'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('change size by');

    this.appendValueInput('SIZE')
      .setCheck('Number');

    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
  }
};

Blockly.Blocks['setsizeto'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('set size to');

    this.appendValueInput('SIZE')
      .setCheck('Number');

    this.appendDummyInput()
      .appendField('%');

    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
  }
};

Blockly.Blocks['goforbacklayers'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Go to");

    this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown([
        ["forward", 'FORWARD'],
        ["backward", 'BACKWARD'],
      ]), 'LAYER')
      .appendField("layers")

    this.setColour(230);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
  }
};

Blockly.Blocks['gotolayersby'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Go");

    this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown([
        ["forward", 'FORWARD'],
        ["backward", 'BACKWARD'],
      ]), 'LAYER')

    this.appendValueInput('NUMLAYERS')
      .setCheck('Number')

    this.appendDummyInput()
      .appendField("layers")

    this.setColour(230);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
  }
};

//Setting Up all the Javascript Generators for the blocks
javascriptGenerator.forBlock['show'] = function (block) {
  return 'show();\n';
};

javascriptGenerator.forBlock['hide'] = function (block) {
  return `hide();\n`;
};

javascriptGenerator.forBlock['setsizeto'] = function (block) {
  const size = javascriptGenerator.valueToCode(block, 'SIZE', javascriptGenerator.ORDER_NONE);
  return `changeSize(${size});\n`;
};

javascriptGenerator.forBlock['changesizeby'] = function (block) {
  const size = javascriptGenerator.valueToCode(block, 'SIZE', javascriptGenerator.ORDER_NONE);
  return `changeSizeBy(${size});\n`;
};

javascriptGenerator.forBlock['sayforsecs'] = function (block) {
  const message = javascriptGenerator.valueToCode(block, 'MESSAGE', javascriptGenerator.ORDER_NONE);
  const secs = javascriptGenerator.valueToCode(block, 'SECS', javascriptGenerator.ORDER_NONE);

  if(!message || !secs || secs <= 0){
    return '';
  }

  return `saywithdelay(${message}, ${secs});\n`;
}

javascriptGenerator.forBlock['say'] = function (block) {
  const message = javascriptGenerator.valueToCode(block, 'MESSAGE', javascriptGenerator.ORDER_NONE);
  return `saywithdelay(${message}, 0);\n`;
}

javascriptGenerator.forBlock['thinkforsecs'] = function (block) {
  const message = javascriptGenerator.valueToCode(block, 'MESSAGE', javascriptGenerator.ORDER_NONE);
  const secs = javascriptGenerator.valueToCode(block, 'SECS', javascriptGenerator.ORDER_NONE);

  if(!message || !secs || secs <= 0){
    return '';
  }

  return `thinkwithdelay(${message}, ${secs});\n`;
}

javascriptGenerator.forBlock['think'] = function (block) {
  const message = javascriptGenerator.valueToCode(block, 'MESSAGE', javascriptGenerator.ORDER_NONE);
  return `thinkwithdelay(${message}, 0);\n`;
}

//Setting Up all the functions called in the blocks
export const changeSize = (size) => {
  const spriteimg = document.getElementById('sprite-container');
  spriteimg.style.scale = `${size}%`;
}

export const changeSizeBy = (size) => {
  const spriteimg = document.getElementById('sprite-container');

  const parheight = parseFloat(spriteimg.parentElement.style.height);
  const parwidth = parseFloat(spriteimg.parentElement.style.width);

  const percheight = parseFloat(spriteimg.style.height.substring(0, spriteimg.style.height.length - 1));
  const percwidth = parseFloat(spriteimg.style.width.substring(0, spriteimg.style.width.length - 1));

  const hinpx = parheight * percheight / 100;
  const winpx = parwidth * percwidth / 100;

  spriteimg.style.height = `${hinpx + size}px`;
  spriteimg.style.width = `${winpx + size}px`;
}

export const show = () => {
  const spriteimg = document.getElementById('sprite-container');
  spriteimg.style.display = 'block';
}

export const hide = () => {
  const spriteimg = document.getElementById('sprite-container');
  spriteimg.style.display = 'none';
}

export const saywithdelay = (message, secs) => {
  if(message.length === 0){
    alert("Please enter a Message");
    return;
  }

  const spriteimg = document.getElementById('sprite-container');
  const divnode = document.createElement('div');
  const textnode = document.createTextNode(message);
  divnode.appendChild(textnode);
  divnode.id = 'message';
  spriteimg.appendChild(divnode);

  divnode.style = `height: auto; 
                    width: 5rem; 
                    border: 1px solid black; 
                    text-align: center; 
                    padding-top: 5px; 
                    padding-bottom: 5px;
                    position: absolute; 
                    top: 0; 
                    right: 0; 
                    border-radius: 10px;`

  if(secs === 0) return;

  setTimeout(() => {
    divnode.remove();
  }, secs * 1000);
}

export const thinkwithdelay = (message, secs) => {
  if(message.length === 0){
    alert("Please enter a Message");
    return;
  }

  const spriteimg = document.getElementById('sprite-container');
  const divnode = document.createElement('div');
  const textnode = document.createTextNode(message);
  divnode.appendChild(textnode);
  divnode.id = 'message';
  spriteimg.appendChild(divnode);

  divnode.style = `height: auto; 
                    width: 5rem; 
                    border: 1px solid black; 
                    text-align: center; 
                    padding-top: 5px; 
                    padding-bottom: 5px;
                    position: absolute; 
                    top: 0; 
                    right: 0; 
                    border-radius: 10px;`

  if(secs === 0) return;

  setTimeout(() => {
    divnode.remove();
  }, secs * 1000);
}