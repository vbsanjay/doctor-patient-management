import { FormHelperText, TextField, TextFieldProps } from "@material-ui/core";
import React from "react";
import { useField } from "formik";

const BTextField = (props: TextFieldProps) => {
  if (props.name === undefined || props.name === null) {
    throw new Error("<BTextField> requires name attribute to be given");
  }

  const [field, meta] = useField(props.name);

  const defaultProps: TextFieldProps = {
    fullWidth: true,
    variant: "outlined",
    margin: "normal",
  };

  const combinedProps = {
    ...defaultProps,
    ...props,
  };

  const touched = meta.touched;
  const error = meta.error;

  return (
    <>
      <TextField {...combinedProps} {...field} error={!!(touched && error)} />
      {error && touched && <FormHelperText error>{error}</FormHelperText>}
    </>
  );
};

export default BTextField;
