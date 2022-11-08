import { AbstractControl, ValidationErrors } from '@angular/forms';

function dateIsGreaterOrEqualThan(date1: Date, date2: Date): boolean {
  const date1Day = date1.getDate();
  const date1Month = date1.getMonth() + 1;
  const date1Year = date1.getFullYear();

  const date2Day = date2.getDate();
  const date2Month = date2.getMonth() + 1;
  const date2Year = date2.getFullYear();

  if (date1Year > date2Year) {
    return true;
  }

  if (date1Year === date2Year && date1Month > date2Month) {
    return true;
  }

  if (
    date1Year === date2Year &&
    date1Month === date2Month &&
    date1Day >= date2Day
  ) {
    return true;
  }

  return false;
}

// date1 debe ser mayor o igual a date2
export function DateGreaterOrEqualThan(
  date1ControlName: string,
  date2ControlName: string
): (group: AbstractControl) => ValidationErrors | null {
  return (group: AbstractControl) => {
    const date1: Date = group.get(date1ControlName)?.value ?? null;
    const date2: Date = group.get(date2ControlName)?.value ?? null;

    if (date1 !== null && date2 !== null) {
      return dateIsGreaterOrEqualThan(date1, date2)
        ? null
        : { dategreaterorequal: true };
    }

    return { dategreaterorequal: true };
  };
}
