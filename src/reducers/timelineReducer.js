
import moment from 'moment'

import { releaseTimeChange } from './hallsReducer'


const MAKE_TIME_LINE = "MAKE_TIME_LINE";
const BODY_INIT = "BODY_INIT";
const MOUSE_MOVE = "MOUSE_MOVE";
const CHANGE_HEIGHT_CONT = "CHANGE_HEIGHT_CONT";

const CLICK_DOWN_ON_RELEASE = "CLICK_DOWN_ON_RELEASE";
const CLICK_UP_ON_RELEASE = "CLICK_UP_ON_RELEASE";



const initState = {
    heightCont: null,
    minutesStep: 1,
    pixelInMinute: 2,
    yOffset: null,
    // mouseCoords - mouse move coordinates about most parent container 
    mouseCoords: {
        fromSelfY: null,
        fromSelfX: null
    },
    releaseClickDown: {
        status: false,
        releaseId: null,
        // mouseCoordsAboutSelf - coordinates of mouse click in release container about self
        mouseCoordsAboutSelf: {
            x: null,
            y: null
        }
    },
    timeline: []
};


const timelineReducer = ( state = initState , action) => {
    switch (action.type) { 

        case CLICK_DOWN_ON_RELEASE: 
            return {
                ...state,
                releaseClickDown: {
                    ...state.releaseClickDown,
                    status: true,
                    releaseId: action.releaseId,
                    mouseCoordsAboutSelf: {
                        x: action.mouseCoords.x,
                        y: action.mouseCoords.y
                    }
                }
            }
        case CLICK_UP_ON_RELEASE: 
            return {
                ...state,
                releaseClickDown: {
                    ...state.releaseClickDown,
                    status: false,
                    releaseId: null,
                    mouseCoordsAboutSelf: {
                        x: null,
                        y: null
                    }
                }
            }
        
        case MAKE_TIME_LINE: 

            return {
                ...state,
                timeline: [
                    ...action.data
                ]
            }

        case BODY_INIT:

            return {
                ...state,
                yOffset: action.yOffset
            }
        
        case MOUSE_MOVE: 
            
            return {
                ...state,
                mouseCoords: {
                    ...state.mouseCoords,
                    fromSelfY: action.mouseCoords.fromSelfY,
                    fromSelfX: action.mouseCoords.fromSelfX
                }
            }

        case CHANGE_HEIGHT_CONT:

            return {
                ...state,
                heightCont: action.height
            }

        default:
            return {
                ...state
            }
    }

}; 



export const pushTimelineDate = (data) => ({
    type: MAKE_TIME_LINE,
    data
})


export const setNodeOffset = (yOffset) => ({
    type: BODY_INIT,
    yOffset
});





const _changeHeight = height => ({
    type: CHANGE_HEIGHT_CONT,
    height
});



export const makeTimeline = () => (dispatch, getState) => {

    let data = {
        open: getState().hallsState.hallsRules.openTime,
        close: getState().hallsState.hallsRules.closeTime,
        yOffset: getState().timelineState.mouseAboutCont
    }

    // it's no matter about date, only different between hours
    let anyDateStr = `2020-02-28`;
    let openM = moment(`${anyDateStr} ${data.open}`);
    let closeM = moment(`${anyDateStr} ${data.close}`);


    let diffInMinutes = closeM.diff(openM, 'minutes');
    

    let timeLineData = [];

    const minutesStep = getState().timelineState.minutesStep;
    const pixelInMinute = getState().timelineState.pixelInMinute;

    // pixels height: we already calculate visual coordinates of lines
    // calculate from: 1 minute === pixelInMinute px
    const getTimelineObject = (currentTime = data.open, positionInPx = 0) => {
        const isZeroTime = new RegExp(/[0-9]{2}:[0-9]0/).test(currentTime);
        const isHalfHours = new RegExp(/[0-9]{2}:(30|00)/).test(currentTime);
        return {
            time: currentTime,
            isZeroTime,
            isHalfHours,
            positionInPx
        };
    }


    timeLineData.push(getTimelineObject());

    let i = 0;
    let fromTopPx = 0;

    while(i < diffInMinutes / minutesStep){
        let currentTime = openM.add(minutesStep, 'minutes').format(`HH:mm`);

        fromTopPx = i * pixelInMinute + 1;

        timeLineData.push(getTimelineObject(currentTime, fromTopPx));

        i++;

    }

    // 15 is custom offset, can try other 
    const heightCont = fromTopPx + 15;
    dispatch(_changeHeight(heightCont));

    dispatch(pushTimelineDate( timeLineData ))

}


const _releaseClickDown = (releaseId, mouseCoords) => ({
    type: CLICK_DOWN_ON_RELEASE,
    releaseId,
    mouseCoords
})

const _releaseClickUp = (releaseId, mouseCoords) => ({
    type: CLICK_UP_ON_RELEASE,
    releaseId,
    mouseCoords
})

export const releaseClickDown = (releaseId, mouseCoords) => (dispatch, getState) => {
    dispatch(_releaseClickDown(releaseId, mouseCoords));
}

export const releaseClickUp = (releaseId, mouseCoords) => (dispatch, getState) => {
    dispatch(_releaseClickUp(releaseId, mouseCoords));
}


export const mouseUpdate = (mouseCoords) => (dispatch, getState) => {

    const isTryToReleaseMove = getState().timelineState.releaseClickDown.status;

    dispatch({
        type: MOUSE_MOVE,
        mouseCoords
    })
    if(!isTryToReleaseMove){
        return false;
    }

    // move release
    const releaseId = getState().timelineState.releaseClickDown.releaseId;
    const mouse = {...getState().timelineState.mouseCoords};
    const mouseCoordsClickAboutSelf = {...getState().timelineState.mouseCoordsAboutSelf};

    // fromSelfX

    const hallsWithReleaseData = getState().hallsState.hallsCurrentData.find(hall => {
        return hall.releases.find(release => release.id === releaseId)
    });

    const releaseData = hallsWithReleaseData.releases.find(release => release.id === releaseId);


    const startTimeInPx = mouse.fromSelfX - mouseCoordsClickAboutSelf.x;
    const endTimeInPx = mouse.fromSelfY - mouseCoordsClickAboutSelf.y;

    
    console.log(mouse , mouseCoordsClickAboutSelf.fromSelfX)

    releaseTimeChange(dispatch, getState, releaseId, startTimeInPx, endTimeInPx);


}




export default timelineReducer;




