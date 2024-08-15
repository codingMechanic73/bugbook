export const validateEmail = (email: unknown): email is string => {
  return typeof email === "string" && email.length != 0 && email.includes("@");
};

export const validatePassword = (password: unknown): password is string => {
  return typeof password === "string" && password.length != 0;
};
