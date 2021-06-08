const regex = /\d{1,3}(?=(\d{3})+$)/g;

export const format = (x: number): string => {
  return (x + "").replace(regex, "$&,");
};
