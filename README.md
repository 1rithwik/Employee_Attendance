# Project Details

## Project Overview:
The Visitly Application is a full-stack web project designed to streamline employees presence at work and there other details. It features a Spring Boot backend and an Angular frontend, providing a seamless user experience for both empployees and admin. The application is deployed using modern cloud platforms, ensuring scalability and reliability.

## System Requirements:
### Frontend: Angular 15+, animations, form handling, service integration, and token storage.</br>
### Backend:
Programming Language: Java 17</br>
Framework: Spring Boot (version 3.4.1)</br>
Server: Render cloud platform</br>
Build Tool: Maven (version 3.9.9)</br>
Java Runtime Environment: JRE 17</br>
### Database: MySQL with tables for employee data</br>
### Deployment Environment
Containerization: Docker (version 20.x or above)</br>
Cloud Platform: Render/Netlify for deployment</br>
Browser: Latest version of Chrome, Firefox, or Edge</br>

## System Architecture:
The appliaction can be used by employees. When the employee reaches his workplace he should sign-in into the application, and when leaving the workplace he should sign-out. The application will track the employee's presence and provide the data to the admin. The admin can view the employee's presence data and also can view the employee's details like how many days was the employee late to his work, how many days did he leave early, and other basic information.</br>
### Frontend:
#### Components
app.component.ts:Main container for other components.</br>
register.component.ts: Registration form for new users.</br>
login.component.ts: Login form for existing users.</br>
home.component.ts: Displays the dashboard for logged-in users.</br>
adminDashboard.component.ts: Displays the admin dashboard.
### Backend:
#### Controller Layer
EmployeeController: Handles employee-related operations.</br>
AdminController: Handles admin-related operations.

#### Service Layer
EmployeeService: Provides data access for employee and admin operations.

#### Repository Layer
Uses Spring Data JPA for CRUD operations on MySQL database tables.

## Database Schema:
The database schema consists of one table: `employees`
The table has the following columns:
- `employeeId`: Unique identifier for each employee.
- `empName`: Employee's full name.
- `empEmail`: Employee's email address.
- `empPassword`: Employee's password for login.
- `empPhone`: Employee's phone number.
- `lastLoginTime`: Timestamp of the employee's last login.
- `loginStatus`: Indicates whether the employee is currently logged in or not.
- `lateAttendCount`: Count of days the employee was late to work.
- `earlyLeaveCount`: Count of days the employee left work early.
- `role`: Employee's role within the organization, default is "USER".

## Authentication and Authorization:
### JWT Authentication Flow:
Frontend sends username and password to backend.</br>
Backend verifies credentials and returns a JWT token.</br>
Frontend stores the token, sending it with requests to access protected resources.

## API Endpoints:
### Authentication:
POST api/register: Registers a new user.</br>
POST api/login: Logs in and returns a token.

### SignIn and SignOut from work:
PUT api/LogInToWork: Signs in an employee to work.</br>
PUT api/LogOutFromWork: Signs out an employee from work.

### Edit Employee Details:
PUT api/editDetails: Employee can edit their details.</br>
DELETE api/employees/{id}: Admin can delete an employee.

### Error Handling:
At the backend it is handled using controlleradvice and exceptionhandler. And at the frontend using try catch block.

### Testing:
Unit testing is done using JUnit and Mockito for the backend. Integration testing is done using Spring Boot Test for the backend. For the frontend, Jest is used for unit testing and Cypress for integration testing.

### Deployment:
The application database is deployed on freesqldatabase cloud platform.</br>
The application backend is deployed using Docker on render cloud platform.</br>
The application frontend is deployed on Netlify cloud platform.</br>

###### The first response you are giving to server may take some time, because the server might me be inactive, and it takes some time to get active and give response.
###### Sometimes the database cloud server runs very slow and sometimes it doesnot respond. So you face any errors while running the application , please try to restart the application and database server.
###### If you still face errors try using localhost database.
###### If still problem persists, please contact me. rokkamrithwik@gmail.com