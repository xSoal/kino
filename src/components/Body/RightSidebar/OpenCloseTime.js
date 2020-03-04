import React, {useState} from 'react';
import s from './styles.module.css';

import TimePicker from './Timepicker';

import moment from 'moment';


const timeFormat = 'HH:mm';




// const OpenCloseTime = props => {
// 	const [openShow, setOpen] = useState(false);
// 	const [closeShow, setClose] = useState(false);

	
// 	function onOpenChange(e){
// 		props.onOpenTimeChange( e.format(timeFormat) )
// 		setOpen(false)
// 	}
	
// 	const onCloseChange = (e) => {
// 		props.onCloseTimeChange( e.format(timeFormat) )
// 		setOpen(false)
// 	}

// 	const handleOpenTimeClose = (e) => {
// 		console.log(e)
// 	}


// 	return (
// 		<div>
// 			<div>
// 				<div>Время работы кинотеатра</div>
// 				<span>
// 					С:
// 					<TimePicker
// 						open = {openShow}
// 						onOpenChange={() => {setOpen(true)}}
// 						defaultValue={moment(props.openTime, timeFormat)}
// 						format={timeFormat}
// 						onChange={onOpenChange}
// 						renderExtraFooter={() => (
// 							<Button size="small" type="primary" onClick={handleOpenTimeClose}>
// 							  Ok
// 							</Button>
// 						  )}
// 					/>
// 				</span>
// 				<span>
// 					До:
// 					<TimePicker
// 						open = {closeShow}
// 						onOpenChange={() => {setClose(true)}}
// 						defaultValue={moment(props.closeTime, timeFormat)}
// 						onChange={onCloseChange}
// 						format={timeFormat}
// 					/>
// 				</span>
// 			</div>
// 			<div></div>
// 		</div>
// 	);
// };



const OpenCloseTime = props => {
	return (
		<div>
			<div>
				<div className={s.title}>Время работы кинотеатра</div>
				<div className={s.inputsCont}>
					<TimePicker
						title="С: "
						startTime={props.openTime}
						onChange={props.onOpenTimeChange}
					/>

					<TimePicker
						title="По: "
						startTime={props.closeTime}
						onChange={props.onCloseTimeChange}
					/>
				</div>
			</div>
			<div></div>
		</div>
	);
}


export default OpenCloseTime;