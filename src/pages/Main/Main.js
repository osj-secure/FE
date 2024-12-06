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
                <div className='style_box'>
                    <div id='style_image1'></div>
                    <div className='style_text'>Acrylic</div>
                </div>
                <div className='style_box'>
                    <div id='style_image2'></div>
                    <div className='style_text'>Watercolor</div>
                </div>
                <div className='style_box'>
                    <div id='style_image3'></div>
                    <div className='style_text'>Oil</div>
                </div>
                <div className='style_box'>
                    <div id='style_image4'></div>
                    <div className='style_text'>Pastel</div>
                </div>
                <div className='style_box'>
                    <div id='style_image5'></div>
                    <div className='style_text'>Pen and Ink</div>
                </div>
                <div className='style_box'>
                    <div id='style_image6'></div>
                    <div className='style_text'>Graphite</div>
                </div>
                <div className='style_box'>
                    <div id='style_image7'></div>
                    <div className='style_text'>Charcoal</div>
                </div>
                <div className='style_box'>
                    <div id='style_image8'></div>
                    <div className='style_text'>Colored pencil</div>
                </div>
                <div className='style_box'>
                    <div id='style_image9'></div>
                    <div className='style_text'>Digital art</div>
                </div>
                <div className='style_box'>
                    <div id='style_image10'></div>
                    <div className='style_text2'>Cinematic lighting</div>
                </div>
            </div>
            <div className='padding_3'></div>
            <div className='input_container'>
                <div className = 'explain_text'>Input Prompt</div>
                <input type='text' className='input_box'></input>
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