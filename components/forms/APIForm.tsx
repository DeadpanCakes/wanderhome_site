import React from "react";
import FormLayout from "../layouts/FormLayout";
import InputField from "../InputField";
import BooleanField from "../BooleanField";

const APIForm = ({ payload, method, url, changeHandler }) => {
  const fields = generateFields(payload);
  const handlers = generateHandlers(fields, changeHandler);
  const fieldArr = (() => {
    const arr = [];
    for (let fieldName in fields) {
      arr.push({ name: fieldName, value: fields[fieldName].value });
    }
    return arr;
  })();
  return (
    <FormLayout method={method} url={url} payload={payload}>
      {fieldArr.map((field) => {
        const handler = handlers.find((handler) => {
          return handler.name === field.name;
        });
        return typeof field.value === "boolean" ? (
          <BooleanField
            name={field.name}
            boolean={field.value}
            toggler={handler.setState}
          />
        ) : (
          <InputField
            key={field.name}
            name={field.name}
            value={field.value}
            changeHandler={handler.setState}
          />
        );
      })}
    </FormLayout>
  );
};

const generateFields = (payload) => {
  const fields = {};
  for (let name in payload) {
    fields[name] = { name, value: payload[name] };
  }
  return fields;
};

const generateHandlers = (fields, handler) => {
  const handlers = [];
  for (let fieldName in fields) {
    const isBoolean = (value) => {
      return typeof value === "boolean";
    };
    const setState = isBoolean(fields[fieldName].value)
      ? () => {
          return handler((prevState) => {
            return {
              ...prevState,
              [fieldName]: !prevState[fieldName],
            };
          });
        }
      : (newValue) => {
          return handler((prevState) => {
            return {
              ...prevState,
              [fieldName]: newValue,
            };
          });
        };
    handlers.push({ name: fieldName, setState });
  }
  return handlers;
};

export default APIForm;
