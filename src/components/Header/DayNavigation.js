import React from 'react';
import s from './styles.module.css';

import {connect} from 'react-redux';


import { Button } from 'antd';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';

import {prevDay, nextDay, _prev} from "../../reducers/daysNavigationReducer"



const Header = props => {

	return (
		<div>
			<div className={s.dayNavigation}>
				<Button
					onClick={props.prevDay}
					disabled={props.isLoading ? true : false}
					type="primary"
					className={s.dayButton}
				>
					<ArrowLeftOutlined />
				</Button>
				<h3>{props.day}</h3>
				<Button
					onClick={props.nextDay}
					disabled={props.isLoading ? true : false}
					type="primary"
					className={s.dayButton}
				>
					<ArrowRightOutlined/>
				</Button>
			</div>
		</div>
	);
};


const mapStateToProps = (state) => ({
    day: state.daysNavigationState.day,
    isLoading: state.hallsState.isLoading
})

// const mapDispatchToProps = () => ({
//     prevDay,
//     nextDay
// })

const mapDispatchToProps = {
    nextDay,
    prevDay
}

const test = connect(mapStateToProps, mapDispatchToProps)(Header);


export default test;