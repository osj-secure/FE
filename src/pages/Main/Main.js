import React, { useEffect, useState } from 'react';
import './Main.css';
import { LuPenTool } from "react-icons/lu";
import { useNavigate } from 'react-router-dom';
import { GoogleGenerativeAI } from "@google/generative-ai";

const Main = () => {
    const navigate = useNavigate();
    const genAI = new GoogleGenerativeAI("AIzaSyBgKxoEX9hsxvSu2qsYdoV1yOVqls-BH-c");
    const [selectedColor, setSelectedColors] = useState([]);
    const [selectedStyle, setSelectedStyle] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [colorPalette, setColorPalette] = useState([]);
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
        // style, color, inputPrompt을 조합하여 hardCodingInput 생성
        const hardCodingInput = `너의 역할은 간단한 그림의 묘사에 대한 text를 더 창의적으로 생성하는거야. prompt는 해당 내용이 포함되어아돼 "그림의 스타일 {style}, 그림 스타일에 대한{art style's description}설명, 배경의 테마, 배경의 디테일, 사물에 대한 표현, 등등. "다른 긴말 필요없이 결과만 알려줘. 그림의 스타일은 ${selectedStyle}고, 색깔은 ${selectedColor} ", "
        )}이 들어갔으면 좋겠어, + ${inputPrompt}`;
        try {
            console.log("Hardcoding Input:", hardCodingInput); // Debugging input
        
            // Step 1: Generate Prompt using Gemini API
            const geminiModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
            const geminiResponse = await geminiModel.generateContent(hardCodingInput);
        
            // Wait for Gemini response and check its validity
            const generatedPromptText = geminiResponse?.response?.text() || "";
            console.log("Gemini Response:", geminiResponse);
            console.log("Generated Prompt Text:", generatedPromptText);
        
            if (!generatedPromptText.trim()) {
              console.error("Prompt generation failed or is empty.");
              setErrorMessage("Prompt generation failed or is empty.");
              return; // Do not proceed if the prompt is invalid
            }
        
            // Step 2: Send the generated prompt to the server
            const serverResponse = await fetch("https://bottle22.netlify.app/api/save-prompt", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ prompt: generatedPromptText }),
            });

            // serverResponse 결과와 상관없이 prompt를 result.js로 전달
            // 여기서는 serverResponse를 사용하지 않고, generatedPromptText만 넘긴다고 가정
            navigate('/main/result', { state: { generatedPromptText } });
            
        } catch (error) {
            console.error("Error:", error);
            setErrorMessage(error.message || "An unexpected error occurred.");
        }
    };

    return (
        <div className='Main_Container'>
            <div className='padding_1'></div>
            <div className='color_container'>
                <div id='side_margin'></div>
                {['#C00000', '#FF7049', '#FFF280', '#80FF89','#606DFF', '#8983FF', '#EA8EFF'].map((color, index) => (
                    <React.Fragment key={index}>
                        {index > 0 && <div id='middle_margin'></div>} {/* 색상 박스 사이에 중간 마진 추가 */}
                        <div
                            className='color_box'
                            style={{
                                backgroundColor: color,
                                border: selectedColor.includes(index) ? '4px solid green' : 'none', // 선택된 박스에만 녹색 테두리 추가
                            }}
                            onClick={() => handleColorClick(index)}
                        />
                    </React.Fragment>
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
                {/* input type='text' 에서 기본값을 나타내기 위해 value 속성을 사용합니다. */}
                <input 
                    type='text' 
                    className='input_box' 
                    value={inputPrompt}
                    onChange={(e) => setInputPrompt(e.target.value)}
                />
            </div>
            <div className='padding_4'></div>
            {/* Generate 버튼 클릭 시 handleGeneratePrompt 실행 */}
            <div className='generate_container' onClick={handleGeneratePrompt}>
                <LuPenTool className='generate_icon' size={40}/>
                <div className='generate_text'>Generate</div>
            </div>
            <div className='padding_5'></div>
            {errorMessage && <div style={{color: 'red'}}>{errorMessage}</div>}
        </div>
    );
};

export default Main;
