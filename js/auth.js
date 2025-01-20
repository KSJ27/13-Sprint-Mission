import {
  isEmpty,
  isEmailValid,
  isPwdValid,
  applyClass,
  removeClass,
} from "./utils.js";

const ERROR_EMAIL_EMPTY = "이메일을 입력해주세요.";
const ERROR_EMAIL_PATTERN = "잘못된 이메일 형식입니다.";
const ERROR_PASSWORD_EMPTY = "비밀번호를 입력해주세요.";
const ERROR_PASSWORD_PATTERN = "비밀번호를 8자 이상 입력해주세요.";

const IMG_VISIBLE_ON = "../assets/ic_visibility_on.svg";
const IMG_VISIBLE_OFF = "../assets/ic_visibility_off.svg";

const formInputWrappers = document.querySelectorAll(
  ".form__field-input-wrapper"
);
const formInputs = document.querySelectorAll(".form__field-input");
const submitButton = document.querySelector(".form__submit-button");
const emailInput = document.querySelector("#email");
const emailInputWrapper = document.querySelector(
  ".form__field-input-wrapper--email"
);
const emailMsgContainer = document.querySelector(".form__msg-container--email");
const pwdInput = document.querySelector("#password");
const pwdInputWrapper = document.querySelector(
  ".form__field-input-wrapper--password"
);
const pwdMsgContainer = document.querySelector(
  ".form__msg-container--password"
);

const pwdVisiblityButton = document.querySelector(
  ".form__field-button.form__field-button--password"
);
const pwdVisiblityButtonImg = document.querySelector(
  ".form__field-image.form__field-image--password"
);

const handleInputFocusin = () => {
  submitButton.disabled = true;
};

formInputs.forEach((inputNode) =>
  inputNode.addEventListener("focusin", handleInputFocusin)
);

const isFormValid = () => {
  const isInputsEmpty = Array.from(formInputs).some((input) =>
    isEmpty(input.value)
  );
  const isInputsValid = Array.from(formInputWrappers).every(
    (input) => !input.classList.contains("error")
  );

  return !isInputsEmpty && isInputsValid;
};

const handleEmailFocusout = (e) => {
  const email = e.target.value;

  if (!isEmailValid(email)) {
    applyClass(emailInputWrapper, "error");
    emailMsgContainer.textContent = isEmpty(email)
      ? ERROR_EMAIL_EMPTY
      : ERROR_EMAIL_PATTERN;
    return;
  } else {
    removeClass(emailInputWrapper, "error");
    emailMsgContainer.textContent = "";
  }

  submitButton.disabled = !isFormValid();
};

const handlePwdFocusout = (e) => {
  const pwd = e.target.value;

  if (!isPwdValid(pwd)) {
    applyClass(pwdInputWrapper, "error");
    pwdMsgContainer.textContent = isEmpty(pwd)
      ? ERROR_PASSWORD_EMPTY
      : ERROR_PASSWORD_PATTERN;
    return;
  } else {
    removeClass(pwdInputWrapper, "error");
    pwdMsgContainer.textContent = "";
  }

  submitButton.disabled = !isFormValid();
};

emailInput.addEventListener("focusout", handleEmailFocusout);
pwdInput.addEventListener("focusout", handlePwdFocusout);

export const createVisibilityToggleHandler = (input, image) => {
  let visible = false;

  return function onClickToggleButton() {
    visible = !visible;

    input.type = visible ? "text" : "password";
    image.src = visible ? IMG_VISIBLE_ON : IMG_VISIBLE_OFF;
  };
};

pwdVisiblityButton.addEventListener(
  "click",
  createVisibilityToggleHandler(pwdInput, pwdVisiblityButtonImg)
);
