import { ThemeProvider, createTheme } from "@mui/material";
import { createContext, useMemo, useState } from "react";
import Blockly from 'blockly';

export const ColorModeContext = createContext({
    toggleMode: () => { },
    mode: "light"
})

export const lightTheme = Blockly.Theme.defineTheme('LightTheme', {
    'blockStyles': {
        "logic_blocks": {
            "colourPrimary": "#2196F3",
            "colourSecondary": "#1976D2",
            "colourTertiary": "#0D47A1",
        },
        "loop_blocks": {
            "colourPrimary": "#FFC107",
            "colourSecondary": "#FFA000",
            "colourTertiary": "#FF8F00",
        },
        "math_blocks": {
            "colourPrimary": "#FF5722",
            "colourSecondary": "#E64A19",
            "colourTertiary": "#D84315",
        },
        "text_blocks": {
            "colourPrimary": "#673AB7",
            "colourSecondary": "#5E35B1",
            "colourTertiary": "#512DA8",
        },
    },
    'categoryStyles': {
        "logic_category": {
            "colour": "#2196F3",
        },
        "loop_category": {
            "colour": "#FFC107",
        },
        "math_category": {
            "colour": "#FF5722",
        },
        "text_category": {
            "colour": "#673AB7",
        },
    },
    'componentStyles': {
        "workspaceBackgroundColour": "#ffffff",
        "toolboxBackgroundColour": "#f0f0f0",
        "toolboxForegroundColour": "#333333",
    },
});

export const darkTheme = Blockly.Theme.defineTheme('DarkTheme', {
    'blockStyles': {
        "logic_blocks": {
            "colourPrimary": "#4CAF50",
            "colourSecondary": "#45a049",
            "colourTertiary": "#357b45"
        },
        "loop_blocks": {
            "colourPrimary": "#FF9800",
            "colourSecondary": "#F57C00",
            "colourTertiary": "#E65100"
        },
        "math_blocks": {
            "colourPrimary": "#FF5722",
            "colourSecondary": "#E64A19",
            "colourTertiary": "#D84315"
        },
        "text_blocks": {
            "colourPrimary": "#9C27B0",
            "colourSecondary": "#8E24AA",
            "colourTertiary": "#7B1FA2"
        },
    },
    'categoryStyles': {
        "logic_category": {
            "colour": "#4CAF50"
        },
        "loop_category": {
            "colour": "#FF9800"
        },
        "math_category": {
            "colour": "#FF5722"
        },
        "text_category": {
            "colour": "#9C27B0"
        },
    },
    'componentStyles': {
        "workspaceBackgroundColour": "#333333",
        "toolboxBackgroundColour": "#222222",
        "toolboxForegroundColour": "#ffffff"
    },
});

export const ColorContextProvider = ({ children }) => {

    const [mode, setMode] = useState("dark")

    const colorMode = useMemo(() => ({
        toggleMode: () => setMode(prevMode => prevMode === "light" ? "dark" : "light"), mode
    }), [mode])

    const theme = createTheme({
        palette: {
            mode: mode
        }
    })

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </ColorModeContext.Provider>
    )
} 