import React, {useEffect} from 'react';
import s from './styles.module.css'

const ref = React.createRef();


const Release = props => {
	const data = { ...props.data };

	useEffect(() => {
		ref.current.onselectstart = () => false;
	}, []);

	const mouseDownHandler = (e) => {
		var box = ref.current.getBoundingClientRect();

		props.clickDown(data.id, {
			x: e.pageX - box.left,
			y: e.pageY - box.top
		});
	}

	const mouseUpHandler = (e) => {
		var box = ref.current.getBoundingClientRect();

		props.clickUp(data.id, {
			x: e.pageX - box.left,
			y: e.pageY - box.top
		});
	}

	return (
		<div
			onMouseDown={mouseDownHandler}
			onMouseUp={mouseUpHandler}
			className={s.release}
			style={{ top: data.fromTopPx, height: data.heightPx, width: props.defaultReleaseWidth }}
			ref = { ref }
		>
			<div className="release__name">{data.name}</div>
			<div className="release__timeStart">{data.timeStart}</div>
			<div className="release__timeEnd">{data.timeEnd}</div>
			<div className="duration">{data.duration}</div>
		</div>
	);
};




export default Release;