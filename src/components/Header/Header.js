import React from 'react';
import s from './styles.module.css';

import {connect} from 'react-redux';
import DayNavigation from './DayNavigation';
import { Typography, Divider } from 'antd';
const { Title, Paragraph, Text } = Typography;



const  Header = (props) => {

    const onClick = () => {
        props.click(props.clicks + 1);
    }
    
    return (
       <header>
            <Title>Кино снимать не **ем махать (с)</Title>
            <DayNavigation/>
       </header>
    )


}



export default Header;