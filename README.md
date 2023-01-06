

# Canadian Chamber of Commerce eLearning website 🍁

This is an eLearning website that is developed using 
the MERN stack for the Canadian Chamber of Commerce to 
help students learn at their own pace and place providing them
with up-to-date courses on various subjects from experienced
instructors.





# Motivation 🔥
We built this website for **Canadian Chamber Of Commerce**. As we want to be part of their 
educational project because we believe it will be very beneficial for teens all around Egypt. As they got their own trustworthy instructors unlike most of the other educational online systems.
Also, we are competing with more than 40+ team to be the chosen project from the company as the chosen project will be awarded.



# Build Status 🔨
- The dark mode is not fully functional as in some pages, the text color remained black, so in the dark mode the text didn't appear.

- Course was deleted without any confirmation.

- For a user that is not registered in any course, an empty div was displayed instead of a text indicating there are no courses.
Instructor rating was reflected in the frontend.

- Once you decide to add the video, there is no opton to reverse it.

- Graphs have static data.

- Months are repeated in the instructor wallet.

- We forgot a static login request before requesting a refund which causes an authentication problem.

- An empty container appears when the user doesn't have any course, instead, we should have wrote something like " No courses regusterd yet".

- Guests can't search for courses as we added an extra SIGNED IN verification in the backend function.


# Code Style 🖥️ 
JavaScript Standard Style where no configuration and the code
is formatted autotmatically.
However, in naming the classes in the scss files (not normal css) we followed the **BEM** convention, which works as following 
https://www.freecodecamp.org/news/css-naming-conventions-that-will-save-you-hours-of-debugging-35cea737d849/ 



# Tech/Framework used 👜

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
- **stripe** 
    - To Secure transactions
- **Nodemon**
    - To restart the server by its own on changes instead of re-running it manually.

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
    


# Features ✨ 
1) Individual Trainee/ Corporate Trainee can see all his/her grades for exercises (or exams) he/she did previously.
2) Individual Trainee/ Corporate Trainee can retake an exercise (or exam) if he/she failed it **before** viewing the
    answers to the exam/ exercise.
3) Instructor can see the total number of students enrolled in his/her course.
4) Individual Trainee/ Corporate Trainee can edit or delete his/her review of an instrcutor or a course.
5) Instructor can save his/her progress in creating a course WITHOUT publishing the
    course.
6) Instructor can publish his/her course. A published course CANNOT be edited nor
    deleted.
7) Instructor can edit or delete a non published course.
8) Instructor can close a published course.



# Code Examples
### Make a course public
``` 
const makeCoursePublic = asyncHandler(async (req, res) => {
  const { courseId } = req.query;
  const courseInfo = await Course.findById(courseId);
  if (courseInfo.exams.length > 0) {
    if (courseInfo.preview) {
      if (courseInfo.subtitles.length > 0) {
        if (courseInfo.summary) {
          await Course.findByIdAndUpdate(courseId, { visibility: 'public' });
          res.status(200).json({ message: 'Course is now public', success: true, statusCode: 200 });
        } else {
          res.status(500);
          throw new Error('Course summary must be defined');
        }
      } else {
        res.status(500);
        throw new Error('There must be at least one subtitle');
      }
    } else {
      res.status(500);
      throw new Error('Course preview video must be defined');
    }
  } else {
    res.status(500);
    throw new Error('There must be at least one exam');
  }
});
```

### Create a course
``` 

const createCourse = asyncHandler(async (req, res) => {
  const userId = res.locals.userId;
  const { course } = req.body;
  const subject = await Subject.findOne({ name: course.subject });
  if (subject) {
    var subtitles = [];
    var totalHours = 0;
    if (course.subtitles.length) {
      const promises = course.subtitles.map(async (subtitle, index) => {

        const sub = await createSubtitle(subtitle).catch((err) => {
          throw err;
        });
        return sub;
      });
      subtitles = await Promise.all(promises);
      subtitles.map((subtitle, index) => {
        totalHours += parseFloat(subtitle.hours);
      });
    }
    await Course.create({
      title: course.title,
      subject: subject._id,
      subtitles: subtitles,
      price: course.price,
      totalHours: totalHours,
      summary: course.summary || '',
      exams: [],
      preview: course.preview || '',
      instructor: userId
    });
    res.status(200).json({
      statusCode: 200,
      success: true,
      message: 'Course created successfully'
    });
  } else {
    res.status(500);
    throw new Error('Subject not approved by admin');
  }
});
```



### Request Refund
``` 

const requestRefund = asyncHandler(async (req, res) => {
  const userId = res.locals.userId;
  const { courseId } = req.query;
  const record = await RegisteredCourses.findOne({ userId: userId, courseId: courseId }).populate();
  if (record.progress < 50) {
    await Request.create({ userId: userId, courseId: courseId, requestType: 'refund' });
    res
      .status(200)
      .json({ success: true, statusCode: 200, message: 'Request received Successfully!' });
  } else {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: 'Student Attended More than 50% of Course!'
    });
  }
});
```



### Genrate flip cards in the home land page
``` 
generateFlipCard = (front, back, icon)=>{

    return (
        <div class="flip-card">
            <div class="flip-card-inner">
                <div class="flip-card-front">
                    <div><h1>{front}</h1></div>
                    <div class="flip-card-front__icons">
                        <div class="flip-card-front__icons__icon">{icon}</div>
                    </div>
                </div>
                <div class="flip-card-back" >
                    <p>{back}</p>
                </div>
            </div>
        </div>
    )
}
```
```
<div className='homeland__section section_2'>
    <div className='bg-filter'></div>
    <div className='header'>Explore Our Features</div>
    <div className='cards'>
        <div className='cards__item'>
            {this.generateFlipCard("More Than 1000 Course", "Explore many courses in different fields given by our best instructors", <ImportContactsIcon  style={{fontSize:'150px'}}/>)}
        </div>
        <div className='cards__item'>
            {this.generateFlipCard("More Than 300 Exercise", "Test your knowledge by taking an online assesment and review the solution afterward!", <QuizIcon style={{fontSize:'150px'}}/>)}
        </div>
        <div className='cards__item'>
            {this.generateFlipCard("Get a certified certificate", "Our certificate is certified in many countries and companies!", <CardMembershipIcon style={{fontSize:'150px'}}/>)}
        </div>
        <img src={features1} alt="" className="image-features"/>

    
    </div>
</div>

```
### Styling the front of the flipping cards in the homeland page
```
  .flip-card-front {
    background-color: var(--cool-grey);
    border-radius:0% 100% 0% 100% / 85% 10% 90% 15% ;
    color: white;
    font-weight: lighter !important;
    background: linear-gradient(45deg, $primary-color-linear, $primary-color);
    background-color: var(--cool-grey);
    padding:20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;

    &__icons{
        &__icon{
            color: white !important;
            font-size: 40px !important;
            font-weight: bolder !important;
        }
    }

  }
```
### Mixins Examples
```
@mixin flex-h-center-spaceB {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
```
```
@mixin flex-center-all{
    display: flex;
    align-items: center;
    justify-content: center;
}
```
# Installation
    1) **clone** the repository from github.
    2) Go inside the parent folder using **cd KIMOS**
    3) Go inside the backend folder **cd backend** and install all of the required packages (libraries) using **npm i**
    4) Go inside the frontend/reactproj folder **cd frontend/reactproj** and install all of the required packages (libraries) using **npm i**
    5) Create the .env file in the parent folder and add all of the mentioned env variables below. 



# API Reference 🌐

#### Get all subjects

```http
  GET /courses/subjects
```

#### POST a new subject

```http
  GET /courses/subjects
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`     | `string` | **Required**. subjects|


#### GET all courses

```http
  GET /courses
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `resultsPerPage`     | `string` |the courses to display per page|
| `instructorSearch`     | `string` |the variable to know the type of the user session|
| `page`     | `string` | page|

returns all the courses that satisfies the search parameter



#### POST a new course

```http
  POST /courses
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `course`     | `Object` |**Required**. the details of the course to be added to the database|


#### PUT an existing course

```http
  PUT /courses
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `course`     | `Object` |**Required**. the new course|
| `flagDiscount`     | `bool` |**Required**. Is set to true if the discount was changed|
| `couresId`     | `string` |**Required**. the Id of the course to be updated|

#### Delete an existing course

```http
  Delete /courses
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `couresId`     | `string` |**Required**. the Id of the course to be deleted|



#### PATCH make course public 

```http
  Patch /courses
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `couresId`     | `string` |**Required**. the Id of the course to be amde public|



#### POST close a public course

```http
  POST /courses/close
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `couresId`     | `string` |**Required**. the Id of the course to be closed|


#### GET the reviews of a course

```http
  GET /courses/reviews
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `couresId`     | `string` |**Required**. the Id of the course|

returns all the ratings and reviews for the specified course

#### POST a review of a course

```http
  POST /courses/rate
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `couresId`     | `string` |**Required**. the Id of the course|
| `rating`     | `Number` |**Required**. the rating of the course|
| `review`     | `string` |review of the course|

#### GET details of an exam

```http
  GET /courses/exam
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `couresId`     | `string` |**Required**. the Id of the course|
| `examId`     | `string` |**Required**. the exma id|

returns the details of exam specified

#### POST adds an exam to a course

```http
  POST /courses/exam
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `couresId`     | `string` |**Required**. the Id of the course|
| `exam`     | `Object` |**Required**. the exam to be added to the course|

#### PUT edit an already existing exam

```http
  PUT /courses/exam
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `couresId`     | `string` |**Required**. the Id of the course|
| `examId`     | `string` |**Required**. the id of the exam|
| `exam`     | `Object` |**Required**. the exam object|

#### DELETE remove exam

```http
  DELETE /courses/exam
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `couresId`     | `string` |**Required**. the Id of the course|
| `examId`     | `string` |**Required**. the of the exam to be deleted|


#### POST a new quiz to the subtitle

```http
  POST /courses/subtitle/quiz
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `couresId`     | `string` |**Required**. the Id of the course|
| `subtitleId`     | `string` |**Required**. the rating of the course|



#### PUT update and existing quiz

```http
  PUT /courses/subtitle/quiz
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `couresId`     | `string` |**Required**. the Id of the course|
| `quizId`     | `string` |**Required**. the id of the quiz|
| `quiz`     | `Object` |**Required**. quiz object with new values|


#### POST a solution to a quiz

```http
  POST /courses/exam/solution
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `examId`     | `string` |**Required**. the Id of the exam|
| `solutions`     | `[Object]` |**Required**. array of solutions|


#### GET a solution to a quiz

```http
  GET /courses/exam/solution
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `examId`     | `string` |**Required**. the Id of the exam|

returns the solution of this exam to the user


#### GET course details

```http
  GET /courses/getMyCourse
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `courseId`     | `string` |**Required**. the Id of the course|

returns the information of this course


#### GET all the registered courses of an user

```http
  GET /register
```
returns all the registered courses of a user


#### GET notes of an user

```http
  GET /courses/notes
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `courseId`     | `string` |**Required**. the Id of the course|
| `videoId`     | `string` |**Required**. the Id of the video|

returns all the notes for this specific video of this course

#### POST notes of an user

```http
  POST /courses/notes
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `courseId`     | `string` |**Required**. the Id of the course|
| `videoId`     | `string` |**Required**. the Id of the video|
| `notes`     | `[Objects]` |**Required**. array of notes to be added/updated|


#### POST update a progress

```http
  POST /courses/progress
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `courseId`     | `string` |**Required**. the Id of the course|
| `videoId`     | `string` |**Required**. the Id of the video|

returns the updated progress for this user

#### GET most popular courses

```http
  GET /courses/popular
```

returns the most popular courses

#### POST the request of the refund is processed by the system

```http
  POST /courses/refund
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `courseId`     | `string` |**Required**. the Id of the course|

#### POST the request of the access is processed by the system

```http
  POST /courses/access
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `courseId`     | `string` |**Required**. the Id of the course|


#### POST a discount for a specific course

```http
  POST /courses/promotion
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `courseIds`     | `[string]` |**Required**. array of the Ids of the courses|
| `discount`     | `Object` |**Required**. discount to be added|

### GET all reviews of this instructor

```http
  GET /users/reviews
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `instrcutorId`     | `string` |**Required**. the id of the instructor|

returns all the reviews of this instructor

### POST create a user

```http
  POST /users
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `userDetails`     | `Object` |**Required**. the details of the user to be added to the system|


### PUT an existing user

```http
  PUT /users
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `user`     | `Object` |**Required**. the new details of the user|


### GET all the detials of an user

```http
  GET /users
```

returns all the details of an user

### GET the details of a specific instructor

```http
  GET /users/viewInstructorDetails
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `instructorId`     | `string` |**Required**. the id of the instructor|

returns the details of a specific instructor

### POST a review on a specific instrcutor

```http
  POST /users/rateInstructor
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `instrcutorId`     | `string` |**Required**. the id of the instructor|
| `rating`     | `Number` |**Required**. the rating that will be given to this instructor|
| `review`     | `string` |**Required**. the review that will be given to this instructor|

### GET country of the user

```http
  GET /users/country
```
returns the country of the user


### PUT a country of this user

```http
  PUT /users/country
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `country`     | `string` |**Required**. the new country of the userr|

### GET the exchange rate of the currency

```http
  GET /users/rate
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `countryCode`      | `string` | **Required**. the country code to get the exchange rate of its currency |
returns the exchange rate of the currency

### PUT changes the password of the user

```http
  PUT /users/changePassword
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `password`      | `string` | **Required**. the new password |


### POST sends a passwrod reset link to the user's email
```http
  POST /users/passwordResetEmail
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email`      | `string` | **Required**. the user's email |


### POST reset a password to the given password
```http
  POST /users/passwordReset
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `token`      | `string` | **Required**. the access token sent to the user email |
| `password`      | `string` | **Required**. the new password  |


### GET a certificate
```http
  GET /users/certificate
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `cousreId`      | `string` | **Required**. the id of the course |


returns the certificate of the given courseId

### POST a report for the given course id
```http
  POST /users/report
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `cousreId`      | `string` | **Required**. the id of the course |
| `report`      | `Object` | **Required**. the report to be added to this course  |


### GET all the reports by this user
```http
  GET /users/report
```
returns all the reports by this user

### PUT changes the status of a given report
```http
  PUT /users/report
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `newStatus`      | `string` | **Required**. the new Status of the report |
| `reportId`      | `string` | **Required**. Id of the report |



### PATCH adds the followup conversation to the system
```http
  PATCH /users/report
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `messages`      | `[Objects]` | **Required**. array of messages |
| `reportId`      | `string` | **Required**. Id of the report |



### POST
```http
  POST /users/createCheckoutSession
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `courseId`      | `string` | **Required**. the course id |

returns a payment link

### POST the registeration of the user to the course
```http
  POST /users/register
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `cousreId`      | `string` | **Required**. the course id |
| `token`      | `string` | **Required**. authentication token to ensure successful payment|


### GET all the old invoices
```http
  GET /users/invoices/instructor
```

returns all the owed invoices


### GET all unseed notifications
```http
  GET /users/notifications
```

returns all the unseen notifications


### POST the systems processes the new status of the refund
```http
  POST /users/refundStatus
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `newStatus`      | `string` | **Required**. the new Status of the refund |
| `requestId`      | `string` | **Required**. Id of the report |

### POST the systems processes the new status of the access request
```http
  POST /users/accessStatus
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `newStatus`      | `string` | **Required**. the new Status of the access request |
| `requestId`      | `string` | **Required**. Id of the request |


### GET all the requests of the given type
```http
  GET /users/requests
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `requestType`      | `string` | **Required**. the type of the request |

returns all the requests of the given type


### GET all the invoices for the user registered
```http
  GET /users/registeredInvoices
```
returns all the invoices for the user registered


### POST logs the user in
```http
  POST /login
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `username`**OR**`email`      | `string` | **Required**. username or the email |
| `password`      | `string` | **Required**. password of the user |


### POST the user details to the system
```http
  POST /signup
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `userInfo`      | `Object` | **Required**. the info of the user to be registered |


### POST logs the user out
```http
  POST /logout
```

# Environment Variables

| Variable Name | Description |
| :-------- | :------- |
| `PORT`     | `Used to speify the port the backend runs on` |
| `NODE_ENV`     | `Used to specify if the project is in devoplment mode or deployment mode` |
| `MONGO_URI`     | `MongoDB URL` |
| `EMAIL_USER`     | ` Email address used for sending emails` |
| `EMAIL_PASSWORD`     | `API Key password used for sending emails` |
| `EMAIL_SERVICE`     | `service used for sending emails` |
| `EMAIL_SUBJECT`     | `Email Subject` |
| `PASSWORD_SECRET`     | `Secret used for encrypting passwords` |
| `JWT_SECRET`     | `Secret used for generating jwt tokens` |
| `RESET_SECRET`     | `Secret used for resetting password` |
| `VERIFICATION_SECRET`     | `Secret used for verifying emails` |
| `STRIPE_PRIVATE_KEY`     | `STRIPE API private key` |
| `PAYMENT_SECRET`     | `key used to verify payments ` |
| `YOUTUBE_API_KEY`     | `Youtube api key used to auto calculate video duration` |


# Tests 👀
We tested all of our APIs using POSTMAN, we wrote the URL we wanted to test and provided the required data ( in the body of the request or in the query). And then, we check the response status and the data in the response and compared it with the data we expected getting from the database.



# How to Use? 🧑🏻‍💻
 While you are at the parent folder
1- Run the backend using `cd backend && nodemon server.js` or `cd backend && npm start server`
2- Run the frontend using `cd frontend && npm start` 




# Contribute 💡
You can contribute to this project by securing all of its end points, and by adding more features such as 
- Live Video lectures
- Blog. To share information between the users
- Log system to keep track of the transactions
- Log system to keep track of all of the admins actions as they can do many dangerous actions

# Credits
- We got all of the pictures from https://www.pinterest.com/20randallcs/cool-anime-pictures/
- The channels of the courses' videos 
    - https://www.youtube.com/@ImanGadzhi
    - https://www.youtube.com/@GeeksforGeeksVideos
    - https://www.youtube.com/@crashcourse

# Authors 
- [@Ace1221](https://github.com/Ace1221)
- [@shahd-elawad](https://github.com/shahd-elawad)
- [@I-Diab](https://github.com/I-Diab)
- [@youssefkhadragy](https://github.com/youssefkhadragy)
- [@mokhallid80](https://github.com/mokhallid80)

## License
- Stripe's license https://www.apache.org/licenses/LICENSE-2.0

# Colors

- ![#D80621](https://placehold.co/60x60/D80621/D80621.png) `#D80621`
- ![#46000a](https://placehold.co/60x60/46000a/46000a.png) `#46000a`
- ![#000066](https://placehold.co/60x60/000066/000066.png) `#000066`
- ![#FFFFFF](https://placehold.co/60x60/FFFFFF/FFFFFF.png) `#FFFFFF`

### Used in dark theme
- ![#000000](https://placehold.co/60x60/000000/000000.png) `#000000`
- ![#0f0f0f](https://placehold.co/60x60/0f0f0f/0f0f0f.png) `#0f0f0f`
- ![#990000](https://placehold.co/60x60/990000/990000.png) `#990000`



# Screenshots 📷
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

### Admin Reports Page
![Alt text](/samples/admin-reported-problems.png?raw=true "Optional Title")

### Course Preview
![Alt text](/samples/course-preview.png?raw=true "Optional Title")

### Chatting about a problem 
![Alt text](/samples/chat.png?raw=true "Optional Title")

### Course details page for instruction
![Alt text](/samples/course-details.png?raw=true "Optional Title")


### Instructor Courses
![Alt text](/samples/instr-courses.png?raw=true "Optional Title")


### Instructor Money
![Alt text](/samples/inst-money.png?raw=true "Optional Title")






