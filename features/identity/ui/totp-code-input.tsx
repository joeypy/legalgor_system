"use client";

import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useId } from "react";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { TOTP_LENGTH } from "@/features/identity/otp";

const SLOT_INDEXES = [0, 1, 2, 3, 4, 5] as const;
const SLOT_GROUP_CLASS =
  "*:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:w-10 *:data-[slot=input-otp-slot]:bg-muted/40 *:data-[slot=input-otp-slot]:font-mono *:data-[slot=input-otp-slot]:text-lg *:data-[slot=input-otp-slot]:tabular-nums sm:*:data-[slot=input-otp-slot]:w-11";

export function TotpCodeInput({
  id,
  value,
  onChange,
  onComplete,
  disabled,
  invalid,
  autoFocus,
  label = "Código del autenticador",
  describedBy,
}: {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  onComplete?: (value: string) => void;
  disabled?: boolean;
  invalid?: boolean;
  autoFocus?: boolean;
  label?: string;
  describedBy?: string;
}) {
  const generatedId = useId();
  const fieldId = id ?? generatedId;
  const hintId = `${fieldId}-hint`;

  return (
    <div className="grid gap-2">
      <Label htmlFor={fieldId}>{label}</Label>
      <InputOTP
        id={fieldId}
        maxLength={TOTP_LENGTH}
        value={value}
        onChange={onChange}
        onComplete={onComplete}
        pattern={REGEXP_ONLY_DIGITS}
        inputMode="numeric"
        autoComplete="one-time-code"
        disabled={disabled}
        autoFocus={autoFocus}
        aria-invalid={invalid || undefined}
        aria-describedby={[hintId, describedBy].filter(Boolean).join(" ")}
        containerClassName="justify-center gap-3"
      >
        <InputOTPGroup className={SLOT_GROUP_CLASS}>
          {SLOT_INDEXES.slice(0, 3).map((index) => (
            <InputOTPSlot
              key={index}
              index={index}
              aria-invalid={invalid || undefined}
            />
          ))}
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup className={SLOT_GROUP_CLASS}>
          {SLOT_INDEXES.slice(3).map((index) => (
            <InputOTPSlot
              key={index}
              index={index}
              aria-invalid={invalid || undefined}
            />
          ))}
        </InputOTPGroup>
      </InputOTP>
      <p id={hintId} className="text-center text-xs text-muted-foreground">
        6 dígitos de su app. Cambian cada 30 segundos.
      </p>
    </div>
  );
}
