import React, { useState } from "react";
import {
  AutoComplete,
  AutoCompleteCompleteEvent,
} from "primereact/autocomplete";
import axios from "axios";
import perrosApi from "../Modelo/Servicios/Axios";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "../index.scss";
import "./Input.scss";

interface InputProps {
  value: string;
  setValue: (value: string) => void;
  className?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  label?: string;
  tooltip?: string;
  id?: string;
  type?: string;
  suggestions?: string[];
  completeMethod?: (event: AutoCompleteCompleteEvent) => void;
  name?: string;
  onSearch?: (value: string) => void;
}

const Input: React.FC<InputProps> = ({
  value,
  setValue,
  className,
  onChange,
  onBlur,
  label,
  tooltip,
  id,
  type,
  completeMethod,
  name,
}) => {
  const [sugerencias, setSugerencias] = useState<string[]>([]);

  const search = async (event: AutoCompleteCompleteEvent) => {
    const sugerencias = await perrosApi.obtenerRazas(event.query);
    setSugerencias(sugerencias);
  };
  return (
    <span className="p-input-icon-right">
      <i className="pi pi-search lupa" />
      <AutoComplete
        className="input"
        type="text"
        placeholder="Introduce una raza..."
        value={value}
        suggestions={sugerencias}
        completeMethod={search}
        onChange={(e) => setValue(e.target.value)}
        name={name}
        onBlur={onBlur}
      />
    </span>
  );
};

export default Input;
