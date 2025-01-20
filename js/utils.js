const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const pwdRegex = /^[a-zA-Z0-9]{8,}$/;

export const isEmpty = (text) => text.trim() === "";
export const isEmailValid = (email) => emailRegex.test(email);
export const isPwdValid = (pwd) => pwdRegex.test(pwd);
export const isPwdMatched = (pwd, confirm) => pwd === confirm;

export const applyClass = (target, className) => {
  if (!target.classList.contains(className)) {
    target.classList.add(className);
  }
};

export const removeClass = (target, className) => {
  if (target.classList.contains(className)) {
    target.classList.remove(className);
  }
};
