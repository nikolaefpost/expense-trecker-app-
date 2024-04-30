import {createContext, useContext, useEffect, useState} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext({
    token: "",
    uid: "",
    isAuthenticated: false,
    authenticate: (token) => {},
    logout: () => {}
})

export const useAuthCtx = () => useContext(AuthContext);

const AuthContextProvider = ({children}) => {
    const [authToken, setAuthToken] = useState('')
    const [userUid, setUserUid] = useState('')

    useEffect(() => {

        const getStorageToken = async () => {
            try {
                const storageJson = await AsyncStorage.getItem('token')
                if (storageJson !== null) {
                    const storageData = JSON.parse(storageJson)
                    setAuthToken(storageData.token)
                    setUserUid(storageData.uid)
                }
            } catch (e) {
                console.log(e)
            }
        }
        getStorageToken().catch(error => {
            console.error("Promise handling error:", error);
        });
    }, []);

    const authenticate = async (userAuthData) => {
        setAuthToken(userAuthData.token)
        setUserUid(userAuthData.uid)
        try {
            await AsyncStorage.setItem('token', JSON.stringify(userAuthData))
        } catch (e) {
            console.log(e)
        }
    }

    const logout = async () => {
        setAuthToken(null)
        setUserUid(null)
        try {
            await AsyncStorage.removeItem('token')
        } catch (e) {
            console.log(e)
        }
    }

    const value = {
        token: authToken,
        uid: userUid,
        isAuthenticated: Boolean(authToken),
        authenticate,
        logout
    }
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthContextProvider