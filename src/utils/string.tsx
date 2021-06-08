export const initials = (...args: (string | undefined)[]): string => {
  return args.map(it => (it && it[0] ? it[0].toUpperCase() : "")).join("");
};
