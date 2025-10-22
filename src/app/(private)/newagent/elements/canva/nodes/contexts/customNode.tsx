import { createContext, useContext, ReactNode } from "react";

// Define type for context value
interface UserContextType {
  isClose: () => void;
}

// Create context with default value (can be empty function)
const UserContext = createContext<UserContextType>({
  isClose: () => {},
});

// Custom hook
export const useUser = () => useContext(UserContext);

// Provider props type
interface UserProviderProps {
  children: ReactNode;
  isClose: () => void;
}

// Provider component
export const UserProvider = ({ children, isClose }: UserProviderProps) => {
  return (
    <UserContext.Provider value={{ isClose }}>
      {children}
    </UserContext.Provider>
  );
};
