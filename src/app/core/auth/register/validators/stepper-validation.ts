import { FormGroup } from '@angular/forms';

export function isPersonalDataValid(form: FormGroup): boolean {
  if (!form) return false;

  const fullNameValid = form.get('fullName')?.valid ?? false;
  const emailValid = form.get('email')?.valid ?? false;
  const passwordValid = form.get('password')?.valid ?? false;
  const confirmPasswordValid = form.get('confirmPassword')?.valid ?? false;
  const passwordMismatch = form.errors?.['passwordMismatch'] ?? false;

  return fullNameValid && emailValid && passwordValid && confirmPasswordValid && !passwordMismatch;
}
