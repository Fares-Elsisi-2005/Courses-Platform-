# todos

-the utility functions in (serviceProvider) should be optimize it process the data each time the function will be called you should think for solution to optimize the prefomance mabe using useMemo or elso

- in (courseCurriculumForm) :
  style the outer container and the card
  add the AddForm for the video

# plan

React App (Frontend)
┣ Contexts/
┃ ┣ AppContext.jsx ← holds user + role
┣ components/
┃ ┣ ProtectedRoute.jsx
┣ pages/
┃ ┣ Home, Profile, AddCourse, CourseDetails
┣ services/
┃ ┣ firebaseConfig.js
┃ ┣ userService.js ← login, signUp, becomeTeacher, etc.
┃ ┣ courseService.js ← addCourse, fetchCourses, etc.

Firebase (Backend)
┣ Authentication
┣ Firestore Database
┣ Storage
┣ Cloud Functions (for Stripe payments)
┣ Security Rules (RBAC enforcement)

# notes

i will difine whats my mvp should look like

i will look for each file and i will type notes

i will determined what feauter is done and what feauter is in progress and feauter is not done yet

teacher and student can sign in or sign up and log out

teacher can crud courses

student read courses and crud comments

Here's a structured plan for your React app with Firebase integration, including notes on progress and next steps:

### Current MVP Scope

1. **Authentication Flow**

   - [✅] User sign-in/sign-up
   - [✅] Role-based access (teacher/student)
   - [✅] Protected routes

2. **Core Features**

   - [✅] Course CRUD for teachers
   - [✅] Course viewing for students
   - [✅] Comment system (CRUD)
   - [✅] Basic UI components

3. **Pending Features**
   - [ ] Payment integration (Stripe)
   - [ ] Advanced course search/filtering
   - [ ] User profile management
   - [ ] Video upload functionality

### File-Specific Notes

**AppContext.jsx**

- Currently holds user and role state
- Needs optimization for performance (consider useMemo)
- Should include loading state for auth checks

**ProtectedRoute.jsx**

- Basic implementation exists
- Needs to handle role-specific redirects
- Should include loading state during auth checks

**CourseDetails Page**

- Basic structure exists
- Needs styling for video player and curriculum

## =======================(todo list)

add a new function to the serviceprovider that check if the image is object or url
add new part in the appReducer to handle adding new course
add a function to the serviceprovider that create new id for each course and video
save the the curent theme state in the localstorage
