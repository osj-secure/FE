import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // useLocation 추가
import { FiRefreshCw } from "react-icons/fi";
import { IoMdSkipBackward } from "react-icons/io";
import { LuDownload } from "react-icons/lu";
import './Result.css';
import axios from "axios";

const Result = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // main.js에서 navigate로 전달한 state를 받아옴
    const { generatedPromptText } = location.state || {};

    const gptAPI = `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`;
    const [errorMessage, setErrorMessage] = useState("");
    const [generatedImage, setGeneratedImage] = useState("");
    const [state, setState] = useState("initial"); 

    const handleClick = () => {
        if (state === "initial") {
            setState("masked"); // 첫 번째 클릭 -> 원형 마스킹
        } else if (state === "masked") {
            setState("spinning"); // 두 번째 클릭 -> 회전 시작
            setTimeout(() => {
                setState("masked"); // 3초 후 회전 멈춤
            }, 3000);
        }
    };

    useEffect(() => {
        // 컴포넌트 마운트 후 이미지 생성 요청
        handleGenerateImage();
        // console.log("test") // 기존 코드에서 test 로깅
    }, []);

    const handelRefresh = () => {
        setGeneratedImage('');
        handleGenerateImage();
    };

    const handleGenerateImage = async () => {
        try {
            console.log(generatedPromptText)
            // Prompt가 없는 경우 에러 처리
            if (!generatedPromptText) {
                setErrorMessage("No prompt text provided.");
                return;
            }

            const response = await axios.post(
                "https://api.openai.com/v1/images/generations",
                {
                    model: "dall-e-3",
                    prompt: generatedPromptText,
                    n: 1,
                    size: "1024x1024",
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: gptAPI
                    },
                }
            );

            // Extract image URL from response
            const image = response.data.data[0].url;
            setGeneratedImage(image);
            setErrorMessage("");
            
        } catch (error) {
            if (error.response) {
                setErrorMessage(
                    `Error: ${error.response.status} - ${error.response.data.error.message}`
                );
            } else {
                setErrorMessage(`Error: ${error.message}`);
            }
        }
    };

    const handleDownload = async() => {
        try {
            // generatedImage는 이미지의 URL이라고 가정
            const response = await fetch(generatedImage);
            const blob = await response.blob();
        
            // Blob을 object URL로 변환
            const url = URL.createObjectURL(blob);
        
            // 다운로드를 트리거할 가상의 a 태그 생성
            const link = document.createElement("a");
            link.href = url;
            link.download = "generated_image.png"; // 원하는 파일명 지정
            document.body.appendChild(link);
            link.click();
        
            // 다운로드 후 cleanup
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error("이미지 다운로드 중 에러 발생:", error);
        }
    };

    return (
        <div>
            <div className='top'>
                <button className='back' onClick={() => {navigate("/")}}>
                    <IoMdSkipBackward className = 'back_icon'/>
                    back
                </button>
                <button className='refresh' onClick={() => {handelRefresh()}}>
                    <FiRefreshCw style={{width: '5vh', height: '5vh'}}/>
                </button>
            </div>
            <div className='middle'>
                {!generatedImage && (
                    <h3>loading</h3>
                )}
                {generatedImage && (
                    <div style={{ marginTop: "30px" }}>
                        <h3>Generated Image:</h3>
                        <div
                            className={`image-container spoke-guard ${
                                state === "spinning" ? "spinning" : ""
                            }`}
                            onClick={handleClick}
                            style={{
                                width: "256px",
                                height: "256px",
                                overflow: "hidden",
                                cursor: "pointer",
                            }}
                        >
                            <img
                                src={generatedImage}
                                alt="Generated"
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                    transition: "all 0.1s ease-in-out",
                                }}
                            />
                        </div>
                        {state === "initial" && (
                            <p style={{ marginTop: "10px", fontStyle: "italic" }}>
                                Click to mask the image!
                            </p>
                        )}
                        {state === "masked" && (
                            <p style={{ marginTop: "10px", fontStyle: "italic" }}>
                                Click again to spin the image!
                            </p>
                        )}
                        {state === "spinning" && (
                            <p style={{ marginTop: "10px", fontStyle: "italic" }}>
                                Spinning… Wait for it to stop!
                            </p>
                        )}
                    </div>
                )}
            </div>
            <div className='bottom'>
                <button className='download' onClick={() => {handleDownload()}}>
                    <LuDownload className='download_icon'/>
                    Download
                </button>
            </div>
            <div>
                {errorMessage}
            </div>
        </div>
    );
}

export default Result;
