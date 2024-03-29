import {makeTimeline} from './timelineReducer';
import {timeToPixels} from '../functions';

const FETCHING = 'FETCHING';
const FETCH_END = "FETCH_END";
const UPDATE_OPEN_TIME = "UPDATE_OPEN_TIME";
const UPDATE_CLOSE_TIME = "UPDATE_CLOSE_TIME";
const CHANGE_RELEASE_TIME = "CHANGE_RELEASE_TIME";

const initState = {
   isLoading: false,
   hallsRules: {
        minMinutesIn: 10,
        minMinutesBetween: 15,
        openTime: "08:00",
        closeTime: "23:00",
        defaultReleaseWidth: 100,
   },
   hallsCurrentData: [{
       id: 0,
       title: "Зал 1",
       releases: [
           {   
               id: 0,
               customKey: "0",
               name: "Игра престолов",
               minShows: 1,
               timeStart: "09:00",
               timeEnd: "09:30",
               duration: 30,
               fromTopPx: 0,
               heightPx: 30 * 2
           }
       ]
   }]
};


const hallsReducer = ( state = initState , action) => {
    switch (action.type) {

        case CHANGE_RELEASE_TIME: 
            return {
                ...state,
                hallsCurrentData: state.hallsCurrentData.map((hall, hallIndex) => {
                    if (hallIndex === action.hallsWithReleaseIndex) {
                        return {
                            ...hall,
                            releases: state.hallsCurrentData[action.hallsWithReleaseIndex].releases.map((release, releaseIndex) => {
                                if (release.id === action.releaseId) {
                                    return {
                                        ...release,
                                        fromTopPx: action.timeInPxStart
                                    }
                                }
                                return {... release}
                            })
                        }
                    }
                    return {...hall}
                })                                                                                                                                                                                                                                                          
            }


        case FETCHING: {
            return {
                ...state,                                                           
                isLoading: true,
            }
        }
        case FETCH_END: {
            return {
                ...state,
                isLoading: false,
            }
        }
        case UPDATE_OPEN_TIME: 
            return {
                ...state,
                hallsRules: {
                    ...state.hallsRules,
                    openTime: action.newTime 
                }
            }
        case UPDATE_CLOSE_TIME: 
            return {
                ...state,
                hallsRules: {
                    ...state.hallsRules,
                    closeTime: action.newTime 
                }
            }
        default:
            return {
                ...state
            }
    }

}; 



export const fetchingStart = () => ({
    type: FETCHING
})

export const fetchingEnd = () => ({
    type: FETCH_END
})

const _updateOpenTime = (newTime) => ({
    type: UPDATE_OPEN_TIME,
    newTime
})

const _updateCloseTime = (newTime) => ({
    type: UPDATE_CLOSE_TIME,
    newTime
})

function timeValidate(str){
    const reg = new RegExp(/[0-9]{2}:[0-9]{2}/);
    return reg.test(str);
}

export const updateOpenTime = (newTime) => (dispatch, getState) => {
    let time = timeValidate(newTime) ? newTime : getState().hallsState.hallsRules.openTime;
    
    dispatch(_updateOpenTime(time))
    dispatch(makeTimeline());
    
}

export const updateCloseTime = (newTime) => (dispatch, getState) => {
    let time = timeValidate(newTime) ? newTime : getState().hallsState.hallsRules.closeTime;
    dispatch(_updateCloseTime(time))
    dispatch(makeTimeline());

}



const _releaseTimeChange = (releaseId, timeStart, timeEnd, toTopPx) => {
    return {
        type: CHANGE_RELEASE_TIME,
        timeStart,
        timeEnd,
        toTopPx
    }
}

export const releaseTimeChange = (dispatch, getState, releaseId, mouse, mouseCoordsClickAboutSelf) =>  {


    const hallsWithReleaseIndex = getState().hallsState.hallsCurrentData.findIndex(hall => {
        return hall.releases.find(release => release.id === releaseId)
    });

    const hallsWithReleaseData = getState().hallsState.hallsCurrentData[hallsWithReleaseIndex];

    const releaseIndex = hallsWithReleaseData.releases.findIndex(release => release.id === releaseId);
    const releaseData = hallsWithReleaseData.releases[releaseIndex];

    const timeInPxStart = mouse.fromSelfY - mouseCoordsClickAboutSelf.y + releaseData.heightPx/2;
    const timeInPxEnd = timeInPxStart + releaseData.heightPx;


    dispatch({
        type: CHANGE_RELEASE_TIME,
        releaseId,
        hallsWithReleaseIndex,
        releaseIndex,
        timeInPxStart,
        timeInPxEnd
    })

}




export default hallsReducer;




