import { AbstractControl, ValidationErrors } from '@angular/forms';

export function NonZero(control: AbstractControl): ValidationErrors | null {
  const value = `${control?.value || ''}`;
  const num = (val => (isNaN(val) ? 0 : val))(parseInt(value, 10));
  return num < 1 ? { nonzero: true } : null;
}
