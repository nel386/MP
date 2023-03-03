import React from "react";
import { Navigate } from "react-router";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  setInputValue,
  setImagenURL,
  selectInputValue,
  selectButtonPressed,
  setButtonPressed,
} from "../Store/slice";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import { FieldProps } from "formik";
import perrosApi from "../Modelo/Servicios/Axios";
import Boton from "./Boton";
import Input from "./Input";
import "./ReduxFormulario.scss";

const validationSchema = Yup.object({
  inputValue: Yup.string()
    .required("Introduce un valor válido")
    .min(3, "El valor debe tener un mínimo de 3 caracteres")
    .matches(/^[^0-9]*$/, "El valor no debe contener números"),
});

const ReduxFormulario: React.FC = () => {
  const inputValue = useSelector(selectInputValue);
  const dispatch = useDispatch();
  const imagenURL = useSelector(
    (state: { search: { imagenURL: string } }) => state.search.imagenURL
  );
  const botonClick = useSelector(selectButtonPressed);

  const handleButtonClick = async (values: any) => {
    const inputValue = values.inputValue.replace(" ", "/");

    const imagenURL = await perrosApi.obtenerImagenRandom(inputValue);
    dispatch(setImagenURL(imagenURL));

    console.log("input", inputValue);
    dispatch(setInputValue(inputValue));
    dispatch(setButtonPressed(true));
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    dispatch(setInputValue(value));
  };

  return (
    <>
      {botonClick && (
        <Navigate to={`/perro/${encodeURIComponent(inputValue)}`} />
      )}

      <Formik
        initialValues={{ inputValue: "" }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          console.log(values.inputValue);
          handleButtonClick(values);
          resetForm();
        }}
      >
        {({ errors, touched }) => (
          <>
            
            <h1 className="titulo-redux"><img
              src={require("../Utils/meta.jpg")}
              alt="logo"
              className="logo-redux"
            />Metaperros</h1>
            <Form className="principal-redux">
              <Field name="inputValue">
                {({ field, form, meta }: FieldProps<string>) => (
                  <>
                    <Input
                      name={field.name}
                      value={field.value}
                      setValue={(value: string) =>
                        form.setFieldValue(field.name, value)
                      }
                      onChange={handleInputChange}
                    />
                  </>
                )}
              </Field>

              <Boton type="submit" />
              {touched.inputValue && errors.inputValue ? (
                <p className="error-redux show">{errors.inputValue}</p>
              ) : null}
            </Form>
          </>
        )}
      </Formik>
    </>
  );
};

export default ReduxFormulario;
