function getIsSelected(
  value: string | string[] | undefined,
  itemValue: string
) {
  if (value === undefined) {
    return false;
  }
  if (typeof value === 'string') {
    return value === itemValue;
  }
  return value.includes(itemValue);
}

function getNewSingleValue(
  originalValue: string | string[] | undefined,
  itemValue: string
) {
  if (originalValue === itemValue) {
    return undefined;
  }
  return itemValue;
}

function getNewMultipleValue(
  originalValue: string | string[] | undefined,
  itemValue: string
) {
  if (originalValue === undefined) {
    return [itemValue];
  }
  if (typeof originalValue === 'string') {
    return originalValue === itemValue ? [] : [originalValue, itemValue];
  }
  if (originalValue.includes(itemValue)) {
    return originalValue.filter((v) => v !== itemValue);
  }
  return [...originalValue, itemValue];
}

export { getIsSelected, getNewSingleValue, getNewMultipleValue };
