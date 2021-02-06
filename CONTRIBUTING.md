# Contributing

## Requirements

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

## Lint

```console
$ docker-compose run --rm npm run lint
```

## Test

```console
$ docker-compose run --rm npm test
```

## Build

```console
$ docker-compose run --rm npm run build
```

## Try

```console
$ docker-compose run --rm --service-ports node ./sources/serve.mjs --host 0.0.0.0 --port 8000
```
