import React, { useEffect } from 'react';
import './Main.css';
import { LuPenTool } from "react-icons/lu";
import { useNavigate } from 'react-router-dom';

const Main = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const colorBoxes = document.querySelectorAll('.color_box');
        const colors = ['#C00000', '#FF7049', '#FFF280', '#80FF89','#606DFF', '#8983FF', '#EA8EFF']

        colorBoxes.forEach((box, index) => {
            box.style.backgroundColor = colors[index % colors.length];
        });
    }, []);

    return (
        <div className='Main_Container'>
            <div className='padding_1'></div>
            <div className='color_container'>
                <div id='side_margin'></div>
                <div className='color_box'></div>
                <div id='middle_margin'></div>
                <div className='color_box'></div>
                <div id='middle_margin'></div>
                <div className='color_box'></div>
                <div id='middle_margin'></div>
                <div className='color_box'></div>
                <div id='middle_margin'></div>
                <div className='color_box'></div>
                <div id='middle_margin'></div>
                <div className='color_box'></div>
                <div id='middle_margin'></div>
                <div className='color_box'></div>
                <div id='side_margin'></div>
            </div>
            <div className='padding_2'></div>
            <div className='style_container'>
                <div id='style_box'>
                    <div className='style_text'>style 1</div>
                    <div className='style_image'></div>
                </div>
                <div id='style_box'>
                    <div className='style_text'>style 2</div>
                    <div className='style_image'></div>
                </div>
                <div id='style_box'>
                    <div className='style_text'>style 3</div>
                    <div className='style_image'></div>
                </div>
                <div id='style_box'>
                    <div className='style_text'>style 4</div>
                    <div className='style_image'></div>
                </div>
                <div id='style_box2'>
                    <div className='style_text'>style 5</div>
                    <div className='style_image'></div>
                </div>
            </div>
            <div className='padding_3'></div>
            <div className='input_container'>
                <div className = 'explain_text'>Input Prompt</div>
                <div className='input_box'></div>
            </div>
            <div className='padding_4'></div>
            <div className='generate_container' onClick={() => navigate('/main/result')}>
                <LuPenTool className='generate_icon' size={40}/>
                <div className='generate_text'>Generate</div>
            </div>
            <div className='padding_5'></div>
        </div>
    );
};


export default Main;