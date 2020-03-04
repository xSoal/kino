import React from 'react';
import s from './styles.module.css';

import {connect} from 'react-redux';


import OpenCloseTime from './OpenCloseTime'

import {updateOpenTime, updateCloseTime} from '../../../reducers/hallsReducer';

const timeFormat = 'HH:mm';




const HallsAdmin = props => {
	return (
		<div >
			<div>
				<OpenCloseTime
					openTime={props.openTime}
					closeTime={props.closeTime}
					onOpenTimeChange={props.updateOpenTime}
					onCloseTimeChange={props.updateCloseTime}
				/>
			</div>
			<div>
				
			</div>        
		</div>
	);
};


const mapStateToProps = (state) => ({
	isLoading: state.hallsState.isLoading,
	openTime: state.hallsState.hallsRules.openTime,
	closeTime: state.hallsState.hallsRules.closeTime,
})

const mapDispatchToProps = {
	updateOpenTime,
	updateCloseTime
}

const Container = connect(mapStateToProps, mapDispatchToProps)(HallsAdmin);


export default Container;