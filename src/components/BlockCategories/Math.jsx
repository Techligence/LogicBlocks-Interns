// MathCategory.jsx
import 'blockly-arduino/blocks'
import * as Arduino from 'blockly-arduino/arduino'

export const Math = `
  <category name="Math" colour="#5C81A6" >
    <block type="math_number"></block>
    <block type="math_arithmetic"></block>
    <block type="math_random_int">
      <value name="FROM">
        <shadow type="math_number">
          <field name="NUM">1</field>
        </shadow>
      </value>
      <value name="TO">
        <shadow type="math_number">
          <field name="NUM">100</field>
        </shadow>
      </value>
    </block>
  </category>
`;


Arduino['math_number'] = function() {
  // Numeric value.
  var code = window.parseFloat(this.getFieldValue('NUM'));
  // -4.abs() returns -4 in Dart due to strange order of operation choices.
  // -4 is actually an operator and a number.  Reflect this in the order.
  var order = code < 0 ?
      Arduino.ORDER_UNARY_PREFIX : Arduino.ORDER_ATOMIC;
  return [code, order];
};

Arduino['math_arithmetic'] = function() {
  // Basic arithmetic operators, and power.
  var mode = this.getFieldValue('OP');
  var tuple = Arduino.math_arithmetic.OPERATORS[mode];
  var operator = tuple[0];
  var order = tuple[1];
  var argument0 = Arduino.valueToCode(this, 'A', order) || '0';
  var argument1 = Arduino.valueToCode(this, 'B', order) || '0';
  var code;
  if (!operator) {
    code = 'Math.pow(' + argument0 + ', ' + argument1 + ')';
    return [code, Arduino.ORDER_UNARY_POSTFIX];
  }
  code = argument0 + operator + argument1;
  return [code, order];
};

Arduino['math_arithmetic'].OPERATORS = {
  ADD: [' + ', Arduino.ORDER_ADDITIVE],
  MINUS: [' - ', Arduino.ORDER_ADDITIVE],
  MULTIPLY: [' * ', Arduino.ORDER_MULTIPLICATIVE],
  DIVIDE: [' / ', Arduino.ORDER_MULTIPLICATIVE],
  POWER: [null, Arduino.ORDER_NONE]  // Handle power separately.
};