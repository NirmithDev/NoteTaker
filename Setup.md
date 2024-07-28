# Project Setup and Workflow

## Prerequisites
- Ensure you have [Git](https://git-scm.com/) installed on your machine.
- Install [Python](https://www.python.org/) (version 3.6 or later).
- Install [Node.js](https://nodejs.org/) (version 12 or later).

## Step-by-Step Guide

### 1. Clone the Project Repository
Clone the repository to your local machine using Git:
```bash
git clone <repository-url>
Or use GitHub Desktop to clone the project.
```
### 2. Set Up the Virtual Environment
Navigate to the project root directory, which contains the frontend and backend folders. Then, create a virtual environment:

```
python -m venv env
```
3. Activate the Virtual Environment
Activate the virtual environment. For Windows bash terminal:

```
source env/Scripts/activate
```
4. Install Backend Dependencies
Ensure you have a requirements.txt file in the root directory containing the following dependencies:

txt
```
asgiref
Django
django-cors-headers
djangorestframework
djangorestframework-simplejwt
PyJWT
pytz
sqlparse
psycopg2-binary
python-dotenv
```
Install the dependencies:

```
pip install -r requirements.txt
```
5. Set Up the Frontend
Navigate to the frontend folder:

```
cd frontend
```
Install the necessary packages:

```
npm install
```
6. Configure Environment Variables
In the root directory, create a .env file and add the backend server connection URL:

```
VITE_APP_URL=<your-backend-server-url>
```
7. Run the Backend Server
Navigate to the backend folder. You can either use your own configuration files or take the provided ones. To run the server:

```
python manage.py runserver
```
8. Run the Frontend Server
Ensure you are in the virtual environment. Navigate back to the frontend folder if not already there, and start the development server:

```
npm run dev
```
