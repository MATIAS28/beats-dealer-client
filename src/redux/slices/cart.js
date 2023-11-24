import {createSlice} from "@reduxjs/toolkit"

let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : false

const initialState = {
    cart: cart.cart || [],
    total: cart.total || 0
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addBeat(state, action){
            const beat = action.payload
            const cart = state.cart
            state.cart = [...cart, beat]
            state.total = state.total + beat.unit_price
            localStorage.setItem('cart', JSON.stringify({cart: state.cart, total: state.total}))
        },

        removeBeat(state, action){
            const beat = action.payload
            const cart = state.cart
            const newCart = cart.filter((cartBeat) => cartBeat._id !== beat._id)
            state.cart = [...newCart]
            state.total = state.total - beat.unit_price
            localStorage.setItem('cart', JSON.stringify({cart: state.cart, total: state.total}))
        }
    }
})

export const {addBeat, removeBeat} = cartSlice.actions
export default cartSlice.reducer