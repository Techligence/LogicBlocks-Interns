import React from "react";
import { useState } from "react";
import BlocklyComponent from "../components/BlocklyComponent";
import Canvas from "../components/Canvas";
import AnchorMenu from "../components/AnchorMenu";
import FloatingActionButton from "../components/FloatingActionButton";
import Header from "../components/Header";
import ButtonTabs from "../components/ButtonTabs";
import Sounds from "../components/Sounds";
import FlagButton from "../components/Canvas/FlagButton";

const Home = () => {
  const [sound, setSound] = useState(false);
  const [activeTab, setActiveTab] = useState("Home");

  const handleTab = (value) => {
    setSound(value);
    if (value === true) setActiveTab("Sounds");
    else setActiveTab("Home");
  };

  return (
    <div>
      <Header />

      <ButtonTabs onClick={handleTab} active={activeTab} />

      <div style={{ textAlign: "center" }}></div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          marginTop: "20px",
        }}
      >
        {sound ? <Sounds /> : <BlocklyComponent />}
        <Canvas />
      </div>
      <AnchorMenu />
      <FloatingActionButton />
    </div>
  );
};

export default Home;
