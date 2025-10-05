 import { createContext, useReducer, useContext } from "react";
import { users, categories, courses } from "../data/data";
import appReducer from "../Reducers/AppReducer";

// Create context ==> empty box
const AppDataContext = createContext();

// Create provider ===> filling the box with the intial data and reducer
export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, {
    currentUser: users[1],
    users,
    categories,
    courses,
  });

  return (
    <AppDataContext.Provider value={{ state, dispatch }}>
      {children}
    </AppDataContext.Provider>
  );
}

// Custom hook for easier access ===> a function used by the children to acces the state and reducer
export function useAppData() {
  return useContext(AppDataContext);
}
