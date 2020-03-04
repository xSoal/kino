import React from 'react';
import s from './styles.module.css';

import {connect} from 'react-redux';

import Loader from '../../Loader/Loader';
import TimelineEl from './TimelineEl'


const getTimeLines = props =>
	props.timeline.map((el,i) => (
		<TimelineEl
			key = {i}
			fromTopPx={el.positionInPx}
			time={el.time}
			isZeroTime={el.isZeroTime}
			isHalfHours={el.isHalfHours}
		/>
	)); 


const Timeline = props => {
	return (
		<div className={s.timelineCont}>
			{props.isLoading ? (
				<Loader />
			) : getTimeLines(props)}
		</div>
	);
};


const mapStateToProps = (state) => ({
	isLoading: state.hallsState.isLoading,
	timeline: state.timelineState.timeline
	// openTime: state.hallsState.hallsRules.openTime,
	// closeTime: state.hallsState.hallsRules.closeTime
})

const mapDispatchToProps = {

}

const Container = connect(mapStateToProps, mapDispatchToProps)(Timeline);


export default Container;