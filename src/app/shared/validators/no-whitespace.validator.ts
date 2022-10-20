import { FormControl } from '@angular/forms';

export function NoWhitespace(
  control: FormControl
): { whitespace: boolean } | null {
  const onlyWhitespaces = (control.value || '').trim().length === 0;
  return onlyWhitespaces ? { whitespace: true } : null;
}
