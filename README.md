## Getting Started

### Step 1: Set up the development environment

You need to set up your development environment before you can do anything.
  
```bash
npm i -g yarn
```

### Step 2: Clone the project

Fork or clone this project and then open it using your favorite IDE.
```bash
git clone **repo**

```

Copy the `.env.example` file and rename it to `.env`. In this file you have to add the required environment variables for the application to work. You can see the details regarding the variables in the [Environment Variables](#-environment-variables) section.

### Step 3: Install dependencies

After cloning the project, you need to install the required dependencies for it to run.

```bash
yarn install
```

### Step 3: Set up the local database

Run the following script to build your local database image (PostgreSQL) using Docker.

```bash 
docker-compose up -d
```

This will build the database using the settings defined in the `docker-compose.yml` file. After that you can connect to the DB using some tool like DBeaver if you want.

### Step 4: Init the application

```bash
yarn start:dev
```

> This will start a local server using `ts-node-dev`, which will watch for any file changes and will restart the server according to these changes.
> The server address will be available to you as `http://localhost:{{port}}`. Port is the same you defined in the `.env` file

### Install
- Install all dependencies with `yarn install`

### Database Migration
- To migrate your database run `yarn db:migrate`. This will create the required tables in your local database.

### Building the project and run it
- If you run the `yarn start` script, it will automatically trigger the `yarn prestart` script, which runs `yarn build`. The build script just runs the `tsc` compiler and generate the JavaScript files inside the `build` folder. After the compilation, the server will start.
- There's also another script called `yarn prebuild`, which will be triggered before `yarn build`, and it simply removes the current `build` folder before transpiling the code again.
- The server will be available at `http://localhost:{{port}}`.

### Running in dev mode
- Run `yarn start:dev` to start the project with `ts-node-dev`.
- The server will be available at `http://localhost:{{port}}`

## Project Structure

| Name                               | Description |
| ---------------------------------- | ----------- |
| **build/**                         | Compiled source files will be placed here |
| **src/**                           | Source files |
| **src/config/**                    | Project configuration files |
| **src/graphql/resolvers/**         | GraphQL resolvers separated by domain and function (queries and mutations) |
| **src/graphql/resolvers/*/types/** | GraphQL object and input types |
| .env.example                       | Environment configurations example file |


## Environment Variables

The list bellow features the environment variables defined in the application. All variables are **required**.

| Environment      | Description                                  |
|----------------- |--------------------------------------------- |
| PORT             | Port where the server will start             |
| HASURA_URL       | Hasura Connection                            |
| ACCESS_SECRET    | secret to encrypt JWT                        |


