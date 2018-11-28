import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GOT_STICKERS = 'GOT_STICKERS'
const SET_STICKER = 'SET_STICKER'
const SET_CLONE = 'SET_CLONE'
// const REMOVE_USER = 'REMOVE_USER'

/**
 * INITIAL STATE
 */
const initialState = {
  allStickers: [],
  stickerId: '',
  clone: null
}

/**
 * ACTION CREATORS
 */
const gotStickers = allStickers => ({type: GOT_STICKERS, allStickers})
const setSticker = sticker => ({type: SET_STICKER, sticker})
export const setClone = boolean => ({type: SET_CLONE, boolean})
// const removeUser = () => ({type: REMOVE_USER})

/**
 * THUNK CREATORS
 */
export const dropSticker = (id)  => async dispatch => {
  try {
    await dispatch(setSticker(id))
  } catch (err) {
    console.log(err)
  }
}

export const allStickers = () => async dispatch => {
  try {
    const res = await axios.get('/api/stickers')
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
    case SET_CLONE:
      return {...state, clone: action.boolean}

    default:
      return state
  }
}
