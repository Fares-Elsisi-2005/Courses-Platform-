// src/Reducers/AuthReducer.js
export const AuthReducer = (userState, action) => {
  switch (action.type) {
    case "BECOME_TEACHER":
      return { ...userState, role: action.payload };

    case "LOGIN":
      return { ...userState, user: action.payload.user, role: action.payload.role };

    case "LOGOUT":
      return { user: null, role: "guest" };

    default:
      return userState;
  }
};
