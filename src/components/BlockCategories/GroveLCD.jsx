import Blockly from 'blockly';
import { javascriptGenerator } from "blockly/javascript";
Blockly.JavaScript = javascriptGenerator;
import { pythonGenerator } from "blockly/python";
Blockly.Python = pythonGenerator;

import 'blockly-arduino/blocks'
import * as Arduino from 'blockly-arduino/arduino'

export const GroveLCD = `
<category name="Grove LCD" colour="#5c81a6">
    <block type="grove_serial_lcd_print"></block>
    <block type="grove_serial_lcd_power"></block>
    <block type="grove_serial_lcd_effect"></block>
</category>
`;

Blockly.Blocks['grove_serial_lcd_print'] = {
    // helpUrl: 'http://www.seeedstudio.com/wiki/index.php?title=GROVE_-_Starter_Bundle_V1.0b#Serial_LCD',
    init: function() {
      this.setColour(190);
      this.appendDummyInput()
          .appendField("Serial LCD")
          .appendField(new Blockly.FieldImage("https://statics3.seeedstudio.com/images/product/Serial%20LCD.jpg", 64, 64))
          .appendField("PIN#")
          // .appendField(new Blockly.FieldDropdown(profile.default.digital), "PIN");
      this.appendValueInput("TEXT", 'String')
          .setCheck('String')
          // .setAlign(Blockly.ALIGN_RIGHT)
          .appendField("print line1");
      this.appendValueInput("TEXT2", 'String')
          .setCheck('String')
          // .setAlign(Blockly.ALIGN_RIGHT)
          .appendField("print line2")
      this.appendValueInput("DELAY_TIME", 'Number')
          .setCheck('Number')
          // .setAlign(Blockly.ALIGN_RIGHT)
          .appendField("Delay");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setTooltip('print text on an 16 character by 2 line LCD.');
    }
  };
  
  //grove lcd power on/off
  Blockly.Blocks['grove_serial_lcd_power'] = {
    // helpUrl: 'http://www.seeedstudio.com/wiki/index.php?title=GROVE_-_Starter_Bundle_V1.0b#LED',
    init: function() {
      this.setColour(190);
      this.appendDummyInput()
          .appendField("Serial LCD")
          .appendField(new Blockly.FieldImage("https://statics3.seeedstudio.com/images/product/Serial%20LCD.jpg", 64, 64))
          .appendField("PIN#")
          // .appendField(new Blockly.FieldDropdown(profile.default.digital), "PIN");
      this.appendDummyInput()
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField("Power")
          .appendField(new Blockly.FieldDropdown([["ON", "ON"], ["OFF", "OFF"]]), "STAT");
          this.gap = 20;
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setTooltip('Turn LCD power on/off');
    }
  };
  
  //scroll left/right/no scroll/blink/noblink
  Blockly.Blocks['grove_serial_lcd_effect'] = {
    // helpUrl: 'http://www.seeedstudio.com/wiki/index.php?title=GROVE_-_Starter_Bundle_V1.0b#LED',
    init: function() {
      this.setColour(190);
      this.appendDummyInput()
          .appendField("Serial LCD")
          .appendField(new Blockly.FieldImage("https://statics3.seeedstudio.com/images/product/Serial%20LCD.jpg", 64, 64))
          .appendField("PIN#")
          // .appendField(new Blockly.FieldDropdown(profile.default.digital), "PIN");
      this.appendDummyInput()
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField("Effect")
          
          .appendField(new Blockly.FieldDropdown([["Scroll Left", "LEFT"], ["Scroll Right", "RIGHT"], ["Scroll Auto", "AUTO"]]), "STAT");
          this.gap = 20;
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setTooltip('Turn LCD power on/off');
    }
  };
  Blockly.JavaScript['grove_serial_lcd_print'] = function(block) {
    var pin = block.getFieldValue('PIN');
    var textLine1 = Blockly.JavaScript.valueToCode(block, 'TEXT', Blockly.JavaScript.ORDER_ATOMIC);
    var textLine2 = Blockly.JavaScript.valueToCode(block, 'TEXT2', Blockly.JavaScript.ORDER_ATOMIC);
    var delayTime = Blockly.JavaScript.valueToCode(block, 'DELAY_TIME', Blockly.JavaScript.ORDER_ATOMIC) || 0;
  
    var code = `printLCD(${pin}, ${textLine1}, ${textLine2}, ${delayTime});\n`;
    return code;
  };
  
  Blockly.JavaScript['grove_serial_lcd_power'] = function(block) {
    var pin = block.getFieldValue('PIN');
    var status = block.getFieldValue('STAT');
  
    var code = `setLCDPower(${pin}, "${status}");\n`;
    return code;
  };
  
  Blockly.JavaScript['grove_serial_lcd_effect'] = function(block) {
    var pin = block.getFieldValue('PIN');
    var effect = block.getFieldValue('STAT');
  
    var code = `setLCDEffect(${pin}, "${effect}");\n`;
    return code;
  };
  
  
  Blockly.Python['grove_serial_lcd_print'] = function(block) {
    var pin = block.getFieldValue('PIN');
    var textLine1 = Blockly.Python.valueToCode(block, 'TEXT', Blockly.Python.ORDER_ATOMIC);
    var textLine2 = Blockly.Python.valueToCode(block, 'TEXT2', Blockly.Python.ORDER_ATOMIC);
    var delayTime = Blockly.Python.valueToCode(block, 'DELAY_TIME', Blockly.Python.ORDER_ATOMIC) || 0;
  
    var code = `printLCD(${pin}, ${textLine1}, ${textLine2}, ${delayTime})\n`;
    return code;
  };
  
  Blockly.Python['grove_serial_lcd_power'] = function(block) {
    var pin = block.getFieldValue('PIN');
    var status = block.getFieldValue('STAT');
  
    var code = `setLCDPower(${pin}, "${status}")\n`;
    return code;
  };
  
  Blockly.Python['grove_serial_lcd_effect'] = function(block) {
    var pin = block.getFieldValue('PIN');
    var effect = block.getFieldValue('STAT');
  
    var code = `setLCDEffect(${pin}, "${effect}")\n`;
    return code;
  };


// ============================== Arduino Code ============================
Arduino['grove_serial_lcd_print'] = function () {
  var pin = this.getFieldValue('PIN#');
  var text1 = Blockly.Arduino.valueToCode(this, 'TEXT', Blockly.Arduino.ORDER_ATOMIC) || "\"\"";
  var text2 = Blockly.Arduino.valueToCode(this, 'TEXT2', Blockly.Arduino.ORDER_ATOMIC) || "\"\"";
  var delayTime = Blockly.Arduino.valueToCode(this, 'DELAY_TIME', Blockly.Arduino.ORDER_ATOMIC) || "0";

  var code = 'groveSerialLCD.print(' + pin + ', ' + text1 + ', ' + text2 + ');\n';
  code += 'delay(' + delayTime + ');\n';
  console.log("Arduino" + code);
  return code;
};

Arduino['grove_serial_lcd_power'] = function () {
  var pin = this.getFieldValue('PIN#');
  var stat = this.getFieldValue('STAT');

  var code = 'groveSerialLCD.power(' + pin + ', "' + stat + '");\n';
  console.log("Arduino" + code);
  return code;
};

Arduino['grove_serial_lcd_effect'] = function () {
  var pin = this.getFieldValue('PIN#');
  var stat = this.getFieldValue('STAT');

  var code = 'groveSerialLCD.effect(' + pin + ', "' + stat + '");\n';
  console.log("Arduino" + code);
  return code;
};
