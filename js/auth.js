import { isEmpty } from "./utils.js";

const formInputs = document.querySelectorAll(".form__field-input");
const submitButton = document.querySelector(".form__submit-button--disabled");

const updateSubmitButton = () => {
  const isFormFilled = Array.from(formInputs)
    .map((input) => input.value)
    .every((string) => !isEmpty(string));

  submitButton.disabled = !isFormFilled;
};

formInputs.forEach((input) => {
  input.addEventListener("input", updateSubmitButton);
});

updateSubmitButton();
