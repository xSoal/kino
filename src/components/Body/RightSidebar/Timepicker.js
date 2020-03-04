
import React, {useState} from 'react';
import { TimePicker } from 'antd';
import 'antd/dist/antd.css';
import moment from 'moment';

const format  = "HH:mm";

const TimePickerOwn = props => {

    const onChange = (time, timeString) =>  {
        props.onChange(timeString);
    }

    return (
			<label>
				<span>{props.title}</span>
				<TimePicker
					onChange={onChange}
					defaultValue={moment(props.startTime, format)}
                    format={format}
                    placeholder="Время"
				/>
			</label>
		);

};


export default TimePickerOwn;