import {fetchingStart, fetchingEnd} from './hallsReducer'


import moment from 'moment';

const NEXT_DAY = 'NEXT_DAY';
const PREV_DAY = 'PREV_DAY';

const initState = {
    day: moment().format("YYYY-MM-DD"),
}





const daysNavigationReducer = ( state = initState , action) => {
    switch (action.type) {
        case PREV_DAY:
            return {
                ...state,
                day: moment(action.currentDay).subtract(1, "days").format("YYYY-MM-DD")
            }
        case NEXT_DAY:
            return {
                ...state,
                day: moment(action.currentDay).add(1, "days").format("YYYY-MM-DD")
            }
        default:
            return {
                ...state
            }
    }

};

 const _next = (currentDay) => {
    return {
        type: NEXT_DAY,
        currentDay
    }
}

export const _prev = (currentDay) => {
    return {
        type: PREV_DAY,
        currentDay
    }
}



const changeDay = async (dispatch) => {
    dispatch(fetchingStart());
    
    let fetching = new Promise((res)=>{
        setTimeout(()=>{
            res();
        }, 2555)
    })
    let data = await fetching;
    
    dispatch(fetchingEnd());
    return data;
}


export const prevDay = () => (dispatch, getState) => {
    dispatch( _prev( getState().daysNavigationState.day ) );
    
    changeDay(dispatch);

}
export const nextDay = () => (dispatch, getState) => {
    dispatch( _next( getState().daysNavigationState.day ) );
    changeDay(dispatch);
}





export default daysNavigationReducer;




