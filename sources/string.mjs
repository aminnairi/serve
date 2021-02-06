export const removeTrailing = (trailingText, text) => {
  if (text.endsWith(trailingText)) {
    return text.slice(0, -trailingText.length);
  }

  return text;
};

export const removeLeading = (leadingText, text) => {
  if (text.startsWith(leadingText)) {
    return text.slice(leadingText.length);
  }

  return text;
};
