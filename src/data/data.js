 
export const users =[
  {
    userId: "u_1001",
    name: "Elzero",
    email: "elzero@gmail.com",
    role: "teacher", 
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    teacherCourses: ["c_2001", "c_2002"],
    createdAt: "2025-08-20T10:00:00Z"
  },
  {
    userId: "u_1002",
    name: "Fares Ahmed",
    email: "fares@gmail.com",
    role: "student",
    image: "https://randomuser.me/api/portraits/men/44.jpg",
    enrolledCourses: ["c_2001", "c_2003"],
    createdAt: "2025-08-21T12:30:00Z"
  },
  {
    userId: "u_1003",
    name: "Mona Ali",
    email: "mona@gmail.com",
    role: "teacher",
    image: "https://randomuser.me/api/portraits/women/26.jpg",
    enrolledCourses: ["c_2002"],
    createdAt: "2025-08-22T15:45:00Z"
  }
]

 
export const categories = [
  {
    categoryId: "cat_1",
    name: "Development",
    subCategories: [
      { id: "sub_1", name: "Web Development" },
      { id: "sub_2", name: "AI & Machine Learning" }
    ]
  },
  {
    categoryId: "cat_2",
    name: "Business",
    subCategories: [
      { id: "sub_3", name: "Sales" },
      { id: "sub_4", name: "Communication" }
    ]
  }
  ,
  {
    categoryId: "cat_3",
    name: "design",
    subCategories: [
      { id: "sub_5", name: "webDesignes" },
      { id: "sub_6", name: "animation" }
    ]
  }
  ,
  {
    categoryId: "cat_4",
    name: "music",
    subCategories: [
      { id: "sub_7", name: "Music Software" },
      { id: "sub_8", name: "animation" }
    ]
  }
  ,
  {
    categoryId: "cat_5",
    name: "Health & Fitness",
    subCategories: [
      { id: "sub_9", name: "Sports" },
      { id: "sub_10", name: "Yoga" }
    ]
  }
];
 
export const courses = [
  
  {
    courseId: "c_2001",
    title: "Learn JavaScript - Full Course for Beginners",
    description: "This complete 134-part JavaScript tutorial for beginners will teach you everything you need to know to get started with the JavaScript programming language.",
    category: "sub_1",  
    teacherId: "u_1001",
    image: "../assets//images/img1.png",
    rating: 4.7,
    studentsCount: 95,
    reviews: [],
    playlist: [
      {
    videoId: "v_3001",
    title: "Introduction to JavaScript",
    url: "https://www.youtube.com/watch?v=PkZNo7MFNFg",
    likes: 210,
    comments: [
      {
        commentId: "cm_1",
        userId: "u_1002",
        userName: "Fares Ahmed",
        text: "Great video!",
        date: "2025-08-26T15:00:00Z",
        replies: [
          {
            replyId: "r_1",
            userId: "u_1003",
            userName: "Mona Ali",
            text: "I agree, very clear.",
            date: "2025-08-27T09:00:00Z"
          }
        ]
      }
    ]
  },
      {
    videoId: "v_3002",
    title: "Introduction to JavaScript",
    url: "https://www.youtube.com/watch?v=PkZNo7MFNFg",
    likes: 210,
    comments: [
      {
        commentId: "cm_1",
        userId: "u_1002",
        userName: "Fares Ahmed",
        text: "Great video!",
        date: "2025-08-26T15:00:00Z",
        replies: [
          {
            replyId: "r_1",
            userId: "u_1003",
            userName: "Mona Ali",
            text: "I agree, very clear.",
            date: "2025-08-27T09:00:00Z"
          }
        ]
      }
    ]
  },
      {
    videoId: "v_3003",
    title: "Introduction to JavaScript",
    url: "https://www.youtube.com/watch?v=PkZNo7MFNFg",
    likes: 210,
    comments: [
      {
        commentId: "cm_1",
        userId: "u_1002",
        userName: "Fares Ahmed",
        text: "Great video!",
        date: "2025-08-26T15:00:00Z",
        replies: [
          {
            replyId: "r_1",
            userId: "u_1003",
            userName: "Mona Ali",
            text: "I agree, very clear.",
            date: "2025-08-27T09:00:00Z"
          }
        ]
      }
    ]
  },
      {
    videoId: "v_3004",
    title: "Introduction to JavaScript",
    url: "https://www.youtube.com/watch?v=PkZNo7MFNFg",
    likes: 210,
    comments: [
      {
        commentId: "cm_1",
        userId: "u_1002",
        userName: "Fares Ahmed",
        text: "Great video!",
        date: "2025-08-26T15:00:00Z",
        replies: [
          {
            replyId: "r_1",
            userId: "u_1003",
            userName: "Mona Ali",
            text: "I agree, very clear.",
            date: "2025-08-27T09:00:00Z"
          }
        ]
      }
    ]
  },
      {
    videoId: "v_3005",
    title: "Introduction to JavaScript",
    url: "https://www.youtube.com/watch?v=PkZNo7MFNFg",
    likes: 210,
    comments: [
      {
        commentId: "cm_1",
        userId: "u_1002",
        userName: "Fares Ahmed",
        text: "Great video!",
        date: "2025-08-26T15:00:00Z",
        replies: [
          {
            replyId: "r_1",
            userId: "u_1003",
            userName: "Mona Ali",
            text: "I agree, very clear.",
            date: "2025-08-27T09:00:00Z"
          }
        ]
      }
    ]
  },
      {
    videoId: "v_3006",
    title: "Introduction to JavaScript",
    url: "https://www.youtube.com/watch?v=PkZNo7MFNFg",
    likes: 210,
    comments: [
      {
        commentId: "cm_1",
        userId: "u_1002",
        userName: "Fares Ahmed",
        text: "Great video!",
        date: "2025-08-26T15:00:00Z",
        replies: [
          {
            replyId: "r_1",
            userId: "u_1003",
            userName: "Mona Ali",
            text: "I agree, very clear.",
            date: "2025-08-27T09:00:00Z"
          }
        ]
      }
    ]
  },
      {
    videoId: "v_3007",
    title: "Introduction to JavaScript",
    url: "https://www.youtube.com/watch?v=PkZNo7MFNFg",
    likes: 210,
    comments: [
      {
        commentId: "cm_1",
        userId: "u_1002",
        userName: "Fares Ahmed",
        text: "Great video!",
        date: "2025-08-26T15:00:00Z",
        replies: [
          {
            replyId: "r_1",
            userId: "u_1003",
            userName: "Mona Ali",
            text: "I agree, very clear.",
            date: "2025-08-27T09:00:00Z"
          }
        ]
      }
    ]
  },
      {
    videoId: "v_3008",
    title: "Introduction to JavaScript",
    url: "https://www.youtube.com/watch?v=PkZNo7MFNFg",
    likes: 210,
    comments: [
      {
        commentId: "cm_1",
        userId: "u_1002",
        userName: "Fares Ahmed",
        text: "Great video!",
        date: "2025-08-26T15:00:00Z",
        replies: [
          {
            replyId: "r_1",
            userId: "u_1003",
            userName: "Mona Ali",
            text: "I agree, very clear.",
            date: "2025-08-27T09:00:00Z"
          }
        ]
      }
    ]
  },
    ],
    createdAt: "2025-08-21T12:00:00Z"
  },
  
  {
    courseId: "c_2002",
    title: "React Full Course for free ⚛️ (2024)",
    description: "his is a beginners React JS course that should be enough to get you started using the React Library. There are still many more hooks and concepts that are beyond the scope of the beginner level. This video should at least give you a solid foundation.",
    category: "sub_1",  
    teacherId: "u_1001",
    image: "../assets/images/img2.png",
    rating: 4.7,
    studentsCount: 95,
    reviews: [],
    playlist: [
      {
    videoId: "v_3009",
    title: "React Full Course for free ⚛️ (2024)",
    url: "https://www.youtube.com/watch?v=CgkZ7MvWUAA",
    likes: 210,
    comments: [
      {
        commentId: "cm_1",
        userId: "u_1002",
        userName: "Fares Ahmed",
        text: "Great video!",
        date: "2025-08-26T15:00:00Z",
        replies: [
          {
            replyId: "r_1",
            userId: "u_1003",
            userName: "Mona Ali",
            text: "I agree, very clear.",
            date: "2025-08-27T09:00:00Z"
          }
        ]
      }
    ]
  },
      {
    videoId: "v_3010",
    title: "React Full Course for free ⚛️ (2024)",
    url: "https://www.youtube.com/watch?v=CgkZ7MvWUAA",
    likes: 210,
    comments: [
      {
        commentId: "cm_1",
        userId: "u_1002",
        userName: "Fares Ahmed",
        text: "Great video!",
        date: "2025-08-26T15:00:00Z",
        replies: [
          {
            replyId: "r_1",
            userId: "u_1003",
            userName: "Mona Ali",
            text: "I agree, very clear.",
            date: "2025-08-27T09:00:00Z"
          }
        ]
      }
    ]
  },
      {
    videoId: "v_30011",
    title: "React Full Course for free ⚛️ (2024)",
    url: "https://www.youtube.com/watch?v=CgkZ7MvWUAA",
    likes: 210,
    comments: [
      {
        commentId: "cm_1",
        userId: "u_1002",
        userName: "Fares Ahmed",
        text: "Great video!",
        date: "2025-08-26T15:00:00Z",
        replies: [
          {
            replyId: "r_1",
            userId: "u_1003",
            userName: "Mona Ali",
            text: "I agree, very clear.",
            date: "2025-08-27T09:00:00Z"
          }
        ]
      }
    ]
  },
      {
    videoId: "v_3012",
    title: "React Full Course for free ⚛️ (2024)",
    url: "https://www.youtube.com/watch?v=CgkZ7MvWUAA",
    likes: 210,
    comments: [
      {
        commentId: "cm_1",
        userId: "u_1002",
        userName: "Fares Ahmed",
        text: "Great video!",
        date: "2025-08-26T15:00:00Z",
        replies: [
          {
            replyId: "r_1",
            userId: "u_1003",
            userName: "Mona Ali",
            text: "I agree, very clear.",
            date: "2025-08-27T09:00:00Z"
          }
        ]
      }
    ]
  },
      {
    videoId: "v_3013",
    title: "React Full Course for free ⚛️ (2024)",
    url: "https://www.youtube.com/watch?v=CgkZ7MvWUAA",
    likes: 210,
    comments: [
      {
        commentId: "cm_1",
        userId: "u_1002",
        userName: "Fares Ahmed",
        text: "Great video!",
        date: "2025-08-26T15:00:00Z",
        replies: [
          {
            replyId: "r_1",
            userId: "u_1003",
            userName: "Mona Ali",
            text: "I agree, very clear.",
            date: "2025-08-27T09:00:00Z"
          }
        ]
      }
    ]
  },
    ],
    createdAt: "2025-08-21T12:00:00Z"
  },
  
  {
    courseId: "c_2003",
    title: "Machine Learning for Everybody  Full Course",
    description: "Learn Machine Learning in a way that is accessible to absolute beginners. You will learn the basics of Machine Learning and how to use TensorFlow to implement many different concepts.",
    category: "sub_2",  
    teacherId: "u_1003",
    image: "../assets/images/img3.png",
    rating: 4.7,
    studentsCount: 95,
    reviews: [],
    playlist: [
      {
    videoId: "v_3014",
    title: "Machine Learning for Everybody  Full Course",
    url: "https://www.youtube.com/watch?v=i_LwzRVP7bg&t=3s",
    likes: 210,
    comments: [
      {
        commentId: "cm_1",
        userId: "u_1002",
        userName: "Fares Ahmed",
        text: "Great video!",
        date: "2025-08-26T15:00:00Z",
        replies: [
          {
            replyId: "r_1",
            userId: "u_1003",
            userName: "Mona Ali",
            text: "I agree, very clear.",
            date: "2025-08-27T09:00:00Z"
          }
        ]
      }
    ]
  }
    ],
    createdAt: "2025-08-21T12:00:00Z"
  },
];
 
 
 
export const messages = [
  {
    messageId: "m_1",
    name: "Omar Ali",
    email: "omar@gmail.com",
    message: "I want to know more about your platform.",
    date: "2025-08-26T14:30:00Z"
  }
];
