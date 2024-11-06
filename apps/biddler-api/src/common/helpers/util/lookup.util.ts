export function mapLookup(origin: string, mapped: string): boolean {
  if (origin.indexOf(mapped) > -1) {
    return true; //
  }

  return false;
}
