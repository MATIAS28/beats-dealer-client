import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    _id: null,
    artist: null,
    name: null,
    img: null,
    genre: null,
    bpm: null,
    file: null,
    duration: null,
    isFavorite: null,
    unit_price: null
}

const beatPlayerSlice = createSlice({
    name: 'beatPlayer',
    initialState,
    reducers: {
        playBeat(state, action){
            const {_id, artist, name, img, genre, bpm, file, duration, unit_price, isFavorite} = action.payload
            state._id = _id
            state.artist = artist
            state.name = name
            state.img = img.url || img
            state.genre = genre 
            state.bpm = bpm
            state.file = file
            state.duration = duration,
            state.isFavorite = isFavorite,
            state.unit_price = unit_price
        },

        hiddenPlayer(state){
            const {_id, artist, name, img, genre, bpm, file, duration, unit_price, isFavorite} = initialState
            state._id = _id
            state.artist = artist
            state.name = name
            state.img = img 
            state.genre = genre 
            state.bpm = bpm
            state.file = file
            state.duration = duration,
            state.isFavorite = isFavorite,
            state.unit_price = unit_price
        },

        addOrDeleteLike(state){
            const isFavorite = state.isFavorite
            state.isFavorite = !isFavorite
        }
    }
})

export const { playBeat, hiddenPlayer, addOrDeleteLike } = beatPlayerSlice.actions
export default beatPlayerSlice.reducer