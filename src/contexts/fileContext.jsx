import React, { createContext, useState } from "react";

export const FileContext = createContext();

export const FileProvider = ({ children }) => {
  const [fileURL, setFileURL] = useState(null);

  return (
    <FileContext.Provider value={{ fileURL, setFileURL }}>
      {children}
    </FileContext.Provider>
  );
};
