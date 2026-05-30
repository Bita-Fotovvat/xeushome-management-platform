# XeusHome Renovation Website

A full-stack renovation company website built for Xeus Home, featuring a React frontend, Express backend, PostgreSQL database, secure admin dashboard, project portfolio management, customer inquiry management, image uploads, and a quotation engine.

🌐 Live Website: https://xeushome.ca

---

## Overview

This project is a production-style full-stack web application for a renovation company. It allows visitors to explore renovation services, view completed projects, and submit inquiries, while providing administrators with a protected dashboard to manage website content and customer leads.

The application is built as a client-server monorepo with a React single-page application and an Express API connected to PostgreSQL.

---

## Tech Stack

### Frontend

* React
* React Router v6
* SCSS / SASS
* React Toastify
* React Helmet Async
* MUI
* jsPDF

### Backend

* Node.js
* Express.js
* PostgreSQL
* REST API architecture

### Authentication & Security

* JSON Web Tokens (JWT)
* bcrypt.js password hashing
* Protected admin routes
* Environment variables with dotenv

### File Uploads & Communication

* Multer
* UUID / crypto-based unique file naming
* Nodemailer

### Development Tools

* Git & GitHub
* Concurrently
* npm scripts

---

## Key Features

### Public Website

* Responsive renovation company website
* Dynamic project portfolio
* Individual project detail pages
* Contact form for customer inquiries
* Mobile-friendly layout
* SEO-conscious page structure and metadata support

---

## Admin Dashboard

The application includes a protected admin dashboard that allows administrators to manage website content without editing the codebase.

### Admin Features

* Secure admin login
* JWT-based session authentication
* Token verification before dashboard access
* Projects Management tab
* Customer Inquiries tab
* Quotation Engine tab
* Logout functionality

---

## Project Management System

The admin dashboard includes full CRUD functionality for renovation projects.

Administrators can:

* Create new projects
* Edit existing projects
* Delete projects
* Add project title, slug, location, category, description, meta description, tags, completion date, display order, and featured status
* Upload cover images
* Upload and manage gallery images
* Store project data in PostgreSQL
* Display project data dynamically on the public website

---

## Customer Inquiry Management

The website includes a contact form connected to the backend.

Customer inquiries are:

* Submitted through the public website
* Stored in the PostgreSQL messages table
* Displayed inside the admin dashboard
* Deletable by an authenticated administrator
* Sent to the site administrator through Nodemailer email notifications

---

## Image Upload System

The project includes a backend image upload system using Multer.

Implemented functionality includes:

* Single image uploads
* Multiple image uploads
* Cover image support
* Gallery image support
* Image type filtering for JPEG, PNG, WebP, and GIF
* File size limit handling
* Unique filename generation to prevent naming conflicts
* Static serving of uploaded files

---

## Quotation Engine

The admin dashboard includes a renovation quotation engine.

Implemented functionality includes:

* Material database management
* Nested material/category structure
* Quote builder interface
* Quote line items
* Project/client quote information
* Saved quotes in PostgreSQL
* PDF quote generation support

---

## Database Design

The application uses PostgreSQL with tables for:

* Admin users
* Renovation projects
* Project images
* Customer messages / inquiries
* Quote materials
* Quotes
* Quote line items

The schema supports dynamic content management, relational project images, customer lead tracking, and quote generation.

---

## API Functionality

The Express backend provides API routes for:

* Admin authentication
* Token verification
* Project retrieval
* Project creation
* Project updates
* Project deletion
* Image uploads
* Customer inquiry submission
* Customer inquiry management
* Quotation material management
* Quote creation and retrieval

---

## Technical Highlights

* Built a full-stack React and Express application for a real renovation business
* Replaced hardcoded project content with dynamic PostgreSQL-backed project data
* Implemented JWT authentication for protected admin functionality
* Built authenticated CRUD operations for project portfolio management
* Integrated Multer for project image upload workflows
* Connected customer inquiries to both database storage and email notifications
* Added an internal quotation engine with material management, quote building, and PDF generation support
* Structured the frontend using reusable React components and SCSS styling
* Configured concurrent development scripts for running the React client and Express server together

---

## Future Enhancements

* Cloud image hosting using Cloudinary or AWS S3
* Inquiry status tracking such as unread, contacted, quoted, and closed
* Project filtering and search
* Admin analytics dashboard
* Online appointment booking
* Customer testimonial management
* More advanced quote templates and pricing rules

---

## Author

**Bita Fotovvat**

M.Eng. Systems & Technology (Co-op)
McMaster University

LinkedIn: https://www.linkedin.com/in/bita-fotovvat
