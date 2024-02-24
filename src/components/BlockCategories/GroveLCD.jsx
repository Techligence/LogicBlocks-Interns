import Blockly from 'blockly';
export const GroveLCD = `
<category name="Grove LCD" colour="#5c81a6">
    <block type="grove_serial_lcd_print"></block>
    <block type="grove_serial_lcd_power"></block>
    <block type="grove_serial_lcd_effects"></block>
</category>
`;

Blockly.Blocks['grove_serial_lcd_print'] = {
    // helpUrl: 'http://www.seeedstudio.com/wiki/index.php?title=GROVE_-_Starter_Bundle_V1.0b#Serial_LCD',
    init: function() {
      this.setColour(190);
      this.appendDummyInput()
          .appendField("Serial LCD")
          // .appendField(new Blockly.FieldImage("http://www.seeedstudio.com/wiki/images/thumb/6/6a/LCD1.jpg/400px-LCD1.jpg", 64, 64))
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
          // .appendField(new Blockly.FieldImage("http://www.seeedstudio.com/wiki/images/thumb/6/6a/LCD1.jpg/400px-LCD1.jpg", 64, 64))
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
          // .appendField(new Blockly.FieldImage("http://www.seeedstudio.com/wiki/images/thumb/6/6a/LCD1.jpg/400px-LCD1.jpg", 64, 64))
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
  
  
  