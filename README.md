# Booking System — Frontend

A modern dark dashboard for a full-stack booking system built with React and Redux.

## Tech Stack

- **React + Vite** — Frontend framework
- **Redux Toolkit** — State management
- **React Router** — Navigation
- **React Bootstrap** — UI components
- **Axios** — HTTP requests
- **React Toastify** — Notifications

## Project Structure

```
src/
├── components/     # Reusable components
├── layouts/        # Page layouts
├── pages/          # Application pages
├── services/       # Axios instance
└── store/          # Redux store + slices
```

## Features

- **Modern Dark UI** — Professional dark theme
- **Role-based Access** — Admin and User dashboards
- **JWT Auth** — Secure authentication
- **Toast Notifications** — User feedback
- **Protected Routes** — Route guards

## Pages

| Page        | Route        | Access |
| ----------- | ------------ | ------ |
| Login       | `/login`     | Public |
| Register    | `/register`  | Public |
| Dashboard   | `/dashboard` | User   |
| My Bookings | `/bookings`  | User   |
| Admin Panel | `/admin`     | Admin  |

## Installation

```bash
npm install
npm run dev
```

## Backend API

Make sure the backend is running on `http://localhost:5000`
