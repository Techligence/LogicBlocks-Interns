import Blockly from 'blockly';
import { javascriptGenerator } from "blockly/javascript";
import {store} from "../store/store.js";
import {moveSteps, setX, setY, goTo, goToXY,moveSpriteToMousePointer,turnRight,turnLeft,pointInDirection, rotateSprite, glideSecsXY
} from '../features/motionSlice';

import { waitSeconds , repeatTimes} from '../features/controlSlice';
import { setCodeString } from "../features/codeSlice";
import { useSelector } from "react-redux";
const InitializeBlockly = (toolboxXml) => {
  const workspace = Blockly.inject('blocklyDiv', {
    toolbox: toolboxXml,
    zoom: {
      controls: true,
      wheel: true,
      startScale: 1.0,
      maxScale: 3,
      minScale: 0.3,
      scaleSpeed: 1.2,
      pinch: true,
    },
    grid: {
      spacing: 20,
      length: 3,
      colour: "#ccc",
      snap: true,
    },
    trashcan: false,
    move: {
      scrollbars: true,
      drag: true,
      wheel: true,
    },
  });

  async function onBlockClick(event) {
    // console.log('Event details:', event);
    if (event.type === Blockly.Events.CLICK ) {
      var clickedBlock = workspace.getBlockById(event.blockId);
      // console.log('Clicked block:', clickedBlock);
      if (clickedBlock) {
        var codeToExecute = generateCodeForBlock(clickedBlock);
        const codeString = store.getState().code.codeString;

        if (codeToExecute !== codeString) {
          store.dispatch(setCodeString(codeToExecute));
        }
        store.dispatch(setCodeString(codeToExecute));
        // console.log('Executing block code:', codeToExecute);
        try {
          // Evaluate the code.
          await eval(`(async () => { ${codeToExecute} })();`);
        } catch (error) {
          console.error('Error executing block code:', error);
        }
      }
    }
  }
  
  // Function to generate code for a block
  function generateCodeForBlock(block) {
    javascriptGenerator.addReservedWords('code');
    const blockCode = javascriptGenerator.blockToCode(block);
    return blockCode;
  }
  
  workspace.addChangeListener(onBlockClick);
  return workspace;
};

export default InitializeBlockly;
