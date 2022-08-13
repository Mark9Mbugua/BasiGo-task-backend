# Getting Started with This repo

Clone the repository using [http://localhost:5000](https://github.com/Mark9Mbugua/BasiGo-task-backend.git).

## cd into the root derectory

After cloning, cd into the root directory and open it using your favorite IDE

### `npm install`

To Install the various dependencies

### `npm start`

Runs the app in the development mode at [http://localhost:5000](http://localhost:5000).

### `Backend Infrastructure`

Node.js, Express, Amazon S3, MYSQL and Sequelize (ORM)

### `Private Credentials: config.json sample`

[DB config file sample](https://sequelize.org/docs/v6/other-topics/migrations)

### `Database config file location`

root/config/config.json

## Sequelize

### `Create Migration`

`npx sequelize-cli migration:create --name name_of_your_migration`

### `DB Migrate`

`npx sequelize-cli db:migrate --to 20170316142544-create-an-index.js`

### `Undo Migration`

`npx sequelize-cli db:migrate:undo` --most recent migration
