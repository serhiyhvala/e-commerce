export const cropText = (str: string, charCount: number) => {
  if (str.length > charCount) {
    return str.substring(0, charCount).concat("...");
  } else {
    return str;
  }
};
