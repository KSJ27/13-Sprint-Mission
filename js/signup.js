import { isEmpty, isPwdMatched, applyClass, removeClass } from "./utils.js";
import { createVisibilityToggleHandler } from "./auth.js";

const ERROR_PASSWORD_MISMATCH = "비밀번호가 일치하지 않습니다.";
const ERROR_NICKNAME_EMPTY = "닉네임을 입력해주세요.";

const nicknameInput = document.querySelector("#nickname");
const nicknameInputWrapper = document.querySelector(
  ".form__field-input-wrapper--nickname"
);
const nicknameMsgContainer = document.querySelector(
  ".form__msg-container--nickname"
);
const pwdInput = document.querySelector("#password");
const confirmPwdInput = document.querySelector("#confirm-password");
const confirmPwdInputWrapper = document.querySelector(
  ".form__field-input-wrapper--confirm-password"
);
const confirmPwdMsgContainer = document.querySelector(
  ".form__msg-container--confirm-password"
);

const confirmPwdVisiblityButton = document.querySelector(
  ".form__field-button.form__field-button--confirm-password"
);
const confirmPwdVisiblityButtonImg = document.querySelector(
  ".form__field-image.form__field-image--confirm-password"
);

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

nicknameInput.addEventListener("focusout", handleNicknameFocusout);
confirmPwdInput.addEventListener("focusout", handleConfirmPwdFocusout);

confirmPwdVisiblityButton.addEventListener(
  "click",
  createVisibilityToggleHandler(confirmPwdInput, confirmPwdVisiblityButtonImg)
);
