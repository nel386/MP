import React from "react";
import { Button } from "primereact/button";
import "./Boton.scss";
import { BotonProps } from "../Modelo/Interfaces/interfaces";

const Boton: React.FC<BotonProps> = ({ onClick }) => {
  return (
    <Button
      className="boton"
      label="Buscar"
      severity="info"
      raised
      onClick={onClick}
      type="submit"
    />
  );
};

export default Boton;
