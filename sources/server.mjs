import {createServer} from "http";
import {promises as fs} from "fs";
import {getMimeTypeOr} from "./mime-type.mjs";
import {join} from "path";

const {readFile, lstat} = fs;

const removeTrailing = (trailingText, text) => {
  if (text.endsWith(trailingText)) {
    return text.slice(0, -trailingText.length);
  }

  return text;
};

const removeLeading = (leadingText, text) => {
  if (text.endsWith(leadingText)) {
    return text.slice(leadingText.length);
  }

  return text;
};

export const serve = ({folder, verbose, port, host, spa, base}) => {
  const separator = "/";
  const normalizedBase = removeTrailing(separator, removeLeading(separator, base));

  return new Promise(resolve => {
    const server = createServer(async (request, response) => {
      try {
        const requestPath = join(process.cwd(), folder, request.url.replace(normalizedBase, ""));
        const stat = await lstat(requestPath);
        const filePath = join(requestPath, stat.isDirectory() ? "index.html" : "");
        const fileBuffer = await readFile(filePath);
        const fileContent = fileBuffer.toString();

        return response.writeHead(200, {
          "Content-Type": getMimeTypeOr("text/plain", filePath)
        }).end(fileContent);
      } catch ({message}) {
        if (verbose) {
          console.error(message);
        }

        if (spa) {
          try {
            const filePath = join(process.cwd(), folder, "index.html");
            const fileBuffer = await readFile(filePath);
            const fileContent = fileBuffer.toString();

            return response.writeHead(200, {
              "Content-Type": getMimeTypeOr("text/plain", filePath)
            }).end(fileContent);
          } catch ({message: error}) {
            if (verbose) {
              console.error(error);
            }
          }
        }
      }

      return response.writeHead(404, {}).end();
    });

    server.listen(port, host, () => {
      const folderName = "" === folder.length || "." === folder ? "current" : folder;
      console.log(`Serving files from the ${folderName} folder${base ? ` (with a base url of ${base})` : ""} at http://${host}:${port}. Hit CTRL+C at any time to stop.`);
      resolve(server);
    });

    server.on("error", ({message}) => {
      if (verbose) {
        console.error(message);
      }

      process.exit(1);
    });
  });
};
