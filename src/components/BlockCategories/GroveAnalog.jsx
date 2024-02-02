import Blockly from 'blockly';
import { javascriptGenerator } from "blockly/javascript";
Blockly.JavaScript = javascriptGenerator;
import { pythonGenerator } from "blockly/python";
Blockly.Python = pythonGenerator;

import 'blockly-arduino/blocks'
import * as Arduino from 'blockly-arduino/arduino'


export const GroveAnalog = `
<category name="Grove Analog" colour="#5c81a6">
    <block type="grove_rotary_angle"></block> 
    <block type="grove_temporature_sensor"></block> 
    <block type="grove_sound_sensor"></block>
    <block type="grove_thumb_joystick"></block>
</category>
`;

Blockly.Blocks['grove_thumb_joystick'] = {
    // helpUrl: 'http://www.seeedstudio.com/wiki/Grove_-_Thumb_Joystick',
    init: function() {
      this.setColour(10);
      this.appendDummyInput()
      .appendField("Thumb Joystick")
          // .appendField(new Blockly.FieldImage("http://www.seeedstudio.com/wiki/images/thumb/e/e0/Twig_-_Thumb_Joystick_v0.9b.jpg/200px-Twig_-_Thumb_Joystick_v0.9b.jpg", 64, 64))
      .appendField("PIN#")
          // .appendField(new Blockly.FieldDropdown(profile.default.analog), "PIN")
          .appendField("axis")
          .appendField(new Blockly.FieldDropdown([["x", "x"],  ["y", "y"]]), "AXIS");
      this.setOutput(true, 'Number');
  this.setTooltip('output two analog values(200~800) representing two directions');
    }
  };

  Blockly.Blocks['grove_sound_sensor'] = {
    // helpUrl: 'http://www.seeedstudio.com/wiki/Grove_-_Sound_Sensor',
    init: function() {
      this.setColour(10);
      this.appendDummyInput()
          .appendField("Sound Sensor")
          // .appendField(new Blockly.FieldImage("http://www.seeedstudio.com/wiki/images/thumb/e/e3/Twig-Sound-sensor.jpg/400px-Twig-Sound-sensor.jpg", 64, 64))
          .appendField("PIN#")
          // .appendField(new Blockly.FieldDropdown(profile.default.analog), "PIN")
      this.setOutput(true, 'Number');
      this.setTooltip('Detect the sound strength of the environment');
    }
  };

  Blockly.Blocks['grove_temporature_sensor'] = {
    // helpUrl: 'http://www.seeedstudio.com/wiki/Project_Seven_-_Temperature',
    init: function() {
      this.setColour(10);
      this.appendDummyInput()
          .appendField("Temporature Sensor")
          // .appendField(new Blockly.FieldImage("http://www.seeedstudio.com/wiki/images/thumb/b/b0/Temperature1.jpg/400px-Temperature1.jpg", 64, 64))
          .appendField("PIN#")
          // .appendField(new Blockly.FieldDropdown(profile.default.analog), "PIN")
      this.setOutput(true, 'Number');
      this.setTooltip('return number of ambient temperature in ℃');
    }
  };
  Blockly.Blocks['grove_rotary_angle'] = {
    init: function() {
        this.setColour(10);
        this.appendDummyInput()
            .appendField("Rotary Angle")
            .appendField("Axis")
            .appendField(new Blockly.FieldDropdown([["x", "x"], ["y", "y"]]), "AXIS");
        this.setOutput(true, 'Number');
        this.setTooltip('Analog output between 0 and Vcc');
    }
};
  Blockly.JavaScript['grove_thumb_joystick'] = function(block) {
    var pin = block.getFieldValue('PIN');
    var axis = block.getFieldValue('AXIS');
  
    var code = `readThumbJoystick(${pin}, "${axis}")`;
    return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
  };
  
  Blockly.JavaScript['grove_sound_sensor'] = function(block) {
    var pin = block.getFieldValue('PIN');
  
    var code = `readSoundSensor(${pin})`;
    return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
  };
  
  Blockly.JavaScript['grove_temporature_sensor'] = function(block) {
    var pin = block.getFieldValue('PIN');
  
    var code = `readTemperatureSensor(${pin})`;
    return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
  };
  
  Blockly.JavaScript['grove_rotary_angle'] = function(block) {
    var pin = block.getFieldValue('PIN');
  
    var code = `readRotaryAngle(${pin})`;
    return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
  };
  
  Blockly.Python['grove_thumb_joystick'] = function(block) {
    var pin = block.getFieldValue('PIN');
    var axis = block.getFieldValue('AXIS');
  
    var code = `readThumbJoystick(${pin}, "${axis}")`;
    return [code, Blockly.Python.ORDER_FUNCTION_CALL];
  };
  
  Blockly.Python['grove_sound_sensor'] = function(block) {
    var pin = block.getFieldValue('PIN');
  
    var code = `readSoundSensor(${pin})`;
    return [code, Blockly.Python.ORDER_FUNCTION_CALL];
  };
  
  Blockly.Python['grove_temporature_sensor'] = function(block) {
    var pin = block.getFieldValue('PIN');
  
    var code = `readTemperatureSensor(${pin})`;
    return [code, Blockly.Python.ORDER_FUNCTION_CALL];
  };
  
  Blockly.Python['grove_rotary_angle'] = function(block) {
    var pin = block.getFieldValue('PIN');
  
    var code = `readRotaryAngle(${pin})`;
    return [code, Blockly.Python.ORDER_FUNCTION_CALL];
  };
  





  // ========================== Arduino Code ==========================
  Arduino['grove_thumb_joystick'] = function () {
    var pin = this.getFieldValue('PIN#');
    var axis = this.getFieldValue('AXIS');
    var code = 'analogRead(' + pin + ' + ' + (axis === 'x' ? 'A0' : 'A1') + ')';  // Adjust pin numbers as needed
    console.log("Arduino" + code);
    return code;
};

Arduino['grove_sound_sensor'] = function () {
  var pin = this.getFieldValue('PIN#');
  var code = 'analogRead(' + pin + ')';
  console.log("Arduino" + code);
  return code;
};


Arduino['grove_temporature_sensor'] = function () {
  var pin = this.getFieldValue('PIN#');
  var code = 'analogRead(' + pin + ')';
  console.log("Arduino" + code);
  return code;
};

Arduino['grove_rotary_angle'] = function () {
  var axis = this.getFieldValue('AXIS');
  var code = 'analogRead(' + (axis === 'x' ? 'A0' : 'A1') + ')';
  console.log("Arduino" + code);
  return code;
};