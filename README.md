# @aminnairi/serve

Command-line interface for serving files.

[![Code Style](https://github.com/aminnairi/serve/workflows/Code%20Style/badge.svg)](https://github.com/aminnairi/serve/actions?query=workflow%3A%22Code+Style%22) [![Test](https://github.com/aminnairi/serve/workflows/Test/badge.svg)](https://github.com/aminnairi/serve/actions?query=workflow%3ATest) [![Package](https://github.com/aminnairi/serve/workflows/Package/badge.svg)](https://github.com/aminnairi/serve/actions?query=workflow%3APackage)

```console
$ npx @aminnairi/serve --folder client
Serving files from the client folder at http://127.0.0.1:8000. Hit CTRL+C at any time to stop.
```

## Requirements

- [Node 14.0.0 or later](https://nodejs.org/en/)
- [NPM](https://www.npmjs.com/)

## Usage

### NPX

```console
$ npx @aminnairi/serve --help
```

### NPM

```console
$ npm install @aminnairi/serve
$ node ./node_modules/.bin/serve --help
```

### Global

```console
$ sudo npm install --global @aminnairi/serve
$ serve --help
```

### Docker

```console
$ docker run --interactive --tty --user node --workdir /home/node --volume "$PWD":/home/node --publish 8000:8000 node npx @aminnairi/serve --host 0.0.0.0 --port 8000
```

### Docker Compose

```console
$ touch docker-compose.yaml
```

```yaml
version: "3"

services:
  server:
    image: node
    user: node
    working_dir: /home/node
    command: npx @aminnairi/serve --host 0.0.0.0 --port 8000
    ports:
      - 8000:8000
    volumes:
      - .:/home/node
```

```console
$ docker-compose up server
```

## Examples

### Folder

*The folder from where to serve the static folder (default to the current folder).*

```console
$ serve --folder public
```

### Host

*The host from which to listen (default to 127.0.0.1).*

```console
$ serve --host 0.0.0.0
```

### Port

*The port from which to listen (default to 8000). Fail if not an integer.*

```console
$ serve --port 5000
```

### Single-page application

*Whether to route all request to the current folder's index.html file (default to false).*

```console
$ serve --spa
```

### Base

*Set a base prefix url (default to empty) useful for GitHub Pages for instance.*

```console
$ serve --base aminnairi
```

### Verbose

*Display error message on the console instead of hidding them.*

```console
$ serve --verbose
```

### Help

*Display the help in the console.*

```console
$ serve --help
```
