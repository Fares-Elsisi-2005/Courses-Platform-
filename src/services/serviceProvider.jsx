 

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
export function getTotalPlaylists(user) {
  return user.teacherCourses.length;
}
  
// get teacher total videos number by id
export function getTotalVideos(courses ) {
  let videosCount = 0
 courses.forEach((course ) => {
    videosCount += course.playlist.length
  });
  return videosCount;
}

  
// get teacher total enrolled student  number by id
export function getTotalEnrolledStudent(courses) {
  let enrolledStudentCount = 0
  courses.forEach((course ) => {
    enrolledStudentCount += course.studentsCount;
  });
  return enrolledStudentCount;
}
  
// get teacher total videos likes   number by id
export function getTotalPlaylitslikes(courses ) {
  let likesCount = 0
  courses.forEach((course ) => {
    course.playlist.forEach((video) => {
      likesCount += video.likes
    });
  });
  return likesCount;
}


  
// get teacher total Comments  number by id
export function getTotalComments(courses) {
  
  
  let commentsCount = 0
  courses.forEach((course ) => {
    course.playlist.forEach((video) => {
      commentsCount += /* video.comments.length */ 0
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
  


// convert image file to URL safely
export function getimageUrl(image) {
  if (!image) return null; // ✅ Return null instead of ""

  // If it's a File object → create a blob URL
  if (image instanceof File) {
    return URL.createObjectURL(image);
  }

  // Otherwise it's already a string URL
  return image.trim() !== "" ? image : null; // ✅ Guard against empty strings
}

// temporyFunction to crate id 
  export function  createNewid  (prefix) {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`;
};
  

// formate time
 export function formatTimestamp(timestamp) {
  if (!timestamp) return "";

  let date;

  // Firestore Timestamp
  if (typeof timestamp.toDate === "function") {
    date = timestamp.toDate();
  }
  // ISO string or normal date string
  else if (typeof timestamp === "string") {
    date = new Date(timestamp);
  }
  // Already a Date object
  else if (timestamp instanceof Date) {
    date = timestamp;
  } else {
    return "";
  }

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/* ============================(switching to fire base)=================================new to */
  
/* 
getuserByid (done)
getCourse
getVideo
getCoursesBySubCategory
getsubCategoryName
getCategoryName
getCoursesByMainCategory
getTotalPlaylists
getTotalVideos
getTotalEnrolledStudent
getTotalPlaylitslikes
getTotalComments
getCoursesById
getimageUrl
createNewid
 */