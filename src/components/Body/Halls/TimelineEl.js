import React from 'react';
import s from './styles.module.css';

import {connect} from 'react-redux';




const TimelineEl = props => {

	const isZeroTime = props.isZeroTime ? s.isZeroTime : '';
	const isHalfHours = props.isHalfHours ? s.isHalfHours : '';
	const classesStr = ` ${isZeroTime} ${isHalfHours}`;

	const lineWidth = isHalfHours ? 10 :
										isZeroTime ? 5 : 0;

	return (
		<div className={s.timelineEl + classesStr} style={{top: props.fromTopPx}}>
			<div className={s.timelineEl__line} ></div>
			<div>
				{props.isZeroTime ? <div className={s.timelineEl__time}>{props.time}</div> : '' }
			</div>
		</div>
	);
};






export default TimelineEl;