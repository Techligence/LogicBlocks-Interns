import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { store } from "./store/store";
import { Provider } from "react-redux";
import AnchorMenu from "./components/AnchorMenu"; // Import AnchorMenu
import { FileProvider } from "./contexts/fileContext.jsx";

function App() {
  const routes = ["/sounds"];

  return (
    <div className="App" style={{ position: "relative", zIndex: "1" }}>
      <Provider store={store}>
        <FileProvider>
          <BrowserRouter>
            <AnchorMenu
              style={{ position: "absolute", top: 0, right: 0, zIndex: "1001" }}
            />{" "}
            {/* Adjust the style as needed */}
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </BrowserRouter>
        </FileProvider>
      </Provider>
    </div>
  );
}

export default App;
