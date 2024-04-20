import React, {createContext, useContext, useState} from 'react';

const UserContext = createContext(null)

export const useUserContext = () => {
    return useContext(UserContext);
}

export const UserProvider = ({children}) => {
    const [user, setUser] = useState({
        employeeId: null,
        firstName: "",
        lastName: "",
        email:"",
        isManager: null,
        accountId: null,
        username: "",
        password: "",
        isActive: null
    });
    
    const state = {
        user,
        setUser
    }
   return (
       <UserContext.Provider value={state}>
            {children}
        </UserContext.Provider>
   );
}