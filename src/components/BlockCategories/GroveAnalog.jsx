import Blockly from 'blockly';
export const GroveAnalog = `
<category name="Grove Analog" colour="#5c81a6">
    <block type="grove_rotary_angle"></block> 
    <block type="grove_temporature_sensor"></block> 
    <block type="grove_sound_sensors"></block>
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
    // helpUrl: 'http://www.seeedstudio.com/wiki/index.php?title=GROVE_-_Starter_Bundle_V1.0b#Potentiometer',
    init: function() {
      this.setColour(10);
      this.appendDummyInput()
          .appendField("Rotary Angle")
          // .appendField(new Blockly.FieldImage("http://www.seeedstudio.com/wiki/images/thumb/5/59/Potentiometer1.jpg/400px-Potentiometer1.jpg", 64, 64))
          .appendField("PIN#")
          // .appendField(new Blockly.FieldDropdown(profile.default.analog), "PIN");
      this.setOutput(true, 'Number');
      this.setTooltip('Analog output between 0 and Vcc');
    }
  };  