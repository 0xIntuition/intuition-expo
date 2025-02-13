export function getTripleLabel(triple: any) {
  return `${triple?.subject?.label} ${triple?.predicate?.label} ${triple?.object?.label}`;
}
