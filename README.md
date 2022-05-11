# Node Assignment

The documentation for Node Assignment app which does basic CRUD functions on PostgreSQL Database and is automatically deployed using BitBucket Pipelines on a free-tier AWS EC2 server.

## Video Walkthrough

Watch the video walkthrough of the assignment [here](https://www.loom.com/share/19e83b5418ba43a3a8f03c16ed543c43).

## Features

- Continous Integration and Deployment using BitBucket Pipelines.
- Uses TypeScript.
- Uses PM2 to manage the nodejs cluster.
- Testing through Jest.
- Does NOT use any ORM framework, only the pg library.

## Quick Start

(OPTIONAL) Create a `.env` file with the following properties:

- POSTGRES_USER: The username of the postgres user.

- POSTGRES_HOST: The connection endpoint of the postgres database.

- POSTGRES_DATABASE: The name of the postgres database.

- POSTGRES_PASSWORD: The password of the postgres database.

- POSTGRES_PORT: The exposed port of the postgres database.

- PORT (Optional): Sets the HTTP port number of the express app.

Then run the following command:

```bash
docker-compose up --build
npm run build
npm run pm2
```

The api will get exposed at `localhost:3000`.

## Testing workflow

The testing command will the run the test suites and will attempt to do the following:

1. A manufacturer can be created
2. An equipment can be created
3. A relationship between one manufacturer and an equipment can be created
4. If a manufacturer is deleted using the REST endpoint, any related equipment will be also automatically deleted.
5. Get, delete and update a manufacturer or an equipment.

To run tests, run the following commands:

```bash
docker-compose up --build
npm test
```

## PM2 Operations

PM2 is a production process manager for Node.js applications with a built-in load balancer. It allows you to keep applications alive forever, to reload them without downtime and to facilitate common system admin tasks.

### Start the production server using pm2

``` bash
npm run build //build step
npm run pm2
```

### View Logs

``npm run log           //pm2 log``

### Monitor processes

``npm run monit         //pm2 monit``

### List running processes

``npm run list          //pm2 list all``

### Delete all processes

``npm run delete        //pm2 delete all``

### Restart all processes

``npm run restart       //pm2 restart all``

### Stop all processes

``npm run stop          //pm2 stop all``

## Project Structure

| Name                | Description                                             |
| ------------------- | ------------------------------------------------------- |
| **src/**            | Source files                                            |
| **src/controllers** | The controllers of the express app                      |
| **src/routes/**     | Express REST API routes with swagger documentation      |
| **src/utils**       | Reusable utilises and library source code like a logger |
| **tests/**          | Test suites are placed here                             |
| **scripts/**        | Bash commands to run the app inside the EC2 Instance    |

## Postman Documentation

The Postman Documentation, Curl commands and the API Playground is hosted [here](https://documenter.getpostman.com/view/18809944/UyxdK964).

## Deployment

The app is deployed to EC2 instance using BitBucket Pipelines and AWS CodeDeploy. A new instance of the app is created for each build using pm2.
The API is hosted [here](http://3.80.186.17:3000/manufacturer). The REST endpoints are open for remote testing.
