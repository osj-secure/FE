import React from 'react';
import './Main.css';
// import { useNavigate } from 'react-router-dom';

const Main = () => {
    // const navigate = useNavigate();
    return (
        <div className='Main_Container'>
            <div className='padding_1'></div>
            <div className='color_container'></div>
            <div className='padding_2'></div>
            <div className='style_container'>
                <div id='style_box'></div>
                <div id='style_box'></div>
                <div id='style_box'></div>
                <div id='style_box'></div>
                <div id='style_box2'></div>
            </div>
            <div className='padding_3'></div>
            <div className='input_container'>
                <div className='input_box'></div>
            </div>
            <div className='padding_4'></div>
            <div className='download_container'></div>
            <div className='padding_5'></div>
            
            {/* <button onClick={() => navigate('/main/result')}>to result</button> */}
        </div>
    );
};


export default Main;