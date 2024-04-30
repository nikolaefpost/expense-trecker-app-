import React, {useState} from 'react';
import {AuthContent, LoadingOverlay} from "../сomponents";
import {createUser} from "../util/auth";
import {Alert} from "react-native";
import {useAuthCtx} from "../store/context/auth";

const SignupScreen = () => {
    const [isAuthenticating, setIsAuthenticating] = useState(false);
    const {authenticate} =useAuthCtx();
    const signupHandler = async ({email, password}) => {
        setIsAuthenticating(true)
        try{
            const userAuthData = await createUser(email, password);
            authenticate(userAuthData);
        }catch (error) {
            setIsAuthenticating(false)
            Alert.alert(
                'Authentication failed!',
                "Could not create user. Please check your inputs and try again later"
                // error.message
            )
        }

        setIsAuthenticating(false)
    }
    if (isAuthenticating){
        return <LoadingOverlay message="Creating user..."/>
    }

    return <AuthContent  onAuthenticate={signupHandler}/>
};

export default SignupScreen;