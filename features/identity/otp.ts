export const TOTP_LENGTH = 6;
export const BACKUP_CODE_MIN_LENGTH = 8;
export const BACKUP_CODE_MAX_LENGTH = 32;

const TOTP_DIGITS = /^\d{6}$/;
const BACKUP_CODE = /^[a-zA-Z0-9-]{8,32}$/;

export type CodeParseResult =
  | { ok: true; code: string }
  | { ok: false; error: string };

export function parseTotpCode(value: string): CodeParseResult {
  const digits = value.replace(/\D/g, "");

  if (digits.length === 0) {
    return { ok: false, error: "Ingrese el código de 6 dígitos." };
  }

  if (digits.length < TOTP_LENGTH) {
    const remaining = TOTP_LENGTH - digits.length;
    return {
      ok: false,
      error:
        remaining === 1
          ? "Falta 1 dígito."
          : `Faltan ${remaining} dígitos.`,
    };
  }

  if (!TOTP_DIGITS.test(digits)) {
    return { ok: false, error: "El código debe ser exactamente 6 números." };
  }

  return { ok: true, code: digits };
}

export function parseBackupCode(value: string): CodeParseResult {
  const code = value.trim().replace(/\s+/g, "");

  if (!code) {
    return { ok: false, error: "Ingrese un código de respaldo." };
  }

  if (code.length < BACKUP_CODE_MIN_LENGTH) {
    return { ok: false, error: "El código de respaldo es demasiado corto." };
  }

  if (code.length > BACKUP_CODE_MAX_LENGTH) {
    return { ok: false, error: "El código de respaldo es demasiado largo." };
  }

  if (!BACKUP_CODE.test(code)) {
    return {
      ok: false,
      error: "Use solo letras, números o guiones, sin espacios.",
    };
  }

  return { ok: true, code };
}
