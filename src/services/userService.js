import axios from "axios";
const apiUrl = import.meta.env.VITE_SERVER_URL;


export const loginUser = async ({email, password}) => {
    try {
        const response = await axios.post(apiUrl+'login', {email: email, password: password})
        const userData = {user: response.data.user, token: response.data.token}
        return userData
    } catch (e) {
        console.error('Error fetching user', e);
        throw e;
    }
}

export const registerUser = async (userToRegister) => {
    try {
        const response = await axios.post(apiUrl+'register', userToRegister)
        const userData = {user: response.data.user, token: response.data.token}
        return userData
    } catch (e) {
        console.error('Error fetching user', e);
        throw e;
    }
}

export const getUser = async(token) => {
    try {
        const user = await axios.get(apiUrl+'user', {headers:{'auth-token': token}})
        return user.data
    } catch (e) {
        console.error('Error fetching user', e);
        throw e;
    }
}

export const addLike = async (token, beatId) => {
    try {
        await axios.post(apiUrl+'add-like/'+beatId, {}, { headers: {'auth-token': token}})
    } catch (e) {
        console.error(e)
        throw e;
    }
}


export const getPayLink = async (token, products, total) => {
    console.log(products);
    try {
        const payLink = await axios.post(apiUrl+'order', {products: products, totalPrice: total}, {headers: {'auth-token': token}})
        if (payLink.status == 404) {
            throw payLink.data.message;
        }
        return payLink
    } catch (e) {
        console.error(e)
        throw e;
    }
}

export const getOrders = async (token) => {
    try {
        const orders = await axios.get(apiUrl+'orders', {headers: {'auth-token': token}})
        return orders.data.orders
    } catch (e) {
        console.error(e)
        throw e;
    }
}