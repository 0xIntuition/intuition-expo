export function getTripleLabel(triple: any) {
  return `${triple?.subject?.label} ${triple?.predicate?.label} ${triple?.object?.label}`;
}
export const numberFormatter = new Intl.NumberFormat('en', {
  notation: 'compact',
  maximumFractionDigits: 1
});