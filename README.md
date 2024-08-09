<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a id="readme-top"></a>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">API Endpoints</a>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
  </ol>
</details>

## About The Project

NerdJudge is an online judge where users can solve and create programming problems.
[LiveProjectLink](https://www.nerdjudge.me/)
<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

The project is based on MERN Stack with help of additional tools such docker and AWS.
* [Node.js](https://nodejs.org/en)
* [React](https://react.dev/)
* [Express](https://expressjs.com/)
* [MongoDB](https://www.mongodb.com/)
* [Docker](https://docs.docker.com/)
* [AWS](https://aws.amazon.com/)
* [Material UI](https://mui.com/material-ui/)


<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Getting Started

Instructions on setting up the project locally.

### Prerequisites

Download Docker Desktop
* [Docker](https://docs.docker.com/)

Download npm
* npm
 ```sh
  npm install npm@latest -g
  ```

### Installation

Steps to run the project on localhost.
1. Clone the repo
    ``` sh
   git clone https://github.com/PrathamBelwal82/PrathamBelwal_OJ.git
   ```
2.Backend
  ``` sh
   cd backend
   npm init -y
   npm install docker
   docker build -t nerdjudge .
   docker run -p 8000:8000 nerdjudge
   ```

3.Frontend
``` sh
    cd frontend
    npm install
    npm run dev
   ```


<p align="right">(<a href="#readme-top">back to top</a>)</p>

## API Endpoints

Backend base URL:backend.nerdjudge.me

### 1. User Registration

*Endpoint:* /register  
*Method:* POST  
*Description:* Registers a new user.

*Request Body:*
json
{
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "password": "string"
  "confirmPassword":"string"
}


### 2. Login

*Endpoint:* /login  
*Method:* POST  
*Description:* Login a exisiting user.

*Request Body:*
json
{
  "email": "string",
  "password": "string"
}


### 3. Problems

*Endpoint:* /problems  
*Method:* GET  
*Description:* Shows a list of all problems.
*Query Parameters:*
- **page** (optional, integer): The page number to retrieve. Default is 1.
- **limit** (optional, integer): The number of problems per page. Default is 10.
- **sortBy** (optional, string): The field to sort by. Can be title, difficulty, etc.
- **sortOrder** (optional, string): The sort order. Can be asc (ascending) or desc (descending). Default is asc.
- **difficulty** (optional, string): Filter problems by difficulty level (e.g., easy, medium, hard).
- **tags** (optional, string): Comma-separated list of tags to filter problems by. Extra spaces are trimmed.

### 4.Submissions
*Endpoint:* /submissions/usersubmissions  
*Method:* GET  
*Description:* Retrieves a list of submissions for the current user. Supports pagination.

*Query Parameters:*
- **page** (optional, integer): The page number to retrieve. Default is 1.
- **limit** (optional, integer): The number of submissions per page. Default is 7.

*Headers:*
- **Authorization** (required): Bearer token for authentication.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Usage

This project can be used by educational institutions as a platform to solve programming problems.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Roadmap

- [x] Frontend 
- [x] Code Upload
- [x] Compiler
- [x] Verdicts 
- [x] Docker
- [x] AWS Deployment
- [ ] Editorial and Discussion Page
- [ ] Live Contests




<p align="right">(<a href="#readme-top">back to top</a>)</p>
