import Blockly from "blockly";
import { javascriptGenerator } from "blockly/javascript";
import { pythonGenerator } from "blockly/python";

export const Motion = `
  <category name="Motion" colour="#5c81a6">
    <block type="move_steps"></block>
    <block type="turn_right"></block>
    <block type="turn_left"></block>
    <block type="point_in_direction"></block>
    <block type="point_toward_menu"></block>
    <block type="go_to_menu"></block>
    <block type="go_to_xy"></block>
    <block type="glidesecstoxy"></block>
    <block type="glidesecstomenu"></block>
    <block type="changexby"></block>
    <block type="changeyby"></block>
    <block type="setxto"></block>
    <block type="setyto"></block>
    <block type="if_on_edge_bounce"></block>
    <block type="set_rotation_style"></block>
  </category>
`;

// Block Injection
Blockly.Blocks["move_steps"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Move")
      .appendField(new Blockly.FieldNumber(10), "STEPS")
      .appendField("steps");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
  },
};

Blockly.Blocks["turn_right"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Turn Right")
      .appendField(new Blockly.FieldNumber(90), "DEGREES")
      .appendField("degrees");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
  },
};

Blockly.Blocks["turn_left"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Turn Left")
      .appendField(new Blockly.FieldNumber(90), "DEGREES")
      .appendField("degrees");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
  },
};

Blockly.Blocks["point_in_direction"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Point in Direction")
      .appendField(new Blockly.FieldAngle(90), "DEGREES")
      .appendField("degrees");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
  },
};

Blockly.Blocks["point_toward_menu"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Point Toward")
      .appendField(
        new Blockly.FieldDropdown([["Mouse Pointer", "mouse_pointer"]]),
        "DIRECTION"
      );
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
  },
};

Blockly.Blocks["go_to_menu"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Go To")
      .appendField(
        new Blockly.FieldDropdown([
          ["Random Position", "random_position"],
          ["Mouse Pointer", "mouse_pointer"],
        ]),
        "DESTINATION"
      );
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
  },
};

// javascriptGenerator['go_to_menu'] = function(block) {
//   const destination = block.getFieldValue('DESTINATION');
//   let code = '';
//   if (destination === 'mouse_pointer') {
//     // Generate code to dispatch the moveSpriteToMousePointer thunk
//     code = 'store.dispatch(moveSpriteToMousePointer());\n';
//   }

//   console.log(code);
//   return code;
// }

Blockly.Blocks["go_to_xy"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Go To X:")
      .appendField(new Blockly.FieldNumber(0), "X_COORD")
      .appendField("Y:")
      .appendField(new Blockly.FieldNumber(0), "Y_COORD");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
  },
};

Blockly.Blocks["glidesecstoxy"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Glide")
      .appendField(new Blockly.FieldNumber(0), "SECS")
      .appendField("secs to X:")
      .appendField(new Blockly.FieldNumber(0), "X_COORD")
      .appendField("Y:")
      .appendField(new Blockly.FieldNumber(0), "Y_COORD");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
  },
};

Blockly.Blocks["glidesecstomenu"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Glide")
      .appendField(new Blockly.FieldNumber(0), "SECS")
      .appendField("secs to:")
      .appendField(
        new Blockly.FieldDropdown([
          ["Random Position", "random_position"],
          ["Mouse Pointer", "mouse_pointer"],
        ]),
        "DESTINATION"
      );
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
  },
};

Blockly.Blocks["changexby"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Change X by")
      .appendField(new Blockly.FieldNumber(10), "VALUE")
      .appendField("units");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
  },
};

Blockly.Blocks["changeyby"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Change Y by")
      .appendField(new Blockly.FieldNumber(10), "VALUE")
      .appendField("units");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
  },
};

Blockly.Blocks["setxto"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Set X to")
      .appendField(new Blockly.FieldNumber(10), "VALUE");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
  },
};

Blockly.Blocks["setyto"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Set Y to")
      .appendField(new Blockly.FieldNumber(10), "VALUE");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
  },
};

Blockly.Blocks["if_on_edge_bounce"] = {
  init: function () {
    this.appendDummyInput().appendField("If on edge, bounce");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
  },
};

Blockly.Blocks["set_rotation_style"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Set rotation style to")
      .appendField(
        new Blockly.FieldDropdown([
          ["All Around", "ALL_AROUND"],
          ["Left-Right", "LEFT_RIGHT"],
          ["Don't Rotate", "NO_ROTATION"],
        ]),
        "DIRECTION"
      );
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
  },
};

//Block functions
// JavaScript code generator for 'move_steps' block

javascriptGenerator["move_steps"] = function (block) {
  const steps = block.getFieldValue("STEPS");
  //   const code = `
  //   store.dispatch(moveSteps(${steps}, 0));
  // }

  // `;
  const code = `store.dispatch(moveSteps(${steps}, 0));
`;
  console.log(code);
  return code;
};

// JavaScript code generator for 'turn_right' block
javascriptGenerator["turn_right"] = function (block) {
  const degrees = block.getFieldValue("DEGREES");
  const code = `store.dispatch(turnRight(${degrees}));
`;
  console.log(code);
  return code;
};

// JavaScript code generator for 'turn_left' block
javascriptGenerator["turn_left"] = function (block) {
  const degrees = block.getFieldValue("DEGREES");
  const code = `store.dispatch(turnLeft(${degrees}));
`;
  console.log(code);
  return code;
};

// JavaScript code generator for 'point_in_direction' block
javascriptGenerator["point_in_direction"] = function (block) {
  const degrees = block.getFieldValue("DEGREES");
  const code = `store.dispatch(pointInDirection(${degrees}));
`;
  console.log(code);
  return code;
};

// JavaScript code generator for 'point_toward_menu' block
// Initialize a flag 
let shouldPointTowardsMouse = false;

// Function to rotate the sprite towards the mouse pointer
function pointImageTowardsMousePointer() {
  // Check if pointing towards the mouse is enabled
  if (shouldPointTowardsMouse) {
    var sprite = document.getElementById('sprite');

    // current mouse coordinates
    var mouseX = event.clientX;
    var mouseY = event.clientY;

    // Calculate the center coordinates of the sprite
    var spriteCenterX = sprite.offsetLeft + sprite.offsetWidth / 2;
    var spriteCenterY = sprite.offsetTop + sprite.offsetHeight / 2;

    // Calculate the differences in coordinates
    var deltaX = mouseX - spriteCenterX;
    var deltaY = mouseY - spriteCenterY;

  
    var angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);

    // Apply the rotation transformation to the sprite
    sprite.style.transform = 'rotate(' + angle + 'deg)';

    // Disable pointing towards the mouse until triggered again
    shouldPointTowardsMouse = false;
  }
}

// mousemove event listener to continuously update the sprite rotation
document.addEventListener('mousemove', function (event) {
  pointImageTowardsMousePointer();
});

// Function to enable pointing towards the mouse and trigger rotation
javascriptGenerator['point_toward_menu'] = function (block) {

  shouldPointTowardsMouse = true;

  // Trigger the rotation immediately
  pointImageTowardsMousePointer();


  return '';
};


// JavaScript code generator for 'go_to_menu' block
javascriptGenerator["go_to_menu"] = function (block) {
  const destination = block.getFieldValue("DESTINATION");
  let code;
  if (destination === "mouse_pointer") {
    // Dispatch followMousePointer() if the destination is the mouse pointer
    code = `
store.dispatch(goTo('${destination}'));
`;
  } else {
    // Otherwise, dispatch goTo with the specified destination
    code = `
store.dispatch(goTo('${destination}'));
`;
  }
  console.log(code);
  return code;
};

// JavaScript code generator for 'go_to_xy' block
javascriptGenerator["go_to_xy"] = function (block) {
  const xCoord = block.getFieldValue("X_COORD");
  const yCoord = block.getFieldValue("Y_COORD");
  const code = `store.dispatch(goToXY(${xCoord}, ${yCoord}));
`;
  console.log(code);
  return code;
};

// JavaScript code generator for 'glidesecstoxy' block
javascriptGenerator["glidesecstoxy"] = function (block) {
  const sec = block.getFieldValue("SECS");
  const xCoord = block.getFieldValue("X_COORD");
  const yCoord = block.getFieldValue("Y_COORD");
  const code = `store.dispatch(glideSecsXY(${xCoord}, ${yCoord}, ${sec}));
`;
  console.log(code);
  return code;
};

// JavaScript code generator for 'glidesecstomenu' block
javascriptGenerator["glidesecstomenu"] = function (block) {
  const sec = block.getFieldValue("SECS");
  const destination = block.getFieldValue("DESTINATION");
  const code = `store.dispatch(glideTo(${destination}, ${sec}));
`;
  console.log(code);
  return code;
};

// JavaScript code generator for 'setxto' block
javascriptGenerator["setxto"] = function (block) {
  const value = block.getFieldValue("VALUE");
  const code = `store.dispatch(setX(${value}));
`;
  console.log(code);
  return code;
};

// JavaScript code generator for 'setyto' block
javascriptGenerator["setyto"] = function (block) {
  const value = block.getFieldValue("VALUE");
  const code = `store.dispatch(setY(${value}));
`;
  console.log(code);
  return code;
};

// JavaScript code generator for 'changexby' block
javascriptGenerator["changexby"] = function (block) {
  const value = block.getFieldValue("VALUE");
  const code = `store.dispatch(changeX(${value}));
`;
  console.log(code);
  return code;
};

// JavaScript code generator for 'changeyby' block
javascriptGenerator["changeyby"] = function (block) {
  const value = block.getFieldValue("VALUE");
  const code = `store.dispatch(changeY(${value}));
`;
  console.log(code);
  return code;
};

// JavaScript code generator for 'if_on_edge_bounce' block
javascriptGenerator["if_on_edge_bounce"] = function (block) {
  const code = `store.dispatch(ifOnEdgeBounce());
`;
  console.log(code);
  return code;
};

// JavaScript code generator for 'set_rotation_style' block
javascriptGenerator["set_rotation_style"] = function (block) {
  const direction = block.getFieldValue("DIRECTION");
  let angle;
  if (direction === "ALL_AROUND") {
    angle = 270;
  } else if (direction === "LEFT_RIGHT") {
    angle = 90;
  } else {
    angle = 0;
  }
  const code = `store.dispatch(rotateSprite(${angle}));
`;
  console.log(code);
  return code;
};
