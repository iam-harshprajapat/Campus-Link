<br/>
<div align="center">

<h1 align="center" color="blue">Campus Link</h1>
<p align="center">
A University Social Networking Platform

<br/>
<br/>
  
<a href="s.harshprajapat@gmail.com">Report Bug </a>.
<a href="s.harshprajapat@gmail.com">Request Feature</a>
</p>
</div>

## Screenshots of the project

<br/>

**Login page:**
![LoginPage](https://res.cloudinary.com/driqu2cgm/image/upload/v1728927986/login_buh91w.png "Login Page")

**Wizard Registration form:**<br/>
![RegistrationPage](https://res.cloudinary.com/driqu2cgm/image/upload/v1728930652/Untitled_design_uihyih.png "Registration Page")

**Notes Sharing Feature**
![NotesPage](https://res.cloudinary.com/driqu2cgm/image/upload/v1728930954/Notes_ixqeix.png "Notes Sharing page")
![NotesPage](https://res.cloudinary.com/driqu2cgm/image/upload/v1728930954/uploadNotes_l9tkyr.png "Notes Uploading")
The Notes are organised in form of file structure:

```css
    ├── Courses (BCA/BTech)
        ├── Semesters (semester-1/semester-2)
            ├── Subjects (operating system/ Maths)
                ├── Notes files (.pdf/.xls/.png/.jpg/.ppt/.docs)
```

<br/><br/>

### Prerequisites

```bash
- node

- npm

- mongoDatabase
```

### Installation

1. Firstly Install the project at your local machine by cloning Repository

```sh
git clone https://github.com/iam-harshprajapat/Campus-Link.git
```

2. Now Navigate to your project directory from terminal where you have cloned the repository.

```sh
cd Campus-Link
```

#### 3. Setup Frontend:

- Navigate to `frontend` directory

```sh
cd frontend
```

- At root inside `frontend` make a file as `.env` and set up Environment Variables as:

```sh
REACT_APP_BASEURL = http://localhost:5000/api
```

- Install all the dependencies by:

```sh
npm install
```

- Finally run the application in your machine by:

```sh
npm start
```

#### 4. Setup Backend:

- Navigate to `backend` directory

```sh
cd backend
```

- At root inside `backend` make a file named as `.env` and set all your environment variables as:

```sh
PORT = YOUR_LOCALHOST_PORT
MONGO_URI = YOUR_MONGODB_STRING_URI
EMAIL_USER = YOUR_EMAIL_ADDREDD
EMAIL_PASS = YOUR_EMAIL_PASSWORD
DEV_MODE = DEVELOPER_MORE
JWT_SECRET = YOUR_JWT_SECRET
```

- Install all the dependencies by:

```sh
npm install
```

- Finally run the server in your machine by:

```sh
npm start
or
node server
```

## Contact

Author: Harsh Prajapat <br>
Email: s.harshprajapat@gmail.com <br>
Project Link: https://github.com/iam-harshprajapat/Campus-Link.git <br>
Linkedin: https://www.linkedin.com/in/harsh-prajapat-510187241/
