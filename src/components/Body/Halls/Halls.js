import React from 'react';
import s from './styles.module.css';

import {connect} from 'react-redux';

import Loader from '../../Loader/Loader';
import Timeline from './Timeline';
import Hall from './Hall';

const getAllHallsJsx = (hallsCurrentData) =>
	hallsCurrentData.map(hallData => (
		<Hall key={hallData.id} hallData={hallData} />
	));


const Halls = props => {
	return (
		<div>
			{props.isLoading ? (
				<Loader />
			) : (
				<div className={`${s.flexCont}`}>
					<Timeline />
					<div className={s.hallsCont}>
						{getAllHallsJsx(props.hallsCurrentData)}
					</div>
				</div>
			)}
		</div>
	);
	
};


const mapStateToProps = (state) => ({
	isLoading: state.hallsState.isLoading,
	hallsCurrentData: state.hallsState.hallsCurrentData,
})

const mapDispatchToProps = {

}

const Container = connect(mapStateToProps, mapDispatchToProps)(Halls);


export default Container;