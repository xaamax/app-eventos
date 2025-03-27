export function buildPrismaSelect<T>(
  fields: Array<keyof T>,
  hideFields?: Array<keyof T>,
): Partial<Record<keyof T, true>> {
  if (hideFields) {
    return fields
      .filter((field) => !hideFields.includes(field))
      .reduce(
        (acc, field) => {
          acc[field] = true;
          return acc;
        },
        {} as Partial<Record<keyof T, true>>,
      );
  }

  return fields.reduce(
    (acc, field) => {
      acc[field] = true;
      return acc;
    },
    {} as Partial<Record<keyof T, true>>,
  );
}
