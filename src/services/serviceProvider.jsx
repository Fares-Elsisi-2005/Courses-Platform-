// services/userService.js
import { users, courses,categories } from "./../data/data";
 

// get one teacher by id
export function getuserByid(id) {
    return users.filter((user) => user.userId === id)[0]
}
 

// get one course by id
export function getCourse(id) {
  return courses.filter((Course) => Course.courseId == id)[0];
}


//todo: =======================================================================you can do one function to get all coures,coures by main or sub category
// get  courses by url barams (sub category)
export function getCoursesBySubCategory(categoryId, subCategoryId) {
  return courses.filter((course)=>course.mainCategoryId === categoryId).filter((course)=> course.subCategoryId === subCategoryId)
}

// get subcategory name by id
export function getsubCategoryName(categoryId, subCategoryId) {
  return categories.filter((cat) => cat.categoryId === categoryId)[0].subCategories.filter((sub) => sub.id === subCategoryId)[0].name;
}

// get category name by id
export function getCategoryName(categoryId) {
  return categories.filter((cat) => cat.categoryId === categoryId)[0].name;
}

// get courses by url barams (main category)
export function getCoursesByMainCategory(categoryId ) {
  return courses.filter((course)=>course.mainCategoryId === categoryId) 
}
  

// get teacher total playlists number by id
export function getTotalPlaylists(id) {
  return getuserByid(id).teacherCourses.length;
}
  
// get teacher total videos number by id
export function getTotalVideos(id) {
  let videosCount = 0
  getuserByid(id).teacherCourses.forEach((courseId) => {
    videosCount += getCourse(courseId).playlist.length
  });
  return videosCount;
}

  
// get teacher total enrolled student  number by id
export function getTotalEnrolledStudent(id) {
  let enrolledStudentCount = 0
  getuserByid(id).teacherCourses.forEach((courseId) => {
    enrolledStudentCount += getCourse(courseId).studentsCount;
  });
  return enrolledStudentCount;
}
  
// get teacher total videos likes   number by id
export function getTotalPlaylitslikes(id) {
  let likesCount = 0
  getuserByid(id).teacherCourses.forEach((courseId) => {
    getCourse(courseId).playlist.forEach((video) => {
      likesCount += video.likes
    });
  });
  return likesCount;
}


  
// get teacher total Comments  number by id
export function getTotalComments(id) {
  let commentsCount = 0
  getuserByid(id).teacherCourses.forEach((courseId) => {
    getCourse(courseId).playlist.forEach((video) => {
      commentsCount += video.comments.length
    });
  });
  return commentsCount;
}



// get teacher courses by id
export function getCoursesById(id) {
  let courses = [];
  getuserByid(id).teacherCourses.forEach((courseId) => {
    courses.push(getCourse(courseId));
   })
  return  courses;
}
  