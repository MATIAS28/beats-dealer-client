import { createSlice } from "@reduxjs/toolkit";

let user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : undefined

const initialState = {
    ...user
}


const userSlice = createSlice({
    name: 'User',
    initialState,
    reducers: {
        login(state, action){
            const {user, token} = action.payload
            state.user = user
            state.token = token
            localStorage.setItem('user', JSON.stringify({user: user, token: token}))
        },

        logOut(state, action){
            localStorage.removeItem('user')
            state.user = undefined
            state.token = undefined
        }
    }
})

export const {login, logOut} = userSlice.actions
export default userSlice.reducer