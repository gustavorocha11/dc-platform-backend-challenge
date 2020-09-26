# DC platform challenge

## Usage - part 1

```bash
cd part-1
```

Install dependencies:

```bash
bash install_dependencies.sh
```

Start redis container and dev server:

```bash
bash start_container_and_server.sh
```

[Optional] Initialize only the dev server:

```bash
yarn start
```

Run tests:

```bash
yarn test
```

## Usage - part 2

Start the mocked API:

```bash
ruby challenge/url-aggregator-api.rb
```

Create the filtered dump file:

```bash
cd part-2
bash filter_dump.sh
```

Run tests (after running the bash script):

```bash
yarn test
```

## Technologies used

- Node.js
- Express
- Jest
- Redis docker image
