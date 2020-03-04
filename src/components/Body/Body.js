import React from 'react';
import s from './styles.module.css';

import {connect} from 'react-redux';


import Loader from '../Loader/Loader';
import Halls from './Halls/Halls'
import RightSidebar from './RightSidebar/RightSidebar'
import {setNodeOffset, mouseUpdate} from '../../reducers/timelineReducer';
import {clickPress, clickUp} from '../../reducers/mouseReducer';

const ref = React.createRef();





class Body extends React.Component {
	onMousemove = e => {
		let fromSelfY = e.pageY - ref.current.offsetTop;
		let fromSelfX = e.pageX - ref.current.offsetLeft;
		this.props.mouseUpdate({
			fromSelfY: fromSelfY ? fromSelfY : 0,
			fromSelfX: fromSelfX ? fromSelfX : 0
		});
	};


	componentDidMount() {
		this.props.setNodeOffset(ref.current.offsetTop);
	}

	render() {
		const height = this.props.heightCont ? `${this.props.heightCont}px` : `auto`;
		return (
			<>
				{this.props.isLoading ? (
					<Loader />
				) : (
					<div
						style={{ border: "1px solid red", height: height }}
						ref={ref}
						className={s.bodyOverflow}
						onMouseMove={this.onMousemove}
						onMouseDown={this.props.clickPress}
						onMouseUp={this.props.clickUp}
					>
						<Halls />
						<RightSidebar />
					</div>
				)}
			</>
		);
	}
}




const mapStateToProps = (state) => ({
	isLoading: state.hallsState.isLoading,
	heightCont: state.timelineState.heightCont
})

const mapDispatchToProps = {
	setNodeOffset,
	mouseUpdate,
	clickPress,
	clickUp
}


const Container = connect(mapStateToProps, mapDispatchToProps)(Body);


export default Container;