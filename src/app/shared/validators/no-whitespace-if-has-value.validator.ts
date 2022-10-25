import { AbstractControl, ValidationErrors } from '@angular/forms';

export function NoWhitespaceIfHasValue(
  control: AbstractControl
): ValidationErrors | null {
  const value = `${control?.value || ''}`;
  if (value.length === 0) {
    return null;
  }
  const onlyWhitespaces = value.trim().length === 0;
  return onlyWhitespaces ? { whitespace: true } : null;
}
