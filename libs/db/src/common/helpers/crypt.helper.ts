import * as bcrypt from 'bcrypt';

export async function generateSalt(rounds = 10): Promise<string> {
  const salt = await bcrypt.genSalt(rounds);
  return salt;
}

export function generateSaltSync(rounds = 10): string {
  const salt = bcrypt.genSaltSync(rounds);
  return salt;
}

export async function generatePassword(password: string, saltOrRounds: string | number) {
  const hashPassword = await bcrypt.hash(password, saltOrRounds);
  return hashPassword;
}

export function generatePasswordSync(password: string, saltOrRounds: string | number) {
  const hashPassword = bcrypt.hash(password, saltOrRounds);
  return hashPassword;
}

export function generateSaltWithPasswordSync(rounds: number, password: string) {
  const salt = generateSaltSync(rounds);
  const hashPassword = generatePasswordSync(password, salt);
  return {
    salt,
    hashPassword
  };
}

export async function generateSaltWithPassword(rounds: number, password: string) {
  const salt = await generateSalt(rounds);
  const hash = await generatePassword(password, salt);
  return {
    salt,
    hash
  };
}

export async function compare(plainTestPassword: string, hash: string): Promise<boolean> {
  const comparison = await bcrypt.compare(plainTestPassword, hash);
  return comparison;
}

export function compareSync(plainTestPassword: string, hash: string): boolean {
  const comparison = bcrypt.compareSync(plainTestPassword, hash);
  return comparison;
}
