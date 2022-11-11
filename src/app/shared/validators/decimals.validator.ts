import { AbstractControl, ValidationErrors } from '@angular/forms';

export function Decimals(
  maxDigits: number,
  maxDecimals: number
): (control: AbstractControl) => ValidationErrors | null {
  return (control: AbstractControl) => {
    const value = `${control?.value || ''}`;

    // Si no tiene datos es válido. Usar required si se quiere aplicar esa restricción
    if (value.length === 0) {
      return null;
    }

    // Checkea que sea numérico
    const numericValue = +value;
    if (numericValue === NaN) {
      return { decimals: { numeric: true } };
    }

    // Checkea que tenga un máximo de decimales
    const [, decimals = ''] = value.split('.');

    if (decimals.length > maxDecimals) {
      return {
        decimals: {
          maxdecimals: {
            max: maxDecimals,
            current: decimals.length,
          },
        },
      };
    }

    // Checkea que tenga un máximo de dígitos
    const onlyNumbers = value.replace('.', '');
    if (onlyNumbers.length > maxDigits) {
      return {
        decimals: {
          maxdigits: {
            max: maxDigits,
            current: onlyNumbers.length,
          },
        },
      };
    }

    return null;
  };
}
