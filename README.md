# Awork Challenge

Hello ! Welcome to the awork challenge 🤩. We are looking forward to seeing what you will come up with!

Let us know if you have any questions and refer to the instructions sent to you. This readme contains mostly the install steps to get up and running with the application in its initial state.

### Prerequisites

- Install [Node.js](https://nodejs.org/) which includes [Node Package Manager][npm](https://www.npmjs.com/get-npm)
- Run `npm install` to install the node packages

## Introduction

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.0.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

New content for the reviewers :D

## Husky

When committing new changes, files will be automatically scanned and overwritten by [prettier](https://prettier.io/). Please, do not skip this file formatting to ensure all collaborators share the same code style format.

## Firebase

- Ask your colleagues to be added to the [users-management-api](https://github.com/santironhacker/users-management) project in Firebase.
- Run `firebase login`
- Run `firebase use` to check you correctly have `* default (users-management-api)` as default project.

### Firebase emulators

- Build the project for production with `ng build -c production`.
- Run the emulators with `firebase emulators:start` and check your changes.

### Firebase deploy

- Option 1: Deploy to a preview channel with `firebase hosting:channel:deploy CHANNEL_ID`. Check the URL returned by the Firebase CLI, which should look something like: `PROJECT_ID--CHANNEL_ID-RANDOM_HASH.web.app`.
- Option 2: Deploy live to [https://users-management-api.web.app/](https://users-management-api.web.app/) with `firebase deploy --only hosting -m "Deploy message here"`.
- Option 3: Deploy a preview version from `option 1` with `firebase hosting:clone users-management:CHANNEL_ID users-management:live`
