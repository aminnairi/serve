import {getOptionValue} from "./option.mjs";
import {serve} from "./server.mjs";

const options = process.argv.slice(2);

if (getOptionValue({boolean: true, fallback: false, name: "--help", options})) {
  console.log("--help: display this message.");
  console.log("--folder: The folder from where to serve the static folder (default to the current folder).");
  console.log("--host: The host from which to listen (default to 127.0.0.1).");
  console.log("--port: The port from which to listen (default to 8000). Fail if not integer.");
  console.log("--spa: Whether to route all request to the current folder's index.html file (default to false).");
  console.log("--verbose: Display error message on the console instead of hidding them.");
  console.log("--base: Set a base prefix url (default to empty) useful for GitHub Pages for instance.");
  console.log("Example: serve --folder public --host 0.0.0.0 --port 5000 --spa");

  process.exit(0);
}

const folder = getOptionValue({boolean: false, fallback: "", name: "--folder", options});
const host = getOptionValue({boolean: false, fallback: "127.0.0.1", name: "--host", options});
const port = Number(getOptionValue({boolean: false, fallback: "8000", name: "--port", options}));
const verbose = getOptionValue({boolean: true, fallback: false, name: "--verbose", options});
const spa = getOptionValue({boolean: true, fallback: false, name: "--spa", options});
const base = getOptionValue({boolean: false, fallback: "", name: "--base", options});

if (!Number.isInteger(port)) {
  console.error("The port must be an integer.");
  process.exit(1);
}

const main = async () => {
  const server = await serve({base, folder, host, port, spa, verbose});

  process.on("SIGINT", () => {
    server.close();
    console.log("Server stopped gracefully.");
    process.exit(0);
  });
};

main().catch(({message}) => {
  console.error(message);
});
