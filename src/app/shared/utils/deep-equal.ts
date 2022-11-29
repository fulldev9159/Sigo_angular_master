function isObject(obj: any): boolean {
  return obj !== null && typeof obj === 'object';
}

export function DeepEqual(object1: any, object2: any): boolean {
  if (
    typeof object1 !== 'object' ||
    typeof object2 !== 'object' ||
    object1 === null ||
    object2 === null
  ) {
    return false;
  }

  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    const val1 = object1[key];
    const val2 = object2[key];
    const areObjects = isObject(val1) && isObject(val2);
    if (
      (areObjects && !DeepEqual(val1, val2)) ||
      (!areObjects && val1 !== val2)
    ) {
      return false;
    }
  }
  return true;
}
