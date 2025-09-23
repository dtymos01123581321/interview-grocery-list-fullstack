# Interview Project: Grocery List

![Preview](./screenshot.png)

We need to build a grocery list web app. The goal is to make it easy for me to remember what food to buy at the grocery store.  
There is a full-stack application that should use the backend. This app will use **React (Vite)** on the frontend and [NestJS](https://nestjs.com/) on the backend.  
The database for the project is **PostgreSQL**, and the abstraction layer is handled by [Prisma](https://www.prisma.io/). Indexes should be thought through and be effective.  
This application has **authorization and authentication (JWT)** already implemented.  

Both parts of the app use **Typescript**.  
The frontend part uses [Material UI](https://mui.com/material-ui/) and [React Query](https://react-query.tanstack.com/).  

---

# The application

There are two primary views: the **list view** and the **entry view**.  
The UI is built and connected to the backend API. You can create, update, filter, and delete grocery items.  

### Grocery List View
- Add entries, remove entries, toggle the status of that entry as either **"ran out"** or **"have"**.  
- See when the status toggle was last changed.  
- Filter entries by status (`ran out`, `have`, or all).  
- Always sorted by **priority first**, then **alphabetically**. (Priority 1 = highest, 5 = lowest).  
- All sorting and filtering is done on the backend.  

### Grocery Entry View
- See all details of the entry.  
- Toggle its status.  
- View the **history of changes** (when the status was updated).  
- Delete the current entry.  

---

# Guidelines

If we have a technical interview, and I hope we do, we will focus on enhancing this application and discussing how you worked through some of these problems.  
It’s important that we see your best work — clean, correct code that uses the right data structures and patterns.  

Depending on your expertise you may focus on the backend or the frontend, but you should not have to spend more than **8 hours**.  

---

## Setup

The application is dockerized and ready to run.  

### 1. Clone repo
```bash
git clone <repo-url>
cd interview-grocery-list-fullstack
```

### 2. Run with Docker
```bash
docker compose build
docker compose up -d
```

### 3. Services
- **Backend API (NestJS)** → `http://localhost:4000/api`
- **Swagger Docs** → `http://localhost:4000/api/docs`
- **Frontend (React + Vite)** → `http://localhost:5173`
- **Postgres DB** → `localhost:5433`

### 4. Migrations
Migrations are applied automatically on startup.  
If needed manually:
```bash
docker compose run --rm migrate
```

---

## Nice to haves
- ✅ Authorization and authentication using JWT (already implemented).  
- ✅ Unit testing.  
- ⬜ Integration testing.  
- ⬜ End-to-end testing.  
- ✅ Dockerizing both frontend and backend.  
- ✅ Prisma migrations with history.  
- ⬜ Deploy the application on a cloud platform like [Render](https://render.com/), [Vercel](https://vercel.com/), [Netlify](https://www.netlify.com/), or [Heroku](https://www.heroku.com/).  

---
