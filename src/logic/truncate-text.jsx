export function truncate(str) {
  const text = str.slice(0, 120);
  const a = text.split(" ");
  a.splice(a.length - 1, 1);
  const res = a.join(" ");
  return `${res}...`;
}

export function truncateName(str) {
  const text = str.slice(0, 16);
  const a = text.split(" ");
  a.splice(a.length - 1, 1);
  const res = a.join(" ");
  return `${res}...`;
}
