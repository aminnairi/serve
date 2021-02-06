export const getOptionValue = ({name, fallback, boolean, options}) => {
  if (0 === options.length) {
    return fallback;
  }

  const [current, next, ...rest] = options;

  if (current.trim() === name.trim()) {
    if (boolean) {
      return true;
    }

    if (next) {
      return next;
    }

    return fallback;
  }

  if (next) {
    return getOptionValue({boolean, fallback, name, options: [next, ...rest]});
  }

  return getOptionValue({boolean, fallback, name, options: rest});
};
