import {
  isEmpty,
  isEmailValid,
  isPwdValid,
  isPwdMatched,
  applyClass,
  removeClass,
} from "./utils.js";

const ERROR_EMAIL_EMPTY = "이메일을 입력해주세요.";
const ERROR_EMAIL_PATTERN = "잘못된 이메일 형식입니다.";
const ERROR_PASSWORD_EMPTY = "비밀번호를 입력해주세요.";
const ERROR_PASSWORD_PATTERN = "비밀번호를 8자 이상 입력해주세요.";
const ERROR_PASSWORD_MISMATCH = "비밀번호가 일치하지 않습니다.";
const ERROR_NICKNAME_EMPTY = "닉네임을 입력해주세요.";

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
const nicknameInput = document.querySelector("#nickname");
const nicknameInputWrapper = document.querySelector(
  ".form__field-input-wrapper--nickname"
);
const nicknameMsgContainer = document.querySelector(
  ".form__msg-container--nickname"
);
const confirmPwdInput = document.querySelector("#confirm-password");
const confirmPwdInputWrapper = document.querySelector(
  ".form__field-input-wrapper--confirm-password"
);
const confirmPwdMsgContainer = document.querySelector(
  ".form__msg-container--confirm-password"
);

const pwdVisiblityButton = document.querySelector(".form__field-button");
const pwdVisiblityButtonImg = document.querySelector(".form__field-image");

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

const handleNicknameFocusout = (e) => {
  const nickname = e.target.value;

  if (isEmpty(nickname)) {
    applyClass(nicknameInputWrapper, "error");
    nicknameMsgContainer.textContent = ERROR_NICKNAME_EMPTY;
    return;
  } else {
    removeClass(nicknameInputWrapper, "error");
    nicknameMsgContainer.textContent = "";
  }

  submitButton.disabled = !isFormValid();
};

const handleConfirmPwdFocusout = (e) => {
  const pwd = pwdInput.value;
  const confirmPwd = e.target.value;

  if (!isPwdMatched(pwd, confirmPwd)) {
    applyClass(confirmPwdInputWrapper, "error");
    confirmPwdMsgContainer.textContent = ERROR_PASSWORD_MISMATCH;
    return;
  } else {
    removeClass(confirmPwdInputWrapper, "error");
    confirmPwdMsgContainer.textContent = "";
  }

  submitButton.disabled = !isFormValid();
};

emailInput.addEventListener("focusout", handleEmailFocusout);
pwdInput.addEventListener("focusout", handlePwdFocusout);
nicknameInput.addEventListener("focusout", handleNicknameFocusout);
confirmPwdInput.addEventListener("focusout", handleConfirmPwdFocusout);

const setToggleButton = (input, image) => {
  let visible = false;

  return function onClickToggleButton() {
    visible = !visible;

    input.type = visible ? "text" : "password";
    image.src = visible ? IMG_VISIBLE_ON : IMG_VISIBLE_OFF;
  };
};

pwdVisiblityButton.addEventListener(
  "click",
  setToggleButton(pwdInput, pwdVisiblityButtonImg)
);
