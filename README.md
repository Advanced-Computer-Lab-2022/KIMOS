

# KIMOS

A brief description of what this project does and who it's for

# How to Use?
First, you have to install all of the required packages (libraries) in the frontend folder
and in the backend folder using `npm install`.
Also, you must make sure that the .env file exists in the project folder, so the app can access all of the environmental variables.
then, after installing everything, you have to start the backend server using `npm start server` inside the backend folder, and `npm start` in the frontend folder.
Now, it will starts the website on localhost:3000


# Contribute
You can contribute to this project by securing all of its end points, and by adding more features such as 
- Live Video lectures
- Blog. To share information between the users
- Log system to keep track of the transactions
- Log system to keep track of all of the admins actions as they can do many dangerous actions


# Code Style
We didn't follow a specific convention in the JS files.
However, in naming the classes in the scss files (not normal css) we followed the **BEM** convention, which works as following 
https://www.freecodecamp.org/news/css-naming-conventions-that-will-save-you-hours-of-debugging-35cea737d849/ 


# Motivation
We built this website for **Canadian Chamber Of Commerce**. As we want to be part of their 
educational project because we believe it will be very beneficial for teens all around Egypt. As they got their own trustworthy instructors unlike most of the other educational online systems.
Also, we are competing with more than 40+ team to be the chosen project from the company as the chosen project will be awarded.



# Tech/Framework used

## Backend
- **NodeJS** 6.14.13
    - It is the main building block for our project, was used building the backend and the front end as well as we are using React.
- **MongoDB** 
    - It is a NoSQL database. We used it as we don't have a fixed structure for our models and we wanted the data to be on the cloud.
- **Mongoose** 6.6.5
    - It is a library that is used along with NodeJS to manage the MongoDB and support us with functions to find/update/delete and much more any item in the Database.
- **Express** 4.18.2
    - A libraries to host the backend ( make it a server ) to allow communication with other clients.
- **country-to-currency** 1.0.6
    - A library to get the rate between two countries using their country code.
- **Bcrypt** 5.1.0
    - used to hash our passwords.
- **CORS**  2.8.5
    - used to allow Cross-origin-access between the frontend and the backend
- **cookie-parse** 1.4.6
    - Parse HTTP request cookies

## Frontend


- **ReactJS** 18.2.0
    - Was used for building the frontend.
- **SASS** 1.55.0
    - SASS stands for Syntactically Awesome Stylesheet which is extension to CSS. We used it to organize our styling sheets files as it can get out of hand. And to get use of its awesome functionalities such as **mixins** which can be used to define a set of styling attributes and we can call it inside any selector and the same styling will be applied there.
- **Redux** 4.2.0
    - Redux is a global state management library. We used it as for some variables it will be very complicated to keep sending the data from the parent to its child and so on. We used Redux to store the data that will be accessed from different parts in the project and keep them there so that they can be accessed easily.
- **Material UI (MUI5)** 5.11.2
    - React components library that provide us with many UI components such as buttons, modals and switches. We used only one library to have a consistent UI looking website.
- **Axios** 1.1.3
    - A library to send HTTP requests. We used it to communicate with the backend to send and get data.
- **React-draggable** 4.4.5
    - Used to make the notes draggable across the screen.
- **RechartsJS** 2.1.16
    - library that provide us with many graphs/charts to use.
- **JSpdf** 2.5.1
    - library to create PDF files using HTML content.
    
# Screenshots
### Homeland
![Alt text](/samples/land.png?raw=true "Optional Title")

### Profile Page
#### Dark theme
![Alt text](/samples/profile-dark.png?raw=true "Optional Title")
#### Light theme
![Alt text](/samples/profile-light.png?raw=true "Optional Title")

### Admin Dashboard
#### Dark theme
![Alt text](/samples/dark-db.png?raw=true "Optional Title")
#### Light theme
![Alt text](/samples/light-db.png?raw=true "Optional Title")

### Instructor courses
![Alt text](/samples/instr-courses.png?raw=true "Optional Title")

### Watching a Course and taking notes
![Alt text](/samples/course-notes.png?raw=true "Optional Title")








