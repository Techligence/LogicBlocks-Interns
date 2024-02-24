import Blockly from 'blockly';
export const Grove = `
<category name="Grove" colour="#5c81a6">
    <block type="grove_led"></block>
    <block type="grove_button"></block>
    <block type="grove_tilt_switch"></block>
    <block type="grove_piezo_buzzer"></block>
    <block type="grove_relay"></block>
    <block type="grove_pir_motion_sensor"></block>
    <block type="grove_line_finder"></block>
    <block type="grove_ultrasonic_ranger"></block>
    <block type="grove_motor_shield"></block>
    <block type="grove_rgb_led"></block>
    <block type="grove_rgb_led_container"></block>
    <block type="grove_rgb_led_item"></block>
    <block type="grove_bluetooth_slave"></block>
</category>
`;

Blockly.Blocks['grove_led'] = {
  // helpUrl: 'http://www.seeedstudio.com/wiki/index.php?title=GROVE_-_Starter_Bundle_V1.0b#LED',
  init: function() {
    this.setColour(190);
    this.appendDummyInput()
        .appendField("LED")
        // .appendField(new Blockly.FieldImage("http://www.seeedstudio.com/wiki/images/thumb/e/e0/LED1.jpg/400px-LED1.jpg", 64, 64))
        .appendField("PIN#")
        // .appendField(new Blockly.FieldDropdown(profile.default.digital), "PIN")
        .appendField("stat")
        .appendField(new Blockly.FieldDropdown([["HIGH", "HIGH"], ["LOW", "LOW"]]), "STAT");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('green LED');
  }
};

Blockly.Blocks['grove_button'] = {
  // helpUrl: 'http://www.seeedstudio.com/wiki/index.php?title=GROVE_-_Starter_Bundle_V1.0b#Button',
  init: function() {
    this.setColour(190);
    this.appendDummyInput()
        .appendField("Button")
        // .appendField(new Blockly.FieldImage("http://www.seeedstudio.com/wiki/images/thumb/9/93/Button1.jpg/400px-Button1.jpg", 64, 64))
        .appendField("PIN#")
        // .appendField(new Blockly.FieldDropdown(profile.default.digital), "PIN");
    this.setOutput(true, 'Boolean');
    this.setTooltip('Basic digital input');
  }
};



Blockly.Blocks['grove_tilt_switch'] = {
  // helpUrl: 'http://www.seeedstudio.com/wiki/index.php?title=GROVE_-_Starter_Bundle_V1.0b#Tilt_switch',
  init: function() {
    this.setColour(190);
    this.appendDummyInput()
        .appendField("Tilt Switch")
        // .appendField(new Blockly.FieldImage("http://www.seeedstudio.com/wiki/images/thumb/9/95/Tilt1.jpg/400px-Tilt1.jpg", 64, 64))
        .appendField("PIN#")
        // .appendField(new Blockly.FieldDropdown(profile.default.digital), "PIN");
    this.setOutput(true, 'Boolean');
    this.setTooltip('When the switch is level it is open, and when tilted, the switch closes.');
  }
};

Blockly.Blocks['grove_piezo_buzzer'] = {
  // helpUrl: 'http://www.seeedstudio.com/wiki/GROVE_-_Starter_Kit_V1.1b#Grove_.E2.80.93_Buzzer',
  init: function() {
    this.setColour(190);
    this.appendDummyInput()
        .appendField("Piezo Buzzer")
        // .appendField(new Blockly.FieldImage("http://www.seeedstudio.com/wiki/images/thumb/e/ed/Buzzer1.jpg/400px-Buzzer1.jpg", 64, 64))
        .appendField("PIN#")
        // .appendField(new Blockly.FieldDropdown(profile.default.digital), "PIN")
        .appendField("stat")
        .appendField(new Blockly.FieldDropdown([["HIGH", "HIGH"], ["LOW", "LOW"]]), "STAT");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Emit a tone when the output is high');
  }
};

Blockly.Blocks['grove_relay'] = {
  // helpUrl: 'http://www.seeedstudio.com/wiki/Grove_-_Relay',
  init: function() {
    this.setColour(190);
    this.appendDummyInput()
        .appendField("Relay")
        // .appendField(new Blockly.FieldImage("http://www.seeedstudio.com/wiki/images/thumb/0/04/Twig-Relay1.jpg/400px-Twig-Relay1.jpg", 64, 64))
        .appendField("PIN#")
        // .appendField(new Blockly.FieldDropdown(profile.default.digital), "PIN")
        .appendField("stat")
        .appendField(new Blockly.FieldDropdown([["HIGH", "HIGH"], ["LOW", "LOW"]]), "STAT");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('capable of switching a much higher voltages and currents. The maximum voltage and current that can be controlled by this module upto 250V at 10 amps.');
  }
};



Blockly.Blocks['grove_pir_motion_sensor'] = {
  // helpUrl: 'http://www.seeedstudio.com/wiki/Grove_-_PIR_Motion_Sensor',
  init: function() {
    this.setColour(190);
    this.appendDummyInput()
        .appendField("PIR Motion Sensor")
        // .appendField(new Blockly.FieldImage("http://www.seeedstudio.com/wiki/images/thumb/f/fd/Twig-PIR_Motion_Sensor.jpg/400px-Twig-PIR_Motion_Sensor.jpg", 64, 64))
        .appendField("PIN#")
        // .appendField(new Blockly.FieldDropdown(profile.default.digital), "PIN")
    this.setOutput(true, 'Number');
    this.setTooltip('When anyone moves in it\'s detecting range, the sensor outputs HIGH.');
  }
};

Blockly.Blocks['grove_line_finder'] = {
  // helpUrl: 'http://www.seeedstudio.com/wiki/Grove_-_Line_Finder',
  init: function() {
    this.setColour(190);
    this.appendDummyInput()
        .appendField("Line Finder")
        // .appendField(new Blockly.FieldImage("http://www.seeedstudio.com/wiki/images/thumb/8/82/Grovelinefinder1.jpg/400px-Grovelinefinder1.jpg", 64, 64))
	      .appendField("PIN#")
	      // .appendField(new Blockly.FieldDropdown(profile.default.digital), "PIN");
    this.setOutput(true, 'Boolean');
    this.setTooltip('Output digital signal so the robot can reliably follow a black line on a white background');
  }
};

Blockly.Blocks['grove_ultrasonic_ranger'] = {
  // helpUrl: 'http://www.seeedstudio.com/wiki/Grove_-_Ultrasonic_Ranger',
  init: function() {
    this.setColour(190);
    this.appendDummyInput()
	      .appendField("Ultrasonic Ranger")
        // .appendField(new Blockly.FieldImage("http://www.seeedstudio.com/wiki/images/thumb/b/b0/Twig_-_Ultrasonic_Ranger2.jpg/200px-Twig_-_Ultrasonic_Ranger2.jpg", 64, 64))
	      .appendField("PIN#")
        // .appendField(new Blockly.FieldDropdown(profile.default.digital), "PIN")
        .appendField("unit")
        .appendField(new Blockly.FieldDropdown([["cm", "cm"],  ["inch", "inch"]]), "UNIT");
    this.setOutput(true, 'Boolean');
    this.setTooltip('Non-contact distance measurement module');
  }
};


Blockly.Blocks['grove_rgb_led'] = {
  // helpUrl: 'http://www.seeedstudio.com/wiki/index.php?title=Twig_-_Chainable_RGB_LED',
  init: function() {
    this.setColour(190);
    this.appendDummyInput()
  .appendField("Chainable RGB LED")
        // .appendField(new Blockly.FieldImage("http://www.seeedstudio.com/depot/images/product/chanbalelednb1.jpg", 64, 64))
  .appendField("PIN#")
        // .appendField(new Blockly.FieldDropdown(profile.default.digital), "PIN")
    this.appendDummyInput("COLOR0")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Color 1")
        .appendField(new Blockly.FieldColour("#00ff00"), "RGB0");
    this.setMutator(new Blockly.Mutator(['grove_rgb_led_item']));
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('256 color LED, currently Chainable feature is not support');
    this.itemCount_ = 1;
  },
  mutationToDom: function() {
    var container = document.createElement('mutation');
    container.setAttribute('items', this.itemCount_);
    for (var x = 0; x < this.itemCount_; x++) {
      var colour_rgb = this.getFieldValue('RGB0');
      //alert(colour_rgb);
      container.setAttribute('RGB' + x, colour_rgb);
    }
    return container;
  },
  domToMutation: function(xmlElement) {
    for (var x = 0; x < this.itemCount_; x++) {
      this.removeInput('COLOR' + x);
    }
    this.itemCount_ = window.parseInt(xmlElement.getAttribute('items'), 10);
    for (var x = 0; x < this.itemCount_; x++) {
      var color = window.parseInt(xmlElement.getAttribute('RGB'+x), "#00ff00");
      var input = this.appendDummyInput('COLOR' + x);
      //if (x == 0) {
        input.setAlign(Blockly.ALIGN_RIGHT)
             .appendField("Color "+(x+1))
             .appendField(new Blockly.FieldColour(color), "RGB" + x);
      //}
    }
    if (this.itemCount_ == 0) {
      this.appendDummyInput('COLOR0')
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField("Color 1")
          .appendField(new Blockly.FieldColour("#00ff00"), "RGB0");
    }
  },
  decompose: function(workspace) {
    var containerBlock = Blockly.Block.obtain(workspace,
                                              'grove_rgb_led_container');
    containerBlock.initSvg();
    var connection = containerBlock.getInput('STACK').connection;
    for (var x = 0; x < this.itemCount_; x++) {
      var itemBlock = Blockly.Block.obtain(workspace, 'grove_rgb_led_item');
      itemBlock.initSvg();
      connection.connect(itemBlock.previousConnection);
      connection = itemBlock.nextConnection;
    }
    return containerBlock;
  },
  compose: function(containerBlock) {
    // Disconnect all input blocks and remove all inputs.
    if (this.itemCount_ == 0) {
      this.removeInput('COLOR0');
    } else {
      for (var x = this.itemCount_ - 1; x >= 0; x--) {
        //console.log("cnt:"+x);
        this.removeInput('COLOR' + x);
      }
    }
    /*var top;
    if(this.itemCount_ > 0){
      top = this.itemCount_-1;
    } else {
      top = 0;
    }
    console.log("top:"+top);*/
    this.itemCount_ = 0;
    // Rebuild the block's inputs.
    var itemBlock = containerBlock.getInputTargetBlock('STACK');
    while (itemBlock) {
      var colour_rgb = this.getFieldValue('RGB' + this.itemCount_);
      if(colour_rgb==null){
          colour_rgb = "00ff00";
      }
      //console.log("blk:"+this.itemCount_);
      /*if(top>this.itemCount_){
        this.removeInput('COLOR' + this.itemCount_);
      }*/
      var input = this.appendDummyInput('COLOR' + this.itemCount_);
      //if (this.itemCount_ == 0) {
        input.setAlign(Blockly.ALIGN_RIGHT)
             .appendField("Color " + (this.itemCount_+1))
             .appendField(new Blockly.FieldColour(colour_rgb), "RGB" + this.itemCount_);
      //}
      // Reconnect any child blocks.
      if (itemBlock.valueConnection_) {
        input.connection.connect(itemBlock.valueConnection_);
      }
      this.itemCount_++;
      itemBlock = itemBlock.nextConnection &&
          itemBlock.nextConnection.targetBlock();
    }
    if (this.itemCount_ == 0) {
      this.appendDummyInput('COLOR0')
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField("Color 1")
          .appendField(new Blockly.FieldColour("#00ff00"), "RGB0");
    }
  }
  /*saveConnections: function(containerBlock) {
    // Store a pointer to any connected child blocks.
    var itemBlock = containerBlock.getInputTargetBlock('STACK');
    var x = 0;
    while (itemBlock) {
      var input = this.getInput('COLOR' + x);
      itemBlock.valueConnection_ = input && input.connection.targetConnection;
      x++;
      itemBlock = itemBlock.nextConnection &&
          itemBlock.nextConnection.targetBlock();
    }
  }*/
};

Blockly.Blocks['grove_rgb_led_container'] = {
  // Container.
  init: function() {
    this.setColour(190);
    this.appendDummyInput()
        .appendField("Container");
    this.appendStatementInput('STACK');
    this.setTooltip("Add, remove items to reconfigure this chain");
    this.contextMenu = false;
  }
};

Blockly.Blocks['grove_rgb_led_item'] = {
  // Add items.
  init: function() {
    this.setColour(190);
    this.appendDummyInput()
        .appendField("Item");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip("Add an item to the chain");
    this.contextMenu = false;
  }
};

Blockly.Blocks['grove_bluetooth_slave'] = {
  category: 'Network',
  // helpUrl: 'http://www.seeedstudio.com/wiki/Grove_-_Serial_Bluetooth',
  init: function() {
    this.setColour(190);
    this.appendDummyInput()
      .appendField("Bluetooth Slave")
      // .appendField(new Blockly.FieldImage("http://www.seeedstudio.com/wiki/File:Twigbt00.jpg", 64, 64))
      .appendField("PIN#")
      // .appendField(new Blockly.FieldDropdown(profile.default.digital), "PIN")
    this.appendDummyInput()
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField("Name")
      .appendField(new Blockly.FieldTextInput('blocklyduino'), 'NAME');
    this.appendDummyInput()
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField("Pincode")
      .appendField(new Blockly.FieldTextInput('0000'), 'PINCODE');
    this.appendStatementInput("RCV")
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField("Receive");
    this.appendStatementInput("SNT")
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField("Send");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Bluetooth V2.0+EDR slave. Support single slave per board');
  }
};