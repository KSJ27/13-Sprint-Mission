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

const emailRegex = new RegExp("/^S+@S+.S+$/");
const emailEmptyMessage = "이메일을 입력해주세요.";
const emailPatternMessage = "잘못된 이메일 형식입니다.";
const pwdEmptyMessage = "비밀번호를 입력해주세요.";
const pwdPatternMessage = "비밀번호를 8자 이상 입력해주세요.";
const pwdMismatchMessage = "비밀번호가 일치하지 않습니다..";
const nicknameEmptyMessage = "닉네임을 입력해주세요.";

const emailInput = document.querySelector("#email");
const emailInputWrapper = document.querySelector(".email");
const emailErrorContainer = document.querySelector(".email-error-container");
const pwdInput = document.querySelector("#password");
const pwdInputWrapper = document.querySelector(".password");
const pwdErrorContainer = document.querySelector(".password-error-container");

const handleEmailError = (e) => {
  const input = e.target.value;

  if (isEmpty(input)) {
    emailErrorContainer.textContent = emailEmptyMessage;
    emailInputWrapper.classList.toggle("error");
  } else if (!emailRegex.test(input)) {
    emailErrorContainer.textContent = emailPatternMessage;
    emailInputWrapper.classList.toggle("error");
  } else {
    emailErrorContainer.textContent = "";
  }
};

emailInput.addEventListener("focusout", handleEmailError);

const handlePwdError = (e) => {
  const input = e.target.value;

  if (isEmpty(input)) {
    pwdErrorContainer.textContent = pwdEmptyMessage;
    pwdInputWrapper.classList.toggle("error");
  } else if (!emailRegex.test(input)) {
    pwdErrorContainer.textContent = pwdPatternMessage;
    pwdInputWrapper.classList.toggle("error");
  } else {
    pwdErrorContainer.textContent = "";
  }
};

pwdInput.addEventListener("focusout", handlePwdError);
