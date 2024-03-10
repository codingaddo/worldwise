import React, { createContext, useContext, useReducer } from 'react'

const AuthenticationContext = createContext()
const initialState = {
    user:null, 
    isAuthenticated: false,
}

const reducerFunc = (state,action)=>{
    switch(action.type){
        case 'login':
            return {
                ...state,
                user:action.payload,
                isAuthenticated:true
            }
        
        case 'logout':
            return {
                initialState
            }

    default:
        throw new Error('Unknown action')
    
    }

}


const FAKE_USER = {
    name: "Jack",
    email: "mike@gmail.com",
    password: "qwerty",
    avatar: "https://i.pravatar.cc/100?u=zz",
  };

const AuthenticationProvider = ({children}) => {
    const [state,dispatch] = useReducer(reducerFunc,initialState)
    const {user,isAuthenticated} = state
    
    const login=(email,password)=>{
        if(email===FAKE_USER.email && password===FAKE_USER.password) dispatch({type: 'login', payload: FAKE_USER })

    }

    const logout=()=>{
        dispatch({type: 'logout',})

    }

  return (
    <AuthenticationContext.Provider
        value={
            {
                user,
                isAuthenticated,
                login,
                logout
            }
        }
    >
        {children}
    </AuthenticationContext.Provider>
  )
}

function useAuthentication(){
    const context = useContext(AuthenticationContext)
    if(context === undefined) throw new Error('AuthenticationContext was used outside the AuthenticationProvider')

    return context
}

export {AuthenticationProvider,useAuthentication}
