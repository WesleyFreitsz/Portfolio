"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import LocomotiveScroll from "locomotive-scroll";

interface ScrollContextType {
  locoScroll: LocomotiveScroll | null;
  setLocoScroll: (instance: LocomotiveScroll | null) => void;
}

const ScrollContext = createContext<ScrollContextType | undefined>(undefined);

export const ScrollProvider = ({ children }: { children: ReactNode }) => {
  const [locoScroll, setLocoScroll] = useState<LocomotiveScroll | null>(null);

  return (
    <ScrollContext.Provider value={{ locoScroll, setLocoScroll }}>
      {children}
    </ScrollContext.Provider>
  );
};

export const useScroll = () => {
  const context = useContext(ScrollContext);
  if (!context) {
    throw new Error("useScroll must be used within a ScrollProvider");
  }
  return context;
};
