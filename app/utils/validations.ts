export const validateEmail = (email: unknown): email is string => {
  return typeof email === "string" && email.length != 0 && email.includes("@");
};

export const validatePassword = (password: unknown): password is string => {
  return typeof password === "string" && password.length != 0;
};

export const validateName = (name: unknown): name is string => {
  return typeof name === "string" && name.length != 0;
};

export const validatePostContent = (content: unknown): content is string => {
  return typeof content === "string" && content.trim().length > 0;
};
