import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Principal from "./Views/Principal";
import Visor from "./Views/Visor";

const App: React.FC = () => {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Principal />} />
        <Route path="/perro/:raza" element={<Visor />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
