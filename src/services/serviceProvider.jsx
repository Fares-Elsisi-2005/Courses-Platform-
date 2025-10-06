 

// get one teacher by id
export function getuserByid(users,id) {
    return users.filter((user) => user.userId === id)[0]
}
 

// get one course by id
export function getCourse(courses,id) {
  return courses.filter((Course) => Course.courseId == id)[0];
}

// get one video by id
export function getVideo(courses, id) {
  for (const course of courses) {
    const video = course?.playlist?.find(v => v.videoId === id);
    if (video) return {   video, courseID:course.courseId };
  }
  return null;
}

//todo: =======================================================================you can do one function to get all coures,coures by main or sub category
// get  courses by url barams (sub category)
export function getCoursesBySubCategory(courses,categoryId, subCategoryId) {
  return courses.filter((course)=>course.mainCategoryId === categoryId).filter((course)=> course.subCategoryId === subCategoryId)
}

// get subcategory name by id
export function getsubCategoryName(categories,categoryId, subCategoryId) {
  return categories.filter((cat) => cat.categoryId === categoryId)[0].subCategories.filter((sub) => sub.id === subCategoryId)[0].name;
}

// get category name by id
export function getCategoryName(categories,categoryId) {
  return categories.filter((cat) => cat.categoryId === categoryId)[0].name;
}

// get courses by url barams (main category)
export function getCoursesByMainCategory(courses,categoryId ) {
  return courses.filter((course)=>course.mainCategoryId === categoryId) 
}
  

// get teacher total playlists number by id
export function getTotalPlaylists(users,id) {
  return getuserByid(users,id).teacherCourses.length;
}
  
// get teacher total videos number by id
export function getTotalVideos(courses,users,id) {
  let videosCount = 0
  getuserByid(users,id).teacherCourses.forEach((courseId) => {
    videosCount += getCourse(courses,courseId).playlist.length
  });
  return videosCount;
}

  
// get teacher total enrolled student  number by id
export function getTotalEnrolledStudent(courses,users,id) {
  let enrolledStudentCount = 0
  getuserByid(users,id).teacherCourses.forEach((courseId) => {
    enrolledStudentCount += getCourse(courses,courseId).studentsCount;
  });
  return enrolledStudentCount;
}
  
// get teacher total videos likes   number by id
export function getTotalPlaylitslikes(courses,users,id) {
  let likesCount = 0
  getuserByid(users,id).teacherCourses.forEach((courseId) => {
    getCourse(courses,courseId).playlist.forEach((video) => {
      likesCount += video.likes
    });
  });
  return likesCount;
}


  
// get teacher total Comments  number by id
export function getTotalComments(courses,users,id) {
  let commentsCount = 0
  getuserByid(users,id).teacherCourses.forEach((courseId) => {
    getCourse(courses,courseId).playlist.forEach((video) => {
      commentsCount += video.comments.length
    });
  });
  return commentsCount;
}



// get teacher courses by id
export function getCoursesById(courses,users,id) {
  let teachercourses = [];
  getuserByid(users,id).teacherCourses.forEach((courseId) => {
    teachercourses.push(getCourse(courses,courseId));
   })
  return  teachercourses;
}
  