// Import necessary Blockly components
import Blockly from 'blockly';
import { javascriptGenerator } from 'blockly/javascript';

// Assume the javascriptGenerator is configured correctly

// Function to generate code for a given Blockly block
const generateCodeForBlock = (block) => {
  try {
    // Ensure the block type has a corresponding generator function
    if (javascriptGenerator && javascriptGenerator.forBlock[block.type]) {
      // Generate code using the block's type-specific generator function
      const generatedCode = javascriptGenerator.forBlock[block.type](block, javascriptGenerator);

      // Return the generated code
      return generatedCode;
    } else {
      console.warn(`Generator function not defined for block type: ${block.type}`);
      return null;
    }
  } catch (error) {
    console.error(`Error generating code for block: ${error}`);
    return null;
  }
};

export default generateCodeForBlock;
