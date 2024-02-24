import * as React from "react";
import { useSprite, useBackdrop } from "../../pages/Home";
import { Button, ToggleButton } from "@mui/material";
import { ReactSketchCanvas } from "react-sketch-canvas";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./DrawSprite.css";

const createButton = (label, handler, themeColor) => (
    <Button
        key={label}
        className={`btn btn-${themeColor} btn-block`}
        type="button"
        onClick={handler}
    >
        {label}
    </Button>
);

const InputField = ({ label, fieldName, type, canvasProps, setCanvasProps }) => {
    return (
        <div className={`input-field ${type}-input`} key={fieldName}>
            <label>{label}</label>
            {type === "text" ? (
                <input
                    type="text"
                    value={canvasProps[fieldName]}
                    onChange={(e) =>
                        setCanvasProps({ ...canvasProps, [fieldName]: e.target.value })
                    }
                />
            ) : (
                <input
                    type="number"
                    value={canvasProps[fieldName]}
                    onChange={(e) =>
                        setCanvasProps({
                            ...canvasProps,
                            [fieldName]: Number(e.target.value),
                        })
                    }
                />
            )}
        </div>
    );
};

const DrawSprite = ({ exampleItems, closeModal, selectedOption }) => {
    const { addSprite } = useSprite();
    const { setBackdrop } = useBackdrop();

    const [pen, setPen] = React.useState(true);

    const inputProps = [
        ["Background Image:", "backgroundImage", "text"],
        ["Stroke Width:", "strokeWidth", "number"],
        ["Eraser Width:", "eraserWidth", "number"],
    ];

    const canvasRef = React.useRef(null);

    const penHandler = () => {
        const eraseMode = canvasRef.current?.eraseMode;

        if (eraseMode) {
            eraseMode(false);
        }
    };

    const undoHandler = () => {
        const undo = canvasRef.current?.undo;

        if (undo) {
            undo();
        }
    };

    const eraserHandler = () => {
        const eraseMode = canvasRef.current?.eraseMode;

        if (eraseMode) {
            eraseMode(true);
        }
    };

    const redoHandler = () => {
        const redo = canvasRef.current?.redo;

        if (redo) {
            redo();
        }
    };

    const clearHandler = () => {
        const clearCanvas = canvasRef.current?.clearCanvas;

        if (clearCanvas) {
            clearCanvas();
        }
    };

    const resetCanvasHandler = () => {
        const resetCanvas = canvasRef.current?.resetCanvas;

        if (resetCanvas) {
            resetCanvas();
        }
    };

    const [lastStroke, setLastStroke] = React.useState({
        stroke: null,
        isEraser: null,
    });

    const imageExportHandler = async () => {
        const exportImage = canvasRef.current?.exportImage;

        if (exportImage) {
            const exportedDataURI = await exportImage("png");
            if (selectedOption === 'Choose a Sprite') {
                addSprite(exportedDataURI);
                exampleItems.push(exportedDataURI);
            }
            else {
                setBackdrop(exportedDataURI);
                exampleItems.push(exportedDataURI);
            }
            closeModal();
            console.log(exampleItems);

        }
    };

    const buttonsWithHandlers = [
        ["Undo", undoHandler, "primary"],
        ["Redo", redoHandler, "primary"],
        ["Clear All", clearHandler, "primary"],
        ["Reset All", resetCanvasHandler, "primary"],
        ["Eraser", eraserHandler, "secondary"],
    ];

    const [canvasProps, setCanvasProps] = React.useState({
        className: "react-sketch-canvas",
        width: "100%",
        height: "400px",
        strokeWidth: 4,
        eraserWidth: 5,
        strokeColor: "#000000",
        canvasColor: "#FFFFFF",
        style: { border: "1px solid #CCC" },
        svgStyle: {},
        exportWithBackgroundImage: false,
        withTimestamp: true,
        allowOnlyPointerType: "all",
        withViewBox: false,
    });

    return (
        <div>
            <div>
                {inputProps.map(([label, fieldName, type]) => (
                    <InputField
                        label={label}
                        key={fieldName}
                        fieldName={fieldName}
                        type={type}
                        canvasProps={canvasProps} 
                        setCanvasProps={setCanvasProps} 
                    />
                ))}
            </div>
            <div className="color-selector-container">
                <label htmlFor="strokeColorInput">Stroke Color: </label>
                <input
                    type="color"
                    name="strokeColor"
                    className="color-selector-input"
                    id="strokeColorInput"
                    value={canvasProps.strokeColor}
                    title="Choose stroke color"
                    onChange={(e) => {
                        setCanvasProps((prevCanvasProps) => ({
                            ...prevCanvasProps,
                            strokeColor: e.target.value,
                        }));
                    }}
                />
            </div>
            <div className="color-selector-container color-bottom">
                <label className="color-selector-label">Canvas Colour: </label>
                <input
                    name="canvasColor"
                    type="color"
                    className="color-selector-input"
                    id="canvasColorInput"
                    value={canvasProps.canvasColor}
                    title="Choose stroke color"
                    onChange={(e) => {
                        setCanvasProps((prevCanvasProps) => ({
                            ...prevCanvasProps,
                            backgroundImage: "",
                            canvasColor: e.target.value,
                        }));
                    }}
                />
            </div>

            <ReactSketchCanvas ref={canvasRef} {...canvasProps} />
            <div className="col-3 panel">
                <Button
                    key="Pen"
                    className={`btn btn-secondary btn-block`}
                    type="button"
                    onClick={penHandler}
                >
                    <FontAwesomeIcon icon="fa-solid fa-pencil" />
                </Button>
                <Button
                    key="Eraser"
                    className={`btn btn-secondary btn-block`}
                    type="button"
                    onClick={eraserHandler}
                >
                    <FontAwesomeIcon icon="fa-solid fa-eraser" />
                </Button>
                <Button
                    key="Clear All"
                    className={`btn btn-block`}
                    type="button"
                    onClick={clearHandler}
                >
                    <FontAwesomeIcon icon="fa-solid fa-trash" />
                </Button>
                <Button
                    key="Undo"
                    className={`btn btn-block`}
                    type="button"
                    onClick={undoHandler}
                >
                    <FontAwesomeIcon icon="fa-solid fa-rotate-left" />
                </Button>
                <Button onClick={imageExportHandler}>
                    <FontAwesomeIcon icon="fa-solid fa-check" />
                </Button>
            </div>

        </div>
    );
};

export default DrawSprite;
