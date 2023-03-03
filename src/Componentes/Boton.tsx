import React from "react";
import { Button } from "primereact/button";
import "./Boton.scss";

interface BotonProps {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  label?: string;
  tooltip?: string;
  id?: string;
  type?: string;
  disabled?: boolean;
}

const Boton: React.FC<BotonProps> = ({
  onClick,
  className,
  label,
  tooltip,
  id,
  type,
  disabled,
}) => {
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
