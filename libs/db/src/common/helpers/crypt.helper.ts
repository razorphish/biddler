import * as bcrypt from 'bcrypt';
import { pbkdf2, pbkdf2Sync, randomBytes, randomUUID, scryptSync, timingSafeEqual } from 'crypto';

export async function generateSalt(rounds = 10): Promise<string> {
  const salt = await bcrypt.genSalt(rounds);
  return salt;
}

export function generateSaltSync(rounds = 10): string {
  const salt = bcrypt.genSaltSync(rounds);
  return salt;
}

export async function generateHash(password: string, saltOrRounds: string | number) {
  const hashPassword = await bcrypt.hash(password, saltOrRounds);
  return hashPassword;
}

export async function generateSaltWithHashCrypto(
  password: string,
  hashIterations: number,
  keyLength: number
): Promise<{ salt: string; hash: string }> {
  const salt = randomBytes(12).toString('base64');
  const key = await new Promise<string>((resolve, reject) => {
    pbkdf2(password, salt, hashIterations, keyLength, 'sha256', (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result.toString('base64'));
      }
    });
  });

  const hash = `pbkdf2_sha256$${this.HASH_ITERATIONS}$${salt}$${key}`;

  return {
    salt,
    hash
  };
}

export function generateHashSync(password: string, saltOrRounds: string | number) {
  const hashPassword = bcrypt.hash(password, saltOrRounds);
  return hashPassword;
}

export function generateSaltWithPasswordSync(rounds: number, password: string) {
  const salt = generateSaltSync(rounds);
  const hash = generateHashSync(password, salt);
  return {
    salt,
    hash
  };
}

export async function generateSaltWithPassword(rounds: number, password: string) {
  const salt = await generateSalt(rounds);
  const hash = await generateHash(password, salt);
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

export function compareCrypto(password, hash, keyLength: number) {
  if (!hash.startsWith('pbkdf2_')) {
    return false;
  }
  const parts = hash.split('$');
  const iterations = +parts[1];
  const salt = parts[2];
  const digest = parts[0].split('_')[1];

  return pbkdf2Sync(password, salt, iterations, keyLength, digest).toString('base64') === parts[3];
}

export function generateRandomID() {
  return randomUUID();
}

export function generateSecretKey(size = 32, format: BufferEncoding = 'base64') {
  const buffer = randomBytes(size);
  return buffer.toString(format);
}

export function generateSecretKeyHashWithSalt(key) {
  const salt = randomBytes(16).toString('hex');
  const buffer = scryptSync(key, salt, 64) as Buffer;
  return { hash: `${buffer.toString('hex')}.${salt}`, salt };
}

export function generateSecretKeyWithHash(size = 32, format: BufferEncoding = 'base64') {
  const key = generateSecretKey(size, format);
  const { hash, salt } = generateSecretKeyHashWithSalt(key);
  return {
    key,
    hash,
    salt
  };
}

export function compareSecretKeys(suppliedKey, storedKey) {
  const [hashedPassword, salt] = storedKey.split('.');

  const buffer = scryptSync(suppliedKey, salt, 64) as Buffer;
  return timingSafeEqual(Buffer.from(hashedPassword, 'hex'), buffer);
}
