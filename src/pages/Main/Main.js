import React, { useEffect, useState } from 'react';
import './Main.css';
import { LuPenTool } from "react-icons/lu";
import { useNavigate } from 'react-router-dom';

const Main = () => {
    const navigate = useNavigate();
    const [selectedColor, setSelectedColors] = useState([]);
    const [selectedStyle, setSelectedStyle] = useState(null);
    const [theme, setTheme] = useState("");
    const [colorPalette, setColorPalette] = useState([]);
    const [excludedColors, setExcludedColors] = useState([]);
    const [inputPrompt, setInputPrompt] = useState(`
        연하지 않고 진한 색상이면 좋겠어. 고양이 세,
        네마리가 줄지어서 앉아있으면 좋겠어. 근데 고양이가 두
        마리는 생선을 먹고, 두 마리는 낮잠을 자면 좋겠어.
    `);
    
    const colorOptions = [
        "red",
        "orange",
        "yellow",
        "green",
        "blue",
        "purple",
        "black",
        "grey",
        "white",
    ];
    
    const themes = [
        "Acrylic painting",
        "Watercolor painting",
        "Oil painting",
        "Pastel painting",
        "Pen and Ink drawing",
        "Graphite drawing",
        "Charcoal drawing",
        "Colored pencil drawing",
        "Digital art",
        "Cinematic lighting",
    ];
    
    useEffect(() => {
        const colorBoxes = document.querySelectorAll('.color_box');
        const colors = ['#C00000', '#FF7049', '#FFF280', '#80FF89','#606DFF', '#EA8EFF', '#000000', '#808080', '#FFFFFF']

        colorBoxes.forEach((box, index) => {
            box.style.backgroundColor = colors[index % colors.length];
        });
    }, []);

    const handleColorClick = (index) => {
        setSelectedColors((prevSelectedColors) => {
            if (prevSelectedColors.includes(index)) {
                // 이미 선택된 색상은 제거
                return prevSelectedColors.filter((colorIndex) => colorIndex !== index);
            } else {
                // 선택되지 않은 색상은 추가
                return [...prevSelectedColors, index];
            }
        });
    };

    const handleStyleClick = (index) => {
        setSelectedStyle((prevSelectedStyle) => {
            if (prevSelectedStyle === index) {
                // 이미 선택된 스타일은 제거
                return null;
            } else {
                // 선택되지 않은 스타일은 추가
                return index;
            }
        });
    }

    const handleGeneratePrompt = async () => {
        const hardCodingInput = `너의 역할은 간단한 그림의 묘사에 대한 text를 더 창의적으로 생성하는거야. prompt는 해당 내용이 포함되어아돼 "그림의 스타일 {style}, 그림 스타일에 대한{art style's description}설명, 배경의 테마, 배경의 디테일, 사물에 대한 표현, 등등. "다른 긴말 필요없이 결과만 알려줘. 그림의 스타일은 ${theme}고, 색깔은 ${colorPalette.join(
            ", "
        )}이 들어갔으면 좋겠고, ${excludedColors.join(
            ", "
        )}는 안들어갔으면 좋겠어. + ${inputPrompt}`;

    }

    return (
        <div className='Main_Container'>
            <div className='padding_1'></div>
            <div className='color_container'>
                <div id='side_margin'></div>
                {['#C00000', '#FF7049', '#FFF280', '#80FF89','#606DFF', '#8983FF', '#EA8EFF'].map((color, index) => (
        <>
            {index > 0 && <div id='middle_margin'></div>} {/* 색상 박스 사이에 중간 마진 추가 */}
            <div
                key={index}
                className='color_box'
                        style={{
                            backgroundColor: color,
                            border: selectedColor.includes(index) ? '4px solid green' : 'none', // 선택된 박스에만 녹색 테두리 추가
                        }}
                        onClick={() => handleColorClick(index)}
            />
        </>
        ))}
                <div id='side_margin'></div>
            </div>
            <div className='padding_2'></div>
            <div className='style_container'>
            {['Acrylic', 'Watercolor', 'Oil', 'Pastel', 'Pen and Ink', 'Graphite', 'Charcoal', 'Colored pencil', 'Digital art', 'Cinematic lighting'].map((style, index) => (
                    <div
                        key={index}
                        className={`style_box ${style === 'Cinematic lighting' ? 'style_text2' : ''}`}
                    >
                        <div
                            id={`style_image${index + 1}`}
                            className='style_image'
                            style={{
                                border: selectedStyle === index ? '4px solid green' : 'none', // 이미지에 녹색 테두리 추가
                            }}
                            onClick={() => handleStyleClick(index)} // 스타일 클릭 시 처리
                        ></div>
                        <div className={`style_text ${style === 'Cinematic lighting' ? 'style_text2' : ''}`}>
                            {style}
                        </div>
                    </div>
                ))}
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