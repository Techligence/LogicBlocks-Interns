// xmlSlice.js
import { createSlice } from '@reduxjs/toolkit';
import Blockly from 'blockly/core';

const initialXML = `
<category name="MyBlocks">
  <button text="Make a block" callbackKey="make_block"></button>
</category>
`;

const initialState = {
  xml: initialXML,
};

const xmlSlice = createSlice({
  name: 'xml',
  initialState,
  reducers: {
    updateXML: (state, action) => {
      const blockName=action.payload;
      if (blockName === '') return;
      const block=`<block type="custom_block_${blockName}"></block>
      `;
      console.log('blockName',blockName);
      // Append the provided block before the closing </category> tag
      state.xml = state.xml.replace('</category>', `${block}</category>`);
      console.log('In XML', state.xml);      
      Blockly.Blocks[`custom_block_${blockName}`] = {
        init: function() {
          this.appendDummyInput()
            .appendField(`${blockName}`);
          this.setPreviousStatement(true, null);
          this.setNextStatement(true, null);
          this.setColour(120);
        }
      };
    },
  },
});

export const { updateXML } = xmlSlice.actions;
export default xmlSlice.reducer;
