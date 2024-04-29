import React, {useState} from 'react';
import {AuthContent, LoadingOverlay} from "../сomponents";
import { signInUser} from "../util/auth";
import {Alert} from "react-native";
import {useAuthCtx} from "../store/context/auth";

const LoginScreen = () => {
   const [isAuthenticating, setIsAuthenticating] = useState(false)
   const {authenticate} =useAuthCtx();
   const signInHandler = async ({email, password}) => {
      setIsAuthenticating(true)
      try{
         const token = await signInUser(email, password);
         authenticate(token);
      }catch (error){
         console.log(error)
         setIsAuthenticating(false)
         Alert.alert(
             'Authentication failed!',
             "Could not log you in. Please check your credentials or try again later"
             // error.message
         )
      }

      setIsAuthenticating(false)
   }
   if (isAuthenticating){
      return <LoadingOverlay message="Logging you in..."/>
   }
   return <AuthContent isLogin onAuthenticate={signInHandler} />;
};

export default LoginScreen;