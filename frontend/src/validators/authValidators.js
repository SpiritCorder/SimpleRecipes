export const validateUsername = (username) => {
  if (username.trim() === "") {
    return "username is required";
  } else if (username.trim().length <= 3) {
    return "username must be at least 4 characters long";
  } else {
    return "";
  }
};

export const validatePassword = (password) => {
  if (password.trim() === "") {
    return "password is required";
  } else if (password.trim().length <= 3) {
    return "password must be at least 4 characters long";
  } else {
    return "";
  }
};
