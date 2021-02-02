import {createServer} from "http";
import {promises as fs} from "fs";
import {join} from "path";
import {getMimeTypeOr} from "./mime-type.mjs";

const {readFile, lstat} = fs;

export const serve = ({folder, verbose, port, host, spa}) => {
  return new Promise(resolve => {
    const server = createServer(async (request, response) => {
      try {
        const requestPath = join(process.cwd(), folder, request.url);
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
      console.log(`Serving files from the ${folder || "current"} folder at http://${host}:${port}. Hit CTRL+C at any time to stop.`);
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
