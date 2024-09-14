const textClassification = {
  input:
    "$reset input input-bordered w-full focus-within:input-info formkit-invalid:input-error",
  label: "text-sm formkit-invalid:text-red-500",
};
const buttonClassification = {
  input: "$reset btn btn-primary",
};

export default {
  // the global key will apply to all inputs
  global: {
    help: "text-xs text-gray-500 m-1",
    message: "$reset text-error text-xs m-1",
    label: "$reset label-text m-1",
    outer: "$reset my-2",
  },
  button: buttonClassification,
  date: textClassification,
  "datetime-local": textClassification,
  checkbox: {
    input: "$reset checkbox checkbox-primary",
    inner: "$reset inline",
    label: "$reset ml-2 label-text",
    legend: "$reset px-1",
    fieldset: "$reset card card-bordered border-accent p-2",
    wrapper: "$reset cursor-pointer flex items-center justify-start max-w-fit",
    decorator: "hidden",
    option: "mb-1",
  },
  email: textClassification,
  month: textClassification,
  number: textClassification,
  password: textClassification,
  radio: {
    input: "$reset radio radio-primary",
    inner: "$reset inline",
    label: "$reset ml-2 label-text",
    legend: "$reset font-bold px-1",
    fieldset: "$reset card card-bordered border-accent p-2",
    wrapper: "$reset cursor-pointer flex items-center justify-start max-w-fit",
    option: "$reset mb-2 last:mb-0",
  },
  range: {
    input: "$reset range range-secondary",
  },
  search: textClassification,
  select: {
    ...textClassification,
    input: `${textClassification.input.toString() + " select"}`,
  },
  submit: buttonClassification,
  tel: textClassification,
  text: textClassification,
  textarea: {
    input: `
      $reset
      textarea
      w-full
      input-bordered
      focus-within:input-info
      formkit-invalid:input-error
      `,
  },
  time: textClassification,
  url: textClassification,
  week: textClassification,
};
