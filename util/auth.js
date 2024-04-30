import axios from "axios";

const key = 'AIzaSyCrmSbm9WOsuVH9FThGIkxXAMnshLR4Lxw'
const createMode = "signUp"
const signInMode = "signInWithPassword"

const authenticate = async (mode, email, password) => {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${key}`
    const response = await axios.post(url,
        {
            email,
            password,
            returnSecureToken: true
        },
    )
    return {token: response.data.idToken, uid: response.data.localId}
}
export const createUser =  (email, password) => {
     return  authenticate(createMode, email, password)
}

export const signInUser =   (email, password) => {
     return  authenticate(signInMode, email, password)
}

