import React, { useState } from "react";
import * as Yup from "yup";
import axios from "axios";
import { Navigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { setInputValue, setImagenURL } from "../Store/slice";
import { RootState } from "../Store/store";
import { FieldProps } from "formik";
import { Formik, Form, Field } from "formik";
import Boton from "../Componentes/Boton";
import Input from "../Componentes/Input";
import perrosApi from "../Modelo/Servicios/Axios";
import "./Principal.scss";

const Principal: React.FC = () => {
  // const [inputValue, setInputValue] = useState<string>("");
  // const [imagenURL, setImagenURL] = useState<string>("");
  const inputValue = useSelector((state: RootState) => state.search.inputValue);

  const imagenURL = useSelector(
    (state: { search: { imagenURL: string } }) => state.search.imagenURL
  );
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    inputValue: Yup.string()
      .required("Introduce un valor válido")
      .min(3, "El valor debe tener un mínimo de 3 caracteres")
      .matches(/^[^0-9]*$/, "El valor no debe contener números"),
  });

  const handleButtonClick = async (values: any) => {
    const inputValue = values.inputValue.replace(" ", "/");

    const imagenURL = await perrosApi.obtenerImagenRandom(inputValue);
    dispatch(setImagenURL(imagenURL));

    console.log("input", inputValue);
    dispatch(setInputValue(inputValue));
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    dispatch(setInputValue(value));
  };

  return (
    <>
      {imagenURL && (
        <Navigate to={`/perro/${encodeURIComponent(inputValue)}`} />
      )}

      <Formik
        initialValues={{ inputValue }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          console.log(values.inputValue);
          handleButtonClick(values);
          resetForm();
          // setInputValue("");
        }}
      >
        {({ errors, touched }) => (
          <Form className="principal">
            <img
              src={require("../Utils/meta.jpg")}
              alt="logo"
              className="logo"
            />
            <h1 className="titulo">Metaperros</h1>
            <Field name="inputValue">
              {({ field, form, meta }: FieldProps<string>) => (
                <>
                  {touched.inputValue && errors.inputValue ? (
                    <p className="error show">{errors.inputValue}</p>
                  ) : null}

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
          </Form>
        )}
      </Formik>
    </>
  );
};

export default Principal;
