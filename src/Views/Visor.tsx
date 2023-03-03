import React, { useEffect } from "react";
import ReduxFormulario from "../Componentes/ReduxFormulario";
import { useDispatch, useSelector } from "react-redux";
import {
  setImagenURL,
  selectImageUrl,
  selectButtonPressed,
  setButtonPressed,
} from "../Store/slice";
import { IoIosHome } from "react-icons/io";
import "./Visor.scss";
import { VisorProps } from "../Modelo/Interfaces/interfaces";

const Visor: React.FC<VisorProps> = ({ width = "200", height = "200" }) => {

  const imageUrl = useSelector(selectImageUrl);
  const botonClick = useSelector(selectButtonPressed);
  const dispatch = useDispatch();

  useEffect(() => {
    if (botonClick) {
      dispatch(setImagenURL(imageUrl));
      dispatch(setButtonPressed(false));
      console.log("raza", raza);
    }
  }, [botonClick, dispatch, imageUrl]);

  const regex = /breeds\/([^/]+)/;
  const matches = imageUrl.match(regex);
  const raza = matches ? matches[1] : null;
  console.log(raza);
  console.log(imageUrl);

  return (
    <div className="container">
      <div className="icon-container">
        <a href="/">
          <IoIosHome className="icon" />
        </a>
      </div>
      <ReduxFormulario />
      <div className="container-img">
        <img src={imageUrl} alt="Perro" width={width} height={height} />
        <img src={imageUrl} alt="Perro" width={width} height={height} />
        <img src={imageUrl} alt="Perro" width={width} height={height} />
        <img src={imageUrl} alt="Perro" width={width} height={height} />
      </div>
    </div>
  );
};

export default Visor;
