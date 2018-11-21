import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GOT_STICKERS = 'GOT_STICKERS'
const SET_STICKER = 'SET_STICKER'
// const REMOVE_USER = 'REMOVE_USER'

/**
 * INITIAL STATE
 */
const initialState = {
  allStickers: [],
  stickerId: ''
}

/**
 * ACTION CREATORS
 */
const gotStickers = allStickers => ({type: GOT_STICKERS, allStickers})
const setSticker = sticker => ({type: SET_STICKER, sticker})
// const removeUser = () => ({type: REMOVE_USER})

/**
 * THUNK CREATORS
 */
export const dropSticker = (id)  => async dispatch => {
  try {
    dispatch(setSticker(id))
  } catch (err) {
    console.log(err)
  }
}

export const allStickers = () => async dispatch => {
  try {
    const res = await axios.get('/api/pages/stickers')
    console.log("res.data:", res.data)
    dispatch(gotStickers(res.data))
  } catch (err) {
    console.log(err)
  }
}
/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_STICKERS:
      return {...state, allStickers: action.allStickers}
    case SET_STICKER:
      return {...state, stickerId: action.sticker}

    default:
      return state
  }
}
