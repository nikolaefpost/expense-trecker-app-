import {createContext, useContext, useEffect, useState} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext({
    token: "",
    uid: "",
    isAuthenticated: false,
    authenticate: (token)=>{},
    logout: ()=>{}
})

export const useAuthCtx = ()=> useContext(AuthContext);

const AuthContextProvider = ({children}) => {
    const [authToken, setAuthToken] = useState('')
    const [userUid, setUserUid] = useState('')

    useEffect(() => {

        const getStorageToken = async () =>{
            try {
                const storageToken = await AsyncStorage.getItem('token');
                if (storageToken !== null) {
                    setAuthToken(storageToken)
                }
            } catch (e) {
                console.log(e)
            }
        }
        getStorageToken().catch(error => {
            console.error("Promise handling error:", error);
        });
    }, []);

    const authenticate = async (token) => {
      setAuthToken(token)
        try {
            await AsyncStorage.setItem('token', token);
        } catch (e) {
            console.log(e)
        }
    }

    const logout = async () => {
        setAuthToken(null)
        try {
            await AsyncStorage.removeItem('token')
        } catch (e) {
            console.log(e)
        }
    }

    const value = {
        token: authToken,
        uid: "",
        isAuthenticated: Boolean(authToken),
        authenticate,
        logout
    }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthContextProvider