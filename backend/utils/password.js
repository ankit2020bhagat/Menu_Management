import bcrypt from "bcrypt";
export const hashedpassword = async (password) => {
  const hashPassword = await bcrypt.hash(password, 10);
  return hashPassword;
};
export const checkPassword = async (password, userPassword) => {
  const result = await bcrypt.compare(password, userPassword);
  return result;
};
