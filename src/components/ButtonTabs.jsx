import React from "react";

function ButtonTabs(props) {
    const buttonStyles = {
        flexBasis: "100px",
        fontSize: "1rem",                                
        textAlign: "center",
        textDecoration: "none",                
        cursor: "pointer",          
        color: "#1976d2",
        borderRadius: "1rem 1rem 0 0",
        border: "1px solid hsla(0, 0%, 0%, 0.15)",
        padding: "0.125rem 1.25rem 0",
        


        transition: "background-color 0.2s",
    }

    const handleButtonClick = (value) => {
        if (props.onClick) {
            props.onClick(value === "Sounds");
        }
    }

    return (
        <div style={{
            marginTop: "10px",
            width: "50vw",
            height: "2.5rem",
            display: "flex",
            gap: "10px"
        }}>
            <button style={{...buttonStyles, backgroundColor: props.active === "Home" ? "white" : "#cccccc"}} onClick={() => handleButtonClick("Home")}>Home</button>
            <button style={{...buttonStyles, backgroundColor: props.active === "Sounds" ? "white" : "#cccccc"}} onClick={() => handleButtonClick("Sounds")}>Sounds</button>
        </div>
    )
}

export default ButtonTabs;