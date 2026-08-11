# Sri Aaroodha Tapobhumi Website

Welcome to the official website and admin portal for Sri Aaroodha Tapobhumi. This platform is designed to manage and display events, trustees, image galleries, and more, offering a comprehensive backend admin panel alongside a dynamic frontend.

## About the Developer

This project was built and is maintained by **Chandrappa O J**. 

- **Portfolio**: [https://chandruoj.co.in/](https://chandruoj.co.in/)

## Technologies Used

- **Frontend**: React, TypeScript, Vite, Tailwind CSS
- **Backend / Admin Panel**: PHP, MySQL
- **Design System**: shadcn-ui

## Features

- **Dynamic Frontend**: Modern and responsive UI for the ashrama visitors.
- **Secure Admin Panel**: PHP-based backend to manage dynamic content like Events, Trustees, and the Media Gallery.
- **Media Management**: Upload and manage galleries and promotional content with automatic title generation.

## Local Setup

If you want to run this project locally, make sure you have **Node.js**, **npm**, and **XAMPP (or a similar PHP/MySQL server)** installed.

### Frontend
```sh
npm install
npm run dev
```

### Backend
Deploy the `backend-php` contents to your local server (e.g., `htdocs` for XAMPP) and configure `db_connect.php` to connect to your local MySQL database using the provided `ashrama_prod_db.sql` dump.
