 

// src/Reducers/AuthReducer.js
export const AuthReducer = (userState, action) => {
  switch (action.type) {
    
   

    case "LOGIN":
          return {
        ...userState,
        user: action.payload.user,
        role: action.payload.role,
        
      };


 
      

    case "LOGOUT":
      return { user: null, role: "guest" };

    default:
      return userState;
  }
};



/* when he click login it will be two cases
first he is in our app dadabse to we just return the user data 
second he is not in our database so we will add him to   our app databse and we will return the user data
 */