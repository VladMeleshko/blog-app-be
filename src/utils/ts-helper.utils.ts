/**
 * To simplify a cross-application search of not-nullable values
 */
export function forReal<T>(item: T | null | undefined): NonNullable<T> {
  return item!;
}
