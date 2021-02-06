import {extname} from "path";

export const getMimeTypeOr = (fallback, path) => {
  const extension = extname(path);

  if (".html" === extension) {
    return "text/html";
  }

  if (".css" === extension) {
    return "text/css";
  }

  if (".js" === extension || ".mjs" === extension) {
    return "application/javascript";
  }

  return fallback;
};
