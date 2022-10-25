import { AbstractControl, ValidationErrors } from '@angular/forms';

export function NoWhitespace(
  control: AbstractControl
): ValidationErrors | null {
  const value = `${control?.value || ''}`;
  const onlyWhitespaces = value.trim().length === 0;
  return onlyWhitespaces ? { whitespace: true } : null;
}
