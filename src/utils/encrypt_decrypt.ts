import crypto from "crypto";
const algorithm = "aes-256-cbc";
if (!process.env.ENCRYPTION_KEY)
  throw new Error("ENCRYPTION_KEY environment variable is required");
const secretKey = Buffer.from(process.env.ENCRYPTION_KEY, "hex");

function encrypt(text: string) {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return iv.toString("hex") + ":" + encrypted;
}

function decrypt(encryptedText: string) {
  const [ivHex, encrypted] = encryptedText.split(":");
  const iv = Buffer.from(ivHex, "hex");
  const decipher = crypto.createDecipheriv(algorithm, secretKey, iv);
  let decrypted = decipher.update(encrypted, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}

export { encrypt, decrypt };
