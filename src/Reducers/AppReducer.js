
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
        case "unVideoLiked": {
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
        default: {
            throw Error('Unknown Action ' + action.type);
        }
     }
}