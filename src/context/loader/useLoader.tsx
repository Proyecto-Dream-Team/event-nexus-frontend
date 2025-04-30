// LoaderContext.tsx
import React, { createContext, useContext, useState } from "react";
import "./useLoader.css";

type LoaderContextType = {
  setIsLoading: (val: boolean) => void;
};

// Creamos el contexto
const LoaderContext = createContext<LoaderContextType>({
  setIsLoading: () => {},
});

// Hook para consumir el contexto
export const useLoader = () => useContext(LoaderContext);

// Provider del contexto que envuelve tu app
export const LoaderProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <LoaderContext.Provider value={{ setIsLoading }}>
      {isLoading && (
        <div className="borderCircular">
          <div className="glow-polygon-0" />
          <div className="glow-polygon-1" />
          <div className="glow-polygon-2" />
          <div className="glow-polygon-3" />
        </div>
      )}
      {children}
    </LoaderContext.Provider>
  );
};
