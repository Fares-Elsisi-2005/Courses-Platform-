 
export const users =[
  {
    userId: "u_1001",
    name: "Elzero",
    email: "elzero@gmail.com",
    role: "teacher", 
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    teacherCourses: ["c_2001","c_2002"],
    createdAt: "2025-08-20T10:00:00Z",
    savedPlaylits: ["c_2001"],
    enrolledCourses: ["c_2001"], 
    likedVideos: ["v_3001", "v_3002"],
    userCommentsId:[ ]
    
  },
  {
    userId: "u_1002",
    name: "Fares Ahmed",
    email: "fares@gmail.com",
    role: "student",
    image: "https://randomuser.me/api/portraits/men/44.jpg",
    enrolledCourses: ["c_2001" ],
    createdAt: "2025-08-21T12:30:00Z",
    savedPlaylits: [],
    likedVideos: [ ],
    userCommentsId:["c_2001_cm1","c_2001_cm2","c_2002_cm1","c_2002_cm2","c_2003_cm1","c_2003_cm2","c_2004_cm1","c_2004_cm2","c_2005_cm1","c_2005_cm2","c_2006_cm1","c_2006_cm2","c_2007_cm1","c_2007_cm2","c_2008_cm1","c_2008_cm2"]
    
  },
  
  {
    userId: "u_1003",
    name: "Mona Ali",
    email: "mona@gmail.com",
    role: "teacher",
    image: "https://randomuser.me/api/portraits/women/26.jpg",
    teacherCourses: ["c_2003","c_2004"],
    enrolledCourses: ["c_2001"],
    createdAt: "2025-08-22T15:45:00Z",
    savedPlaylits: ["c_2001"],
    likedVideos: ["v_3003", "v_3004"],
    userCommentsId:[ ]
    

  },
  {
    userId: "u_1004",
    name: "Matt Abrahms",
    email: "Matt@gmail.com",
    role: "teacher",
    image: "https://randomuser.me/api/portraits/men/34.jpg",
    teacherCourses: ["c_2005","c_2006"],
    enrolledCourses: ["c_2001"],
    createdAt: "2025-08-22T15:45:00Z",
    savedPlaylits: ["c_2001"],
    likedVideos: ["v_3003", "v_3004"],
    userCommentsId:[ ]
    

  },

  {
    userId: "u_1005",
    name: "Alex Grigg",
    email: "Alex@gmail.com",
    role: "teacher",
    image: "https://randomuser.me/api/portraits/women/27.jpg",
    teacherCourses: ["c_2007"],
    enrolledCourses: ["c_2001"],
    createdAt: "2025-08-22T15:45:00Z",
    savedPlaylits: ["c_2001"],
    likedVideos: ["v_3003", "v_3004"],
    userCommentsId:[ ]
    

  },

  {
    userId: "u_1006",
    name: "Marysol",
    email: "Marysol@gmail.com",
    role: "teacher",
    image: "https://randomuser.me/api/portraits/men/36.jpg",
    teacherCourses: ["c_2008" ],
    enrolledCourses: ["c_2001"],
    createdAt: "2025-08-22T15:45:00Z",
    savedPlaylits: ["c_2001"],
    likedVideos: ["v_3003", "v_3004"],
    userCommentsId:[ ]
    

  },

  
]

 export const categories = [
  {
    categoryId: "cat_1",
    name: "Development",
    icon: "FaCode",
    subCategories: [
      { id: "sub_1", icon:"MdWebAsset",name: "Web Development" },
      { id: "sub_2", icon:"FaRobot",name: "AI & Machine Learning" }
    ]
  },
  {
    categoryId: "cat_2",
    name: "Business",
    icon: "IoStatsChart",
    subCategories: [
      { id: "sub_3", icon:"HiPresentationChartLine",name: "Sales" },
      { id: "sub_4", icon:"FaComments",name: "Communication" }
    ]
  },
  {
    categoryId: "cat_3",
    name: "Design",
    icon: "FaPaintBrush",
    subCategories: [
      { id: "sub_5", icon:"MdOutlineWeb",name: "Web Design" },
      { id: "sub_6", icon:"SiRepublicofgamers",name: "Animation" }
    ]
  },
  {
    categoryId: "cat_4",
    name: "Music",
    icon: "FaMusic",
    subCategories: [
      { id: "sub_7", icon:"IoMusicalNotesSharp",name: "Music Software" },
      
    ]
  },
  {
    categoryId: "cat_5",
    name: "Health & Fitness",
    icon: "FaHeartbeat",
    subCategories: [
      { id: "sub_8", icon:"MdSportsTennis",name: "Sports" }, 
    ]
  }
];


export const courses = [
  
  {
    courseId: "c_2001",
    title: "Learn JavaScript - Full Course for Beginners",
    description: "This complete 134-part JavaScript tutorial for beginners will teach you everything you need to know to get started with the JavaScript programming language.",
    mainCategoryId:"cat_1",
    subCategoryId: "sub_1",  
    teacherId: "u_1001",
    image: "/assets/Playlistsimages/playlist1.avif",
    rating: 4.7,
    studentsCount: 95,
    reviews: [],
    playlist: [
      {
    videoId: "v_3001",
    title: "Introduction to JavaScript",
    url: "https://www.youtube.com/watch?v=PkZNo7MFNFg",
    likes: 210,
    thumbImage:"/assets/Playlistsimages/playlist1.avif",
    createdAt: "2025-08-20T10:00:00Z",

    comments: [
      {
        commentId: "c_2001_cm1",
        userId: "u_1002",
        userName: "Fares Ahmed",
        text: "Great video!",
        date: "2025-08-26T15:00:00Z",
        replies: [
          {
            replyId: "c_2001_cm1_r1",
            userId: "u_1003",
            userName: "Mona Ali",
            text: "I agree, very clear.",
            date: "2025-08-27T09:00:00Z"
          }
        ]
      },
      {
        commentId: "c_2001_cm2",
        userId: "u_1002",
        userName: "Fares Ahmed",
        text: "Great video!",
        date: "2025-08-26T15:00:00Z",
        replies: [
          {
            replyId: "c_2001_cm2_r1",
            userId: "u_1003",
            userName: "Mona Ali",
            text: "I agree, very clear.",
            date: "2025-08-27T09:00:00Z"
          }
        ]
      },
       

    ]
  },
      
    ],
    createdAt: "2025-08-21T12:00:00Z"
  },
  
  {
    courseId: "c_2002",
    title: "AI Foundations Course – Python, Machine Learning, Deep Learning, Data Science",
    description: "Learn about machine learning and AI with this comprehensive 11-hour course . This is not just a crash course. This course covers everything from fundamental concepts to advanced algorithms, complete with real-world case studies in recommender systems and predictive analytics. This course goes beyond theory to provide hands-on implementation experience, career guidance, and great insights from industry professionals. It also includes a career guide on how to build a data science career, launch a startup, and prepare for interviews.",
    mainCategoryId:"cat_1",
    subCategoryId: "sub_2",  
    teacherId: "u_1001",
    image: "/assets/Playlistsimages/playlist2.avif",
    rating: 4.7,
    studentsCount: 95,
    reviews: [],
    playlist: [
      {
    videoId: "v_3002",
    title: "Introduction",
    url: "https://www.youtube.com/watch?v=0oyDqO8PjIg",
    likes: 210,
    thumbImage:"/assets/Playlistsimages/playlist2.avif",
    createdAt: "2025-08-20T10:00:00Z",

    comments: [
      {
        commentId: "c_2002_cm1",
        userId: "u_1002",
        userName: "Fares Ahmed",
        text: "Great video!",
        date: "2025-08-26T15:00:00Z",
        replies: [
          {
            replyId: "c_2002_cm1_r1",
            userId: "u_1003",
            userName: "Mona Ali",
            text: "I agree, very clear.",
            date: "2025-08-27T09:00:00Z"
          }
        ]
      },
      {
        commentId: "c_2002_cm2",
        userId: "u_1002",
        userName: "Fares Ahmed",
        text: "Great video!",
        date: "2025-08-26T15:00:00Z",
        replies: [
          {
            replyId: "c_2002_cm2_r1",
            userId: "u_1003",
            userName: "Mona Ali",
            text: "I agree, very clear.",
            date: "2025-08-27T09:00:00Z"
          }
        ]
      },
       

    ]
  },
      
    ],
    createdAt: "2025-08-21T12:00:00Z"
  },
  
  {
    courseId: "c_2003",
    title: "The Ultimate Sales Training for 2025 [Full Course]",
    description: "The process and activities involved in selling products or services to meet customer needs and achieve business goals, including prospecting, qualifying leads, presenting solutions, negotiating, and closing deals",
    mainCategoryId:"cat_2",
    subCategoryId: "sub_3",  
    teacherId: "u_1003",
    image: "/assets/Playlistsimages/playlist3.avif",
    rating: 4.7,
    studentsCount: 95,
    reviews: [],
    playlist: [
      {
    videoId: "v_3003",
    title: "Introduction",
    url: "https://www.youtube.com/watch?v=StVqS0jD7Ls",
    likes: 210,
    thumbImage:"/assets/Playlistsimages/playlist3.avif",
    createdAt: "2025-08-20T10:00:00Z",

    comments: [
      {
        commentId: "c_2003_cm1",
        userId: "u_1002",
        userName: "Fares Ahmed",
        text: "Great video!",
        date: "2025-08-26T15:00:00Z",
        replies: [
          {
            replyId: "c_2003_cm1_r1",
            userId: "u_1003",
            userName: "Mona Ali",
            text: "I agree, very clear.",
            date: "2025-08-27T09:00:00Z"
          }
        ]
      },
      {
        commentId: "c_2003_cm2",
        userId: "u_1002",
        userName: "Fares Ahmed",
        text: "Great video!",
        date: "2025-08-26T15:00:00Z",
        replies: [
          {
            replyId: "c_2003_cm2_r1",
            userId: "u_1003",
            userName: "Mona Ali",
            text: "I agree, very clear.",
            date: "2025-08-27T09:00:00Z"
          }
        ]
      },
       

    ]
  },
      
    ],
    createdAt: "2025-08-21T12:00:00Z"
  },
  
  {
    courseId: "c_2004",
    title: "Think Fast, Talk Smart: Communication Techniques",
    description: "Communication is critical to success in business and in life. In this talk, and through the podcast, you will learn techniques that will help you speak with greater confidence and clarity. ",
    mainCategoryId:"cat_2",
    subCategoryId: "sub_4",  
    teacherId: "u_1003",
    image: "/assets/Playlistsimages/playlist4.avif",
    rating: 4.7,
    studentsCount: 95,
    reviews: [],
    playlist: [
      {
    videoId: "v_3004",
    title: "Introduction",
    url: "https://www.youtube.com/watch?v=HAnw168huqA",
    likes: 210,
    thumbImage:"/assets/Playlistsimages/playlist4.avif",
    createdAt: "2025-08-20T10:00:00Z",

    comments: [
      {
        commentId: "c_2004_cm1",
        userId: "u_1002",
        userName: "Fares Ahmed",
        text: "Great video!",
        date: "2025-08-26T15:00:00Z",
        replies: [
          {
            replyId: "c_2004_cm1_r1",
            userId: "u_1003",
            userName: "Mona Ali",
            text: "I agree, very clear.",
            date: "2025-08-27T09:00:00Z"
          }
        ]
      },
      {
        commentId: "c_2004_cm2",
        userId: "u_1002",
        userName: "Fares Ahmed",
        text: "Great video!",
        date: "2025-08-26T15:00:00Z",
        replies: [
          {
            replyId: "c_2004_cm2_r1",
            userId: "u_1003",
            userName: "Mona Ali",
            text: "I agree, very clear.",
            date: "2025-08-27T09:00:00Z"
          }
        ]
      },
       

    ]
  },
      
    ],
    createdAt: "2025-08-21T12:00:00Z"
  },
  
  {
    courseId: "c_2005",
    title: "Learn Web Design For Beginners - Full Course",
    description: "In this course you’ll learn everything you need to create a beautiful, fully functional website from start to finish.",
    mainCategoryId:"cat_3",
    subCategoryId: "sub_5",  
    teacherId: "u_1004",
    image: "/assets/Playlistsimages/playlist5.avif",
    rating: 4.7,
    studentsCount: 95,
    reviews: [],
    playlist: [
      {
    videoId: "v_3005",
    title: "Introduction",
    url: "https://www.youtube.com/watch?v=j6Ule7GXaRs",
    likes: 210,
    thumbImage:"/assets/Playlistsimages/playlist5.avif",
    createdAt: "2025-08-20T10:00:00Z",

    comments: [
      {
        commentId: "c_2005_cm1",
        userId: "u_1002",
        userName: "Fares Ahmed",
        text: "Great video!",
        date: "2025-08-26T15:00:00Z",
        replies: [
          {
            replyId: "c_2005_cm1_r1",
            userId: "u_1003",
            userName: "Mona Ali",
            text: "I agree, very clear.",
            date: "2025-08-27T09:00:00Z"
          }
        ]
      },
      {
        commentId: "c_2005_cm2",
        userId: "u_1002",
        userName: "Fares Ahmed",
        text: "Great video!",
        date: "2025-08-26T15:00:00Z",
        replies: [
          {
            replyId: "c_2005_cm2_r1",
            userId: "u_1003",
            userName: "Mona Ali",
            text: "I agree, very clear.",
            date: "2025-08-27T09:00:00Z"
          }
        ]
      },
       

    ]
  },
      
    ],
    createdAt: "2025-08-21T12:00:00Z"
  },
  
  {
    courseId: "c_2006",
    title: "Free Animation Course Tutorial for Beginners",
    description: "Learn animation techniques for creating engaging visual content. Understand principles like timing, spacing, and movement in animation.",
    mainCategoryId:"cat_3",
    subCategoryId: "sub_6",  
    teacherId: "u_1004",
    image: "/assets/Playlistsimages/playlist6.avif",
    rating: 4.7,
    studentsCount: 95,
    reviews: [],
    playlist: [
      {
    videoId: "v_3006",
    title: "Introduction",
    url: "https://www.youtube.com/watch?v=6XBq8_iNlxY",
    likes: 210,
    thumbImage:"/assets/Playlistsimages/playlist6.avif",
    createdAt: "2025-08-20T10:00:00Z",

    comments: [
      {
        commentId: "c_2006_cm1",
        userId: "u_1002",
        userName: "Fares Ahmed",
        text: "Great video!",
        date: "2025-08-26T15:00:00Z",
        replies: [
          {
            replyId: "c_2006_cm1_r1",
            userId: "u_1003",
            userName: "Mona Ali",
            text: "I agree, very clear.",
            date: "2025-08-27T09:00:00Z"
          }
        ]
      },
      {
        commentId: "c_2006_cm2",
        userId: "u_1002",
        userName: "Fares Ahmed",
        text: "Great video!",
        date: "2025-08-26T15:00:00Z",
        replies: [
          {
            replyId: "c_2006_cm2_r1",
            userId: "u_1003",
            userName: "Mona Ali",
            text: "I agree, very clear.",
            date: "2025-08-27T09:00:00Z"
          }
        ]
      },
       

    ]
  },
      
    ],
    createdAt: "2025-08-21T12:00:00Z"
  },
  
  
  {
    courseId: "c_2007",
    title: "FL Studio Tutorial - Complete Music Producer 4h+ Course",
    description: "Welcome to the Complete Music Producer Beginner's Course (FL Studio Basics Tutorial) where you'll master everything you need to start making your own music in FL Studio.",
    mainCategoryId:"cat_4",
    subCategoryId: "sub_7",  
    teacherId: "u_1005",
    image: "/assets/Playlistsimages/playlist7.avif",
    rating: 4.7,
    studentsCount: 95,
    reviews: [],
    playlist: [
      {
    videoId: "v_3007",
    title: "Introduction",
    url: "https://www.youtube.com/watch?v=6YwWKn6k0Mg",
    likes: 210,
    thumbImage:"/assets/Playlistsimages/playlist7.avif",
    createdAt: "2025-08-20T10:00:00Z",

    comments: [
      {
        commentId: "c_2007_cm1",
        userId: "u_1002",
        userName: "Fares Ahmed",
        text: "Great video!",
        date: "2025-08-26T15:00:00Z",
        replies: [
          {
            replyId: "c_2007_cm1_r1",
            userId: "u_1003",
            userName: "Mona Ali",
            text: "I agree, very clear.",
            date: "2025-08-27T09:00:00Z"
          }
        ]
      },
      {
        commentId: "c_2007_cm2",
        userId: "u_1002",
        userName: "Fares Ahmed",
        text: "Great video!",
        date: "2025-08-26T15:00:00Z",
        replies: [
          {
            replyId: "c_2007_cm2_r1",
            userId: "u_1003",
            userName: "Mona Ali",
            text: "I agree, very clear.",
            date: "2025-08-27T09:00:00Z"
          }
        ]
      },
       

    ]
  },
      
    ],
    createdAt: "2025-08-21T12:00:00Z"
  },
  
  
  {
    courseId: "c_2008",
    title: "30 Min HYBRID TRAINING | No Equipment | Rowan Row",
    description: "Challenge yourself with this 30 Minute Hybrid Training Workout - no equipment needed! This routine is split into 3 powerful blocks to give you a complete full-body session:",
    mainCategoryId:"cat_5",
    subCategoryId: "sub_8",  
    teacherId: "u_1006",
    image: "/assets/Playlistsimages/playlist8.avif",
    rating: 4.7,
    studentsCount: 95,
    reviews: [],
    playlist: [
      {
    videoId: "v_3008",
    title: "Introduction",
    url: "https://www.youtube.com/watch?v=Rr4fCfV-c5M",
    likes: 210,
    thumbImage:"/assets/Playlistsimages/playlist8.avif",
    createdAt: "2025-08-20T10:00:00Z",

    comments: [
      {
        commentId: "c_2008_cm1",
        userId: "u_1002",
        userName: "Fares Ahmed",
        text: "Great video!",
        date: "2025-08-26T15:00:00Z",
        replies: [
          {
            replyId: "c_2008_cm1_r1",
            userId: "u_1003",
            userName: "Mona Ali",
            text: "I agree, very clear.",
            date: "2025-08-27T09:00:00Z"
          }
        ]
      },
      {
        commentId: "c_2008_cm2",
        userId: "u_1002",
        userName: "Fares Ahmed",
        text: "Great video!",
        date: "2025-08-26T15:00:00Z",
        replies: [
          {
            replyId: "c_2008_cm2_r1",
            userId: "u_1003",
            userName: "Mona Ali",
            text: "I agree, very clear.",
            date: "2025-08-27T09:00:00Z"
          }
        ]
      },
       

    ]
  },
      
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


 