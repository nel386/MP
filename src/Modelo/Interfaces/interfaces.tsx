import { AutoCompleteCompleteEvent } from "primereact/autocomplete";

export interface VisorProps {
  url?: string;
  width?: string;
  height?: string;
}

export interface BotonProps {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  label?: string;
  tooltip?: string;
  id?: string;
  type?: string;
  disabled?: boolean;
}

export interface InputProps {
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
