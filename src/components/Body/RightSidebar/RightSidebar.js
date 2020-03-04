import React from 'react';
import s from './styles.module.css';

import {connect} from 'react-redux';


import Loader from '../../Loader/Loader';

import HallsAdmin from './HallsAdmin';



const RightSidebar = props => {
	return (
		<div className={s.bodyOverflow} >
			{props.isLoading ? (
				<Loader />
			) : (
				<div>
					<HallsAdmin />
				</div>
			)}
		</div>
	);
};


const mapStateToProps = (state) => ({
    isLoading: state.hallsState.isLoading
})

const mapDispatchToProps = {

}

const Container = connect(mapStateToProps, mapDispatchToProps)(RightSidebar);


export default Container;