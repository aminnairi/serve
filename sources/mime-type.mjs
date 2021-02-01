import {extname} from "path";

export const getMimeTypeOr = (fallback, path) => {
  const extension = extname(path);

  if (extension === ".html") {
    return "text/html";
  }

  if (extension === ".css") {
    return "text/css";
  }

  if (extension === ".js" || extension === ".mjs") {
    return "application/javascript";
  }
  
  return fallback;
};
