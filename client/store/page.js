import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_PAGE = 'GET_PAGE'

/**
 * INITIAL STATE
 */
const initialState= {
  singlePage: {},
}

/**
 * ACTION CREATORS
 */
const getPage = page =>({type: GET_PAGE, page})

/**
 * THUNK CREATORS
 */
export const gotPage = (pageId) => async (dispatch)=>{
  try {
    const {data} = await axios.get(`/api/page/${pageId}`)
    dispatch(getPage(data))
  } catch(err){
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
      case GET_PAGE:
      return {...state, singlePage: action.page}
    default:
      return state
  }
}
