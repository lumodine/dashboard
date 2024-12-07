"use client";

import {createContext, useContext, useState, ReactNode} from "react";

type IframeReloadContextType = {
  reloadKey: number;
  reloadIframe: () => void;
};

const IframeReloadContext = createContext<IframeReloadContextType | undefined>(undefined);

export const IframeReloadProvider = ({children}: {children: ReactNode}) => {
  const [reloadKey, setReloadKey] = useState(0);

  const reloadIframe = () => {
    setReloadKey((prevKey) => prevKey + 1);
  };

  return (
    <IframeReloadContext.Provider
      value={{
        reloadKey,
        reloadIframe,
      }}
    >
      {children}
    </IframeReloadContext.Provider>
  );
};

export const useIframeReloadContext = () => {
  const context = useContext(IframeReloadContext);

  if (!context) {
    throw new Error("useIframeReloadContext must be used within an IframeReloadProvider");
  }

  return context;
};
