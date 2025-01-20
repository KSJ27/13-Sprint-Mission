import {
  isEmpty,
  isEmailValid,
  isPwdValid,
  applyClass,
  removeClass,
} from "./utils.js";

const emailEmptyMessage = "이메일을 입력해주세요.";
const emailPatternMessage = "잘못된 이메일 형식입니다.";
const pwdEmptyMessage = "비밀번호를 입력해주세요.";
const pwdPatternMessage = "비밀번호를 8자 이상 입력해주세요.";
const pwdMismatchMessage = "비밀번호가 일치하지 않습니다..";
const nicknameEmptyMessage = "닉네임을 입력해주세요.";

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

const isFormValid = () =>
  Array.from(formInputs).every(
    (input) => !input.classList.contains("error") && !isEmpty(input.value)
  );

const handleEmailFocusout = (e) => {
  const email = e.target.value;

  if (!isEmailValid(email)) {
    applyClass(emailInputWrapper, "error");
    emailMsgContainer.textContent = isEmpty(email)
      ? emailEmptyMessage
      : emailPatternMessage;
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
      ? pwdEmptyMessage
      : pwdPatternMessage;
    return;
  } else {
    removeClass(pwdInputWrapper, "error");
    pwdMsgContainer.textContent = "";
  }

  submitButton.disabled = !isFormValid();
};

emailInput.addEventListener("focusout", handleEmailFocusout);
pwdInput.addEventListener("focusout", handlePwdFocusout);

const handleInputFocusin = () => {
  submitButton.disabled = true;
};

formInputs.forEach((inputNode) =>
  inputNode.addEventListener("focusin", handleInputFocusin)
);
