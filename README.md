# Ars Florum MicroCourses Platform

## Project Overview

Ars Florum MicroCourses is a full-stack web application that allows users to browse floral design courses, view detailed course information, and enrol in a course.  

The project was developed using a MERN-style architecture, combining a React front-end with a Node.js and Express back-end, connected to a MongoDB database.  

Users can explore multiple courses, view detailed course pages, and interact with the application by enrolling in courses, dynamically updating enrolment counts in the database.

---

## Features

### Front-End
- Responsive home page displaying available courses
- Course cards with images, titles, and links to detailed pages
- Detailed course page showing:
  - course title
  - image
  - description
  - instructor
  - duration
  - category
  - modules
  - enrolment count
- React Router used for page navigation

### Back-End
- Express server providing API endpoints
- MongoDB database integration using Mongoose
- Course data model with structured fields
- API supports retrieving and updating course data

### Client-Side Integration
- React fetches data from the backend API
- Users can:
  - view all courses
  - view individual course details
  - enrol in a course (increments enrolment count)

---

## Technologies Used

### Front-End
- React
- React Router
- CSS

### Back-End
- Node.js
- Express.js
- MongoDB
- Mongoose
- dotenv
- cors

---

## How to Set Up and Run the Project Locally

### 1. Navigate to the project folder

```bash
cd "Assessment folder 1"

---

### 2. Server Setup

cd server
npm install


### 3. Client Setup

Open a new terminal and run:

```bash
cd client
npm install
npm start


### 4. Seed the Database

To populate the database with course data, open the following URL in your browser:

http://localhost:5000/seed

This will insert the sample Ars Florum courses into MongoD

---

## Advanced Functionality (Implementation Plan)

### Caching
Caching can be used to improve performance by storing frequently requested data in memory instead of repeatedly querying the database. For this project, caching could be applied to endpoints such as `/courses` and `/courses/:id` so that course data loads faster when accessed multiple times. This could be implemented using a tool such as Redis.

### Cache Invalidation
Cache invalidation ensures that outdated data is not displayed to users. When data changes, such as when a user enrols in a course and the enrolment count increases, the relevant cached data should be cleared or refreshed. This ensures that users always see the most up-to-date course information.

### Load Balancing
Load balancing distributes incoming requests across multiple server instances to improve performance and reliability. In a production environment, this application could use a load balancer such as Nginx or a cloud-based service to evenly distribute traffic across multiple Express servers.

### High Availability (Back-End)
High availability ensures the application remains operational even if part of the system fails. This could be achieved by running multiple instances of the Express server. If one instance fails, another can continue handling requests. A process manager such as PM2 could also be used to automatically restart the application if it crashes.

### High Availability (MongoDB)
MongoDB Atlas supports high availability through replica sets. Data is replicated across multiple nodes so that if one node fails, another can take over automatically. This helps prevent downtime and ensures data is preserved. Additional backups and multi-region deployment can further improve reliability.