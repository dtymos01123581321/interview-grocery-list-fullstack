# Interview Project: Grocery List
We need to build a grocery list web app. The goal is to make it easy for me to remember what food to buy at the grocery store. There is a full-stack application that should use the backend. This app will use React on the frontend and [NestJS](https://nestjs.com/) on the backend. The database for the project should be PostgreSQL and the abstraction layer should be handled by [Prisma](https://www.prisma.io/). Indexes should be thought through and be effective. This application should have authorization and authentication.

Both parts of the app should use Typescript.
Fronted part should use [material ui](https://mui.com/material-ui/) and [react-query](https://react-query.tanstack.com/). For the fronted application, you can choose between [NextJS](https://nextjs.org/) or [Vite](https://vitejs.dev/).

# The application

There are two primary views: the list view and the entry view.
The view part is already included as well as the form and handler to create a grocery item. Creating grocery item doesn't have a priority field and would be a goode idea to add it.

### Grocery List View
On the list view, I can add entries, remove entries, toggle the status of that entry as either "ran out" or "have", see when the status toggle was last changed, and filter entries by status. The list view should always be sorted by priority first, and then alphabetically. Priority 1 is the highest priority, and 5 is the lowest. I should be able to filter for only "ran out", "have", or all, this will make it easy when I'm shopping to see what I need to buy by filtering for the "ran out" status. All sorting and filtering must be done on the backend.


### Grocery Entry View
On the entry view, I can see all of the details of the entry, toggle its status, and view the history of when its status has ever changed. Each entry has a name for the item (e.g. bread, eggs, etc), status (ran out or have) and a priority (numbers 1 through 5). I should also be able to delete the current entry here as well.

# Guidelines
If we have a technical interview, and I hope we do, we will focus on enhancing this application and discussing how you worked through some of these problems. It's important that we see your best work, if that means that you do not satisfy all of the requirements here that is okay, we don't expect everyone to finish all parts. If you have to choose between refactoring and making one piece of this perfect and implementing the next feature, choose refactoring because we want to see how your best work looks. We want to see clear, correct code that uses the right data structures and patterns, and we want to see your style. Depending on your expertise you may focus on the backend or the frontend but you should not have to spend more than 8 hours.

## Setup
The application is already scaffolded for you, you can start by running `docker-compose up`. This will start the database. The backend is in the `api` folder, and the frontend is in the `app` folder (this is a Vite app but you can replace it with NextJS if you prefer). Before running `yarn start` in the `api` folder you should run `yarn prisma:generate:client`, `yarn prisma:migrate:deploy`, and `npx prisma db seed` to seed the db with default data. First command will create all of the Prisma types for you, the second will create the database schema, and the third will seed the database with some initial data.

### Nice to haves
- Authorization and authentication using JWT.
- Unit testing.
- Integration testing.
- End-to-end testing.
- Dockerizing both frontend and backend. Use docker-compose to run the application.
- Implement Prisma migration to add default grocery list and user if applicable.
- Publish the application on a cloud platform like [Render](https://render.com/), [Vercel](https://vercel.com/), [Netlify](https://www.netlify.com/), or [Heroku](https://www.heroku.com/).
