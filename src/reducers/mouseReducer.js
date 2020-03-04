

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



export const clickPress = () => ({
    type: MOUSE_CLICK
})

export const clickUp = () => ({
    type: MOUSE_UP
})




// export const updateCloseTime = (newTime) => (dispatch, getState) => {

//     dispatch( makeTimeline() );

// }





export default mouseReducer;




