export const mergeClasses = (...classNames: string[]): string => {
  let str = "";
  classNames.forEach((className) => {
    str = [str, className].join(" ");
  })
  return str;
}