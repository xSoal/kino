import React from 'react';
import s from './styles.module.css';
import Release from './Release'

import {connect} from 'react-redux';
import {releaseClickDown, releaseClickUp} from '../../../reducers/timelineReducer';






const Hall = props => {
	// console.log(props.hallData, 'релизы')
	const getReleases = releases =>
		releases.map((rel, i) => (
			<Release
				clickUp={props.releaseClickUp}
				clickDown={props.releaseClickDown}
				defaultReleaseWidth={props.defaultReleaseWidth}
				data={rel}
				key={i}
			/>
		));

	return (
		<div>
			<div className={s.hall__header}>{props.hallData.title}</div>
			<div className="releasesCont">{getReleases(props.hallData.releases)}</div>
		</div>
	);
};


const mapStateToProps = state => ({
	defaultReleaseWidth: state.hallsState.hallsRules.defaultReleaseWidth
})

const mapDispatchToProps = {
	releaseClickDown,
	releaseClickUp
}

const Container = connect(mapStateToProps, mapDispatchToProps)(Hall);


export default Container;