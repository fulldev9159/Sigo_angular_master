import { AbstractControl, ValidationErrors } from '@angular/forms';

function daysDiff(date1: Date, date2: Date): number {
  const time1 = date1.getTime();
  const time2 = date2.getTime();

  const diff = Math.abs(time1 - time2);
  console.log('diff', diff);

  return diff / (1000 * 60 * 60 * 24);
}

// date1 debe tener una distancia máxima de X días con date2
export function MaxDateDiffInDays(
  date1ControlName: string,
  date2ControlName: string,
  days: number
): (group: AbstractControl) => ValidationErrors | null {
  return (group: AbstractControl) => {
    const date1: Date = group.get(date1ControlName)?.value ?? null;
    const date2: Date = group.get(date2ControlName)?.value ?? null;

    if (date1 !== null && date2 !== null) {
      if (daysDiff(date1, date2) > days) {
        return {
          maxdatediffindays: {
            days,
          },
        };
      }
    }

    return null;
  };
}
