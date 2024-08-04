# Juna Restaurant

This web app will allow the customers in the restaurant to make an order by their self from their own table. This app used reactjs for front end and expressjs for backend. There are three main url used here, http://localhost:8084/ for main page for the customers, http://localhost:8084/orders to manage order by the restaurant owner, and http://localhost:8084/foods to add new food or remove it by the restaurant owner. For the backend using http://localhost:8083, but make sure the port is available on your local computer. Nodejs version used in this app is 20.10.0. The demo video of how to use this app also available in google drive private shared file link: https://drive.google.com/file/d/1DdP4goBUHihFMZLjhw72rIyaKLDmG8zd/view?usp=sharing

## be-express

Used expressjs framework and postgresql database, its also using Sequelize ORM to easier managing database structure and queries. Here are few steps to configure this backend app in your local computer:

-   After pull the github repo, open terminal in the root folder where package.json exist, type "yarn" to install/download node_modules.
-   Prepare the PostgreSQL database, if don't have it please install it, than create new database called "restaurant".
-   Update database connection properties in two files. First, in ".env" file for used by the app, and second in "database.json" file to running a database migration. There are host, port, database name, username, and password.
-   Run this script "npx sequelize-cli db:migrate" to migrate the database, the database tables will be generated in public schema.
-   Run this script "npx sequelize-cli db:seed:all" to insert data seeder, so the app will have a data sample and ready to test.
-   Run "yarn start" to run the app, the app will start at port 8083, you can change this port from app.js file.

## fe-react

Used reatjs framework, and most of the UI using MUI (Material design UI) from mui.com, for easier to manage and developing faster. Here are few steps to configure this frontend app in your local computer:

-   After pull the github repo, open terminal in the root folder where package.json exist, type "yarn" to install/download node_modules.
-   The port used for this app is 8084, you can change it from package.json scripts part.
-   Set up backend base url from ".env" file, in this case http://localhost:8083/, or depend on whatever port you are using in the backend.
