# DSO101 Assignment 1 – CI/CD Pipeline for To-Do Application

## Student Information

**Name:** Sangay Kenchap
**Student ID:** 02250366

## Project Overview

This project implements a full-stack To-Do application using:

* React.js (Frontend)
* Node.js & Express.js (Backend)
* PostgreSQL (Database)
* Docker (Containerization)
* Docker Hub (Image Registry)
* Render (Cloud Deployment)

## Repository & Deployment

**GitHub Repository:**
https://github.com/Sangay-Kenchap/SangayKenchap_02250366_DSO101_A1

**Live Application:**
https://fe-todo-git-nyfj.onrender.com/

## Assignment Requirements

### Part 0 – Full-Stack Application

Completed the following:

* Create tasks
* View tasks
* Update tasks
* Delete tasks
* PostgreSQL database integration

### Part A – Docker & Cloud Deployment

* Created Dockerfiles for frontend and backend
* Built Docker images
* Pushed images to Docker Hub
* Deployed application on Render

### Part B – CI/CD Automation

* Created `render.yaml`
* Connected GitHub repository to Render
* Enabled automatic deployment on every push

## Running Locally

### Backend

```bash
cd backend
npm install
npm start
```

### Frontend

```bash
cd frontend
npm install
npm start
```

Frontend runs on:

```text
http://localhost:3000
```

## Challenges Faced

1. Deployment errors due to environment variable configuration.
2. Frontend and backend communication issues after deployment.
3. Docker build and image push errors.

These issues were resolved through debugging, correcting configuration files, and updating deployment settings.

## Learning Outcomes

Through this assignment, I gained experience in:

* Full-stack web development
* PostgreSQL integration
* Docker containerization
* Docker Hub image management
* Cloud deployment using Render
* CI/CD pipeline implementation
* Infrastructure as Code using `render.yaml`

## Reflection

This assignment provided practical experience in deploying and automating a full-stack application. I learned how Docker, GitHub, and Render work together to support modern DevOps and CI/CD practices.
