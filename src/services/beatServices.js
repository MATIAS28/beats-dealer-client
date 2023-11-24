import axios from "axios";
const apiUrl = import.meta.env.VITE_SERVER_URL;

export const getBeats = async () => {
    try {
        const beats = await axios.get(apiUrl+'beats')
        return beats.data
    } catch (e) {
        console.error('Error fetching beats', e);
        throw e;
    }
}

export const getBeatToPlay = async (id, userId) => {
    try {
        const beat = await axios.get(apiUrl+'play-beat/'+id+'/'+ userId)
        return beat.data
    } catch (e) {
        console.error('Error fetching beats', e);
        throw e;
    }
}

export const getBeatFound = async (search) => {
    try { 
        const beatsFound = await axios.post(apiUrl+'beats', {name: search})
        return beatsFound
    } catch (e) {
        console.error(e)
        throw e
    }
}

export const getFavoriteBeats = async (token) => {
    try {
        const favoriteBeats = await axios.get(apiUrl+'likes', {headers: {'auth-token': token}})
        return favoriteBeats.data
    } catch (e) {
        console.error(e)
        throw e
    }
}

export const getPurchasedBeats = async (token) => {
    try {
        const purchasedBeats = await axios.get(apiUrl+'my-beats', {headers:{'auth-token': token}})
        return purchasedBeats.data.beats
    } catch (e) {
        console.error(e)
        throw e
    }
}

export const getDownloadLink = async (token, id) => {
    try {
        const link = await axios.post(apiUrl+'/download-beat/'+id, {}, {headers: {'auth-token': token}})
        
        const beatLink = await axios.get(link.data, {
            responseType: 'blob', 
          });
    
        const url = window.URL.createObjectURL(new Blob([beatLink.data]))

        return url
    } catch (e) {
        console.error(e)
        throw e
    }
}