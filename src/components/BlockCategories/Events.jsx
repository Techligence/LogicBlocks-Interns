import Blockly from 'blockly';

// Block for event trigger.
Blockly.Blocks['event_trigger'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("when")
      .appendField(new Blockly.FieldTextInput("Event_Name"), "EVENT_NAME")
      .appendField("is triggered");
    this.setNextStatement(true, null);
    this.setColour(300);
  }
};

// Block for KEY_PRESSED event trigger.
Blockly.Blocks['key_press_event'] = {
    init: function () {
      this.appendDummyInput()
        .appendField("When")
        .appendField(new Blockly.FieldDropdown([
          ['SPACE', 'KEY_SPACE'],
          ['A', 'KEY_A'],
          ['B', 'KEY_B'],
          ['C', 'KEY_C'],
          
        ]), 'KEY_NAME')
      .appendField("key is pressed");
    this.setNextStatement(true, null);
    this.setColour(300);
  }
};
  
// Block for SPRITE_CLICK event trigger.
Blockly.Blocks['sprite_clicked_event'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("When this sprite clicked");
    this.setNextStatement(true, null);
    this.setColour(300);
  }
};

// Block for FLAG_CLICKED event trigger.
Blockly.Blocks['flag_clicked_event'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("When flag clicked");
    this.setNextStatement(true, null);
    this.setColour(300);
  }
};


// Block for BACKDROP_SWITCH event trigger.
Blockly.Blocks['when_backdrop_switches_to'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("When backdrop switches to")
      .appendField(new Blockly.FieldDropdown([
        ['Backdrop1', 'BACKDROP1'],
        // ['Backdrop2', 'BACKDROP2'],
        // ['Backdrop3', 'BACKDROP3'],
        // Add more backdrops as needed...
      ]), 'BACKDROP_NAME');
    this.setNextStatement(true, null);
    this.setColour(300);
  }
};

// Block for DROPDOWN_GREATER-THAN event trigger.
Blockly.Blocks['when_dropdown_greater_than_input'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("When")
      .appendField(new Blockly.FieldDropdown([
        ['Loudness', 'OPTION1'],
        ['Timer', 'OPTION2'],
        // ['Option 3', 'OPTION3'],
        // Add more dropdown options as needed...
      ]), 'DROPDOWN_NAME')
      .appendField(">")
      .appendField(new Blockly.FieldNumber(0), 'INPUT_VALUE');
    this.setNextStatement(true, null);
    this.setColour(300);
  }
};

// Block for WHEN_I_RECEIVE_MESSAGE event trigger.
Blockly.Blocks['when_i_receive_dropdown'] = {
  init: function () {
    this.messageOptions = [
      ['New Message', 'NEW_MESSAGE'],
      // Add more existing options here...
      ['Message1', 'BACKDROP1'],
    ];

    this.appendDummyInput()
      .appendField("When I receive")
      .appendField(new Blockly.FieldDropdown(this.generateDropdownOptions.bind(this)), 'BACKDROP_NAME');
    this.setNextStatement(true, null);
    this.setColour(300);

    // Set the initial value of the dropdown to 'Message1'
    this.getField('BACKDROP_NAME').setValue('BACKDROP1');
  },

  generateDropdownOptions: function () {
    return this.messageOptions;
  },

  onchange: function (event) {
    if (event.element == 'field' && event.name == 'BACKDROP_NAME') {
      let dropdownValue = this.getFieldValue('BACKDROP_NAME');
      if (dropdownValue === 'NEW_MESSAGE') {
        let newMessage = prompt('Enter the new message:');
        if (newMessage !== null && newMessage.trim() !== '') {
          let messageKey = newMessage.toUpperCase().replace(/\s/g, '_');

          // Find the index of 'Message1' in the options array
          let message1Index = this.messageOptions.findIndex(option => option[1] === 'BACKDROP1');
          
          // Insert the new message between 'New Message' and 'Message1'
          this.messageOptions.splice(message1Index, 0, [newMessage, messageKey]);
          this.getField('BACKDROP_NAME').setValue(messageKey);
          this.getField('BACKDROP_NAME').setOptions(this.messageOptions);
        }
      }
    }
  }
};


// Block for BROADCAST event trigger.
Blockly.Blocks['broadcast'] = {
  init: function () {
    this.messageOptions = [
      ['New Message', 'NEW_MESSAGE'],
      // Add more existing options here...
      ['Message1', 'BACKDROP1'],
    ];

    this.appendDummyInput()
      .appendField("Broadcast")
      .appendField(new Blockly.FieldDropdown(this.generateDropdownOptions.bind(this)), 'BACKDROP_NAME');
    this.setNextStatement(true, null);
    this.setColour(300);

    // Set initial value of dropdown to Message1
    this.getField('BACKDROP_NAME').setValue('BACKDROP1');
  },

  generateDropdownOptions: function () {
    return this.messageOptions;
  },

  onchange: function (event) {
    if (event.element == 'field' && event.name == 'BACKDROP_NAME') {
      let dropdownValue = this.getFieldValue('BACKDROP_NAME');
      if (dropdownValue === 'NEW_MESSAGE') {
        let newMessage = prompt('Enter the new message:');
        if (newMessage !== null && newMessage.trim() !== '') {
          let messageKey = newMessage.toUpperCase().replace(/\s/g, '_');

          // Find the index of 'Message1' in the options array
          let message1Index = this.messageOptions.findIndex(option => option[1] === 'BACKDROP1');
          
          // Insert the new message between 'New Message' and 'Message1'
          this.messageOptions.splice(message1Index, 0, [newMessage, messageKey]);
          this.getField('BACKDROP_NAME').setValue(messageKey);
          this.getField('BACKDROP_NAME').setOptions(this.messageOptions);
        }
      }
    }
  }
};



// Block for BROADCAST_MESSAGE_AND_WAIT event trigger.
Blockly.Blocks['broadcast_message_and_wait'] = {
  init: function () {
    this.messageOptions = [
      ['New Message', 'NEW_MESSAGE'],
      // Add more existing options here...
      ['Message1', 'BACKDROP1'],
    ];

    this.appendDummyInput()
      .appendField("Broadcast")
      .appendField(new Blockly.FieldDropdown(this.generateDropdownOptions.bind(this)), 'BACKDROP_NAME')
      .appendField("and wait");
    this.setNextStatement(true, null);
    this.setColour(300);

    // Set initial value of dropdown to Message1
    this.getField('BACKDROP_NAME').setValue('BACKDROP1');
  },

  generateDropdownOptions: function () {
    return this.messageOptions;
  },

  onchange: function (event) {
    if (event.element == 'field' && event.name == 'BACKDROP_NAME') {
      let dropdownValue = this.getFieldValue('BACKDROP_NAME');
      if (dropdownValue === 'NEW_MESSAGE') {
        let newMessage = prompt('Enter the new message:');
        if (newMessage !== null && newMessage.trim() !== '') {
          let messageKey = newMessage.toUpperCase().replace(/\s/g, '_');
          // Find the index of 'Message1' in the options array
          let message1Index = this.messageOptions.findIndex(option => option[1] === 'BACKDROP1');
          
          // Insert the new message between 'New Message' and 'Message1'
          this.messageOptions.splice(message1Index, 0, [newMessage, messageKey]);
          this.getField('BACKDROP_NAME').setValue(messageKey);
          this.getField('BACKDROP_NAME').setOptions(this.messageOptions);
        }
      }
    }
  }
};


export const Events = `
  <category name="Events" colour="#FFD600" categorystyle="event_category">
      <block type="flag_clicked_event"></block>
      <block type="key_press_event"></block>
      <block type="sprite_clicked_event"></block>
      <block type="when_backdrop_switches_to"></block>
      <block type="when_dropdown_greater_than_input"></block>
      <block type="when_i_receive_dropdown"></block>
      <block type="broadcast"></block>
      <block type="broadcast_message_and_wait"></block>
      <!-- Other event blocks go here... -->
  </category>
  `