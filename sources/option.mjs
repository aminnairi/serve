export const getOptionValue = ({name, fallback, boolean, options}) => {
  if (options.length === 0) {
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
    return getOptionValue({name, fallback, boolean, options: [next, ...rest]});
  }

  return getOptionValue({name, fallback, boolean, options: rest});
};
