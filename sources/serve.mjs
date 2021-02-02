import {getOptionValue} from "./option.mjs";
import {serve} from "./server.mjs";

const options = process.argv.slice(2);

if (getOptionValue({name: "--help", fallback: false, boolean: true, options})) {
  console.log("--help: display this message.");
  console.log("--folder: The folder from where to serve the static folder (default to the current folder).");
  console.log("--host: The host from which to listen (default to 127.0.0.1).");
  console.log("--port: The port from which to listen (default to 8000). Fail if not integer.");
  console.log("--spa: Whether to route all request to the current folder's index.html file (default to false).");
  console.log("--verbose: Display error message on the console instead of hidding them.");
  console.log("Example: serve --folder public --host 0.0.0.0 --port 5000 --spa");

  process.exit(0);
}

const folder = getOptionValue({name: "--folder", fallback: "", boolean: false, options});
const host = getOptionValue({name: "--host", fallback: "127.0.0.1", boolean: false, options});
const port = Number(getOptionValue({name: "--port", fallback: "8000", boolean: false, options}));
const verbose = getOptionValue({name: "--verbose", fallback: false, boolean: true, options});
const spa = getOptionValue({name: "--spa", fallback: false, boolean: true, options});

if (!Number.isInteger(port)) {
  console.error("The port must be an integer.");
  process.exit(1);
}

const main = async () => {
  const server = await serve({folder, host, port, verbose, spa});

  process.on("SIGINT", () => {
    server.close();
    console.log("Server stopped gracefully.");
    process.exit(0);
  });
};

main().catch(({message}) => {
  console.error(message);
});
