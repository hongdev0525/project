import React from "react";

/**
 * formFieldList data format
 *
 * {
    formTitle: "회원가입",
    formName: "signin",
    formFields: [
      {
        field: "name",
        label: "",
        inputType: "input",
        props: {
       		 ...props of input
        }
      },
      {
        field: "text",
        label: "텍스트",
        inputType: "textarea",
        props: {
			...props of input
		}
      },

    ]
  };
 */
const InputForm = ({ formFieldList }) => {
  const form = [];
  formFieldList.forEach((formField, index) => {
    const field = formField.field;
    const formElement = React.createElement(
      `${formField.inputType}`,
      formField.props
    );
    const formLabel = React.createElement(
      "label",
      {
        htmlFor: field,
        className: `${field}-label`,
        key: `${field}-label${index}`,
      },
      `${formField.label}`
    );
    form.push(
      <div
        className={`${field}-inputGroup`}
        key={`${field}-inputGroup${index}`}
      >
        {formLabel}
        {formElement}
      </div>
    );
  });
  return form;
};

const CommonForm = ({ formDataList }) => {
  const formFieldList = formDataList.formFields;
  return (
    <div className={`${formDataList.formName}-form`}>
      <h1>{formDataList.formTitle}</h1>
      <InputForm formFieldList={formFieldList} />
    </div>
  );
};

export default CommonForm;
