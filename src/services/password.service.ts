import bcrypt from 'bcrypt';

const SAL_ROUNDS: number = 10;

// Hashear password
export const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, SAL_ROUNDS);
};

// Comparar passwords
export const comparePasswords = async (
  password: string,
  hash: string
): Promise<boolean> => {
  return await bcrypt.compare(password, hash);
};
