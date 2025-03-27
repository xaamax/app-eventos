// prisma.helper.ts
export function buildPrismaSelect<T>(
  fields: Array<keyof T>
): Partial<Record<keyof T, true>> {
  return fields.reduce((acc, field) => {
    acc[field] = true;
    return acc;
  }, {} as Partial<Record<keyof T, true>>);
}