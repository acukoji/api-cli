export function advice(idsStr: string, query: string): void {
    const ids = validateIds(idsStr);

    console.log(ids);
    console.log(query);
}

function validateIds(value: string): number[] {
  return value.split(',').map(value => parseInt(value));
}
  