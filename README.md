# Master Thesis Project

This repository contains all files of the master thesis project "Managing Shared State in Single Page Applications built with Micro Frontend
Architecture" by Daniel Flockert.

## angular-micro-frontends

This folder contains the micro frontend apps. After `npm install`, all apps can be started in parallel with `npm run start`. `node` version 18 was used in combination with `nvm`.

## book-backend

This folder contains the book backend. A `.env` file is needed in order to start the application. Please copy the contents of `.env.example` into `.env`. The values `toBeModified` should be replaced with random hashes for security reasons if used in production. After `npm install`, all apps can be started in parallel with `npm run dev`. `node` version 14 was used in combination with `nvm`.

## multi-framework

This folder contains the second part of the project, where I showcase how you can use multiple different frameworks and share libraries. Starting the `multi-framework-version` projects as a shell and starting `react-app` will result in a website with React being loaded into the Angular app.
