

import {releaseClickUp} from './timelineReducer'

const MOUSE_CLICK = "MOUSE_CLICK";
const MOUSE_UP = "MOUSE_UP";

const initState = {
    isClick: false,
};


const mouseReducer = ( state = initState , action) => {
    switch (action.type) {
        case MOUSE_CLICK: {
            return {
                ...state,
                isClick: true,
            }
        }
        case MOUSE_UP: {
            return {
                ...state,
                isClick: false,
            }
        }
        default:
            return {
                ...state
            }
    }

}; 



const _clickPress = () => ({
    type: MOUSE_CLICK
})

const _clickUp = () => ({
    type: MOUSE_UP
})


export const clickPress = () => (dispatch, getState) => {


    dispatch(_clickPress())
}

export const clickUp = () => (dispatch, getState) => {

    if(getState().timelineState.releaseClickDown.status){
        dispatch(releaseClickUp());
    }

    dispatch(_clickUp())
}



// export const updateCloseTime = (newTime) => (dispatch, getState) => {

//     dispatch( makeTimeline() );

// }





export default mouseReducer;




