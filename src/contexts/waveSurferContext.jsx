import { createContext, useContext, useState } from "react";

export const WaveSurferContext = createContext();

export const WaveSurferProvider = ({ children }) => {
    const [wavesurferObj, setWavesurferObj] = useState(null);

    return(
        <WaveSurferContext.Provider value={{wavesurferObj, setWavesurferObj}}>
            {children}
        </WaveSurferContext.Provider>
    );
};

export const useWaveSurfer = () => {
    return useContext(WaveSurferContext);
}