import FormLayout from "../layouts/FormLayout";
import InputField from "../InputField";
import { v4 as uuid } from "uuid";

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
        return (
          <InputField
            key={uuid()}
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
    handlers.push({
      name: fieldName,
      setState: (newValue) => {
        return handler((prevState) => {
          return {
            ...prevState,
            [fieldName]: newValue,
          };
        });
      },
    });
  }
  return handlers;
};

export default APIForm;
