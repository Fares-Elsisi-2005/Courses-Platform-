
/* 
 {
    currentUser: users[1],
    users,
    categories,
    courses,
  }
 */
export default  function appReducer(AppData, action) {
    switch (action.type) {
        case "AddNewCourse": {
            const newCourse = action.payload.course;
            const newCourses = [...AppData.courses, newCourse];
              const newCurrentUser = { ...AppData.currentUser, teacherCourses: [...AppData.currentUser.teacherCourses, action.payload.course.courseId] };
                const newUsersData = AppData.users.map((user) => {
                        if (user.userId == AppData.currentUser.userId) { 
                            return {...user,teacherCourses:[...AppData.currentUser.teacherCourses,action.payload.course.courseId]}
                        } else {
                            return user;
                        }
                })
 
            const newAppData = { ...AppData, courses: newCourses, users: newUsersData, currentUser: newCurrentUser }
            console.log("new app state:",newAppData)
            return newAppData
        }
        
        case "EditCourse": {
            const newCourses = AppData.courses.map((course) => {
                if (course.courseId == action.payload.course.courseId) {
                    return action.payload.course
                } else {
                    return course
                }
            })
            const newAppData = { ...AppData, courses: newCourses }
            return newAppData
        }
        case "DeleteCourses": {
           /*  const newCourses = AppData.courses.filter((course) => course.courseId !== action.payload.courseId)
            const newAppData = { ...AppData, courses: newCourses } */

            console.log("courses to delete: ", action.payload.coursesToDelete)
            const newCurrentUser = { ...AppData.currentUser, teacherCourses: AppData.currentUser.teacherCourses.filter((courseId) => !action.payload.coursesToDelete.some((selectedCourse) => selectedCourse.courseId === courseId)) };
              const newUsersData = AppData.users.map((user) => {
                if (user.userId == AppData.currentUser.userId) {
                    return newCurrentUser
                } else {
                    return user;
                }
            })
            
            const newCourses = AppData.courses.filter((course) => !action.payload.coursesToDelete.some((selectedCourse) => selectedCourse.courseId === course.courseId));
             const newAppData = { ...AppData, courses: newCourses, users: newUsersData, currentUser: newCurrentUser }
            return newAppData
        }
            
            
        case "VideoLiked": {
            const newCurrentUser = {...AppData.currentUser,likedVideos:  [...AppData.currentUser.likedVideos,action.payload.videoId]}
            const newUsersData = AppData.users.map((user) => {
                if (user.userId == AppData.currentUser.userId) { 
                     return {...user, likedVideos:  [...user.likedVideos,action.payload.videoId]}
                } else {
                    return user;
                 }
            })
            const newCoursesData = AppData.courses.map((course) => {
                if (course.courseId == action.payload.course.courseId) {
                    return {
                        ...course, playlist: course.playlist.map((video) => {
                            if (video.videoId == action.payload.videoId) {
                                return {...video,likes: video.likes + 1}
                            } else {
                                return video;
                        }
                    })}
                } else {
                    return course
                }
            })
             
            const newAppData = {...AppData, currentUser:newCurrentUser, users: newUsersData,courses:newCoursesData}
            
            return newAppData;
        }
        case "VideoUnLiked": {
            const newCurrentUser = {...AppData.currentUser,likedVideos: AppData.currentUser.likedVideos.filter((videoid)=> videoid !== action.payload.videoId)}

            const newUsersData = AppData.users.map((user) => {
                if (user.userId == AppData.currentUser.userId) { 
                     return {...user, likedVideos: user.likedVideos.filter((videoid)=> videoid !== action.payload.videoId)}
                } else {
                    return user;
                 }
            })
            
            const newCoursesData = AppData.courses.map((course) => {
                if (course.courseId == action.payload.course.courseId) {
                    return {
                        ...course, playlist: course.playlist.map((video) => {
                            if (video.videoId == action.payload.videoId) {
                                return {...video,likes: video.likes - 1}
                            } else {
                                return video;
                        }
                    })}
                } else {
                    return course
                }
            }) 
            const newAppData = {...AppData,currentUser:newCurrentUser, users: newUsersData,courses:newCoursesData}
            
            return newAppData;
        }
        case "courseSaved": {
            const newCurrentUser = { ...AppData.currentUser, savedPlaylits: [...AppData.currentUser.savedPlaylits, action.payload.course.courseId] };
                const newUsersData = AppData.users.map((user) => {
                        if (user.userId == AppData.currentUser.userId) { 
                            return {...user,savedPlaylits:[...AppData.currentUser.savedPlaylits,action.payload.course.courseId]}
                        } else {
                            return user;
                        }
                }) 
             
            const newAppData = {...AppData,  users: newUsersData,currentUser:newCurrentUser }

            return newAppData;
        }
        case "courseUnSaved": {
             const newCurrentUser = { ...AppData.currentUser, savedPlaylits: AppData.currentUser.savedPlaylits.filter((courseId)=> courseId !== action.payload.course.courseId ) };
                const newUsersData = AppData.users.map((user) => {
                        if (user.userId == AppData.currentUser.userId) { 
                            return {...user,savedPlaylits: AppData.currentUser.savedPlaylits.filter((courseId)=> courseId !== action.payload.course.courseId )}
                        } else {
                            return user;
                        }
                })
            console.log("unsaved from reducer: ", newCurrentUser)
            
             
            const newAppData = {...AppData,  users: newUsersData,currentUser:newCurrentUser }


            return newAppData;
        }
        default: {
            throw Error('Unknown Action ' + action.type);
        }
     }
}