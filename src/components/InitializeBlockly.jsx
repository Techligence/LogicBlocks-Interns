import Blockly from "blockly/core";
import "blockly/blocks";
import { updateXML } from "../features/xmlSlice";
import { store } from "../store/store";

const InitializeBlockly = (toolboxXml) => {
  const workspace = Blockly.inject("blocklyDiv", {
    toolbox: toolboxXml,
    zoom: {
      controls: false, // Disable default controls
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

  // Create custom zoom controls
  const customUndoButton = createUndoButton(workspace, 30);
  const customRedoButton = createRedoButton(workspace, 30);

  // Append custom controls to Blockly's div
  const blocklyDiv = workspace.getParentSvg().parentNode;
  blocklyDiv.appendChild(customUndoButton.button);
  blocklyDiv.appendChild(customRedoButton.button);


  // Create custom zoom controls
  const customZoomInButton = createZoomInButton(workspace, 30);
  const customZoomOutButton = createZoomOutButton(workspace, 30);
  const customResetButton = createResetButton(workspace, 30);

  // Append custom controls to Blockly's div
  blocklyDiv.appendChild(customZoomInButton.button);
  blocklyDiv.appendChild(customResetButton.button);
  blocklyDiv.appendChild(customZoomOutButton.button);

  workspace.registerButtonCallback("make_block", make_block);

  return workspace;
};


//function to console log hello
function make_block() {
  console.log("Make a block BUTTON CLICKED!");
  if (document.getElementById("customModal")) {
    return;
  }
  const modalContainer = document.createElement("div");
  modalContainer.id = "customModal";

  const modalContent = document.createElement("div");
  modalContent.innerHTML = `
    <p>Make a block BUTTON CLICKED!</p>
    <span id="closeModal">&times;</span>
    <input type="text" id="blockName" placeholder="Block Name" />
    <br>
    <button id="create_cust">Create</button>
  `;

  modalContent.style.padding = "20px";
  modalContent.style.backgroundColor = "#fff";
  modalContent.style.border = "1px solid #ccc";
  modalContent.style.borderRadius = "5px";
  modalContent.style.position = "fixed";
  modalContent.style.top = "50%";
  modalContent.style.left = "50%";
  modalContent.style.transform = "translate(-50%, -50%)";
  modalContent.style.width = "30%"; // Adjust width as needed
  modalContent.style.height = "50%"; // Adjust height as needed

  const closeModalButton = modalContent.querySelector("#closeModal");
  closeModalButton.style.cursor = "pointer";
  closeModalButton.style.position = "absolute";
  closeModalButton.style.top = "10px";
  closeModalButton.style.right = "20px";
  closeModalButton.style.fontSize = "20px";
  closeModalButton.style.color = "#aaa";

  const createButton = modalContent.querySelector("#create_cust");
  createButton.style.cursor = "pointer";
  createButton.style.position = "flex";
  createButton.style.top = "10px";
  createButton.style.right = "20px";
  createButton.style.fontSize = "15px";
  createButton.style.color = "#aaa";

  // modalContent.querySelector("#blockName").style.position = "flex";
  
  
  
  
  createButton.addEventListener("click", async() => {
    const blockName = modalContent.querySelector("#blockName");
    const blockNameValue = blockName.value;
    if (blockNameValue === "") {
      alert("Block name cannot be empty!");
      return;
    }
    console.log("Create button clicked");
    await store.dispatch(updateXML(blockNameValue));
    //update the blockly toolbox
    // Blockly.getMainWorkspace().updateToolbox()

    document.body.removeChild(modalContainer);
  });

  closeModalButton.addEventListener("click", () => {
    document.body.removeChild(modalContainer);
  });

  modalContainer.appendChild(modalContent);  

  document.body.appendChild(modalContainer);
}


  // Helper functions to create undo, redo, zoom-in, zoom-out, and reset buttons
  function createZoomInButton(workspace, size) {
    const button = document.createElement("button");
    button.innerHTML = `<img src="/zoom-in.svg" alt="Zoom In">`;
    button.addEventListener("click", () => {
      const currentScale = workspace.getScale();
      const newScale = Math.min(Math.max(currentScale + 0.1, 0.3), 3);
      workspace.setScale(newScale);
    });
  
    setButtonStyles_zoom(button, size);
    button.style.marginBottom = "80px";
    button.style.marginRight = "8px";
    return { button };
  }
  
  function createZoomOutButton(workspace, size) {
    const button = document.createElement("button");
    button.innerHTML = `<img src="/zoom-out.svg" alt="Zoom Out"> `;
    button.addEventListener("click", () => {
      const currentScale = workspace.getScale();
      const newScale = Math.max(currentScale - 0.1, 0.3);
      workspace.setScale(newScale);
    });
  
    setButtonStyles_zoom(button, size);
    button.style.marginBottom = "45px";
    button.style.marginRight = "8px";
    return { button };
  }
  
  function createResetButton(workspace, size) {
    const button = document.createElement("button");
    const imagePath = "/zoom-reset.svg";
    button.innerHTML = `<img src="${imagePath}" alt="Reset"> `;
    button.addEventListener("click", () => {
      centerWorkspace(workspace);
    });
  
    setButtonStyles_zoom(button, size);
    button.style.marginBottom = "10px";
    button.style.marginRight = "8px";
  
    return { button };
  }
  
  function centerWorkspace(workspace) {
    const viewSize = workspace.getCanvas().getBBox();
    workspace.scrollCenter(
      viewSize.x + viewSize.width / 2,
      viewSize.y + viewSize.height / 2
    );
  }
  
  // Helper function to set common button styles
  function setButtonStyles_zoom(button, size) {
    button.style.zIndex = "1000";
    button.style.position = "absolute";
    button.style.visibility = "visible";
    button.style.right = "10px";
    button.style.bottom = "10px";
    button.style.width = `${size}px`;
    button.style.height = `${size}px`;
    button.style.borderRadius = "50%";
    button.style.backgroundColor = "transparent";
    button.style.border = "2px solid #808080";
  }

  function createUndoButton(workspace, size) {
  const button = document.createElement("button");
  button.innerHTML = `<img src="/undo.svg" alt="Undo"> `;
  button.addEventListener("click", () => {
    workspace.undo();
  });

  setButtonStyles(button, size);
  button.style.marginBottom = "10px"; // Adjust the position as needed
  button.style.marginRight = "100px";
  return { button };
  }

  function createRedoButton(workspace, size) {
  const button = document.createElement("button");
  button.innerHTML = `<img src="/redo.svg" alt="Redo"> `;
  button.addEventListener("click", () => {
    workspace.undo(true);
  });

  setButtonStyles(button, size);
  button.style.marginBottom = "10px"; // Adjust the position as needed
  button.style.marginRight = "65px";
  return { button };
  }

  // Helper function to set common button styles
  function setButtonStyles(button, size) {
  button.style.zIndex = "1000";
  button.style.position = "absolute";
  button.style.visibility = "visible";
  button.style.right = "10px";
  button.style.bottom = "10px";
  button.style.width = `${size}px`;
  button.style.height = `${size}px`;
  button.style.borderRadius = "50%";
  button.style.backgroundColor = "transparent";
  button.style.border = "2px solid #808080";``
}

export default InitializeBlockly;

