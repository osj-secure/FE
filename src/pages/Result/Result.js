import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { FiRefreshCw } from "react-icons/fi";
import { IoMdSkipBackward } from "react-icons/io";
import { LuDownload } from "react-icons/lu";
import './Result.css';
import axios from "axios";

const Result = () => {
    const navigate = useNavigate();
    const gptAPI = `Bearer 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`;
    const [errorMessage, setErrorMessage] = useState("");
    const [generatedImage, setGeneratedImage] = useState("");
    const [state, setState] = useState("initial"); 

    const handleClick = () => {
      if (state === "initial") {
        setState("masked"); // 첫 번째 클릭 -> 원형 마스킹
      } else if (state === "masked") {
        setState("masked");
        setState("spinning"); // 두 번째 클릭 -> 회전 시작
        setTimeout(() => {
          setState("masked"); // 3초 후 회전 멈춤
        }, 3000);
      }
    };

    useEffect(() => {
        return () => {
            handleGenerateImage()
            console.log("test")
        };
    }, []);
    
    const handelRefresh = () => {
        setGeneratedImage('')
        handleGenerateImage()
    }

    const handleGenerateImage = async () => {
        try {
            var generatedPromptText
            generatedPromptText = `
            그림의 스타일: 파스텔화(Pastel painting),  파스텔화 특유의 부드러우면서도 섬세한 질감과 겹쳐 바른 듯한 색감의 표현이 돋보이는 그림 스타일.  녹색을 주조색으로 사용하여 생동감과 평온함을 동시에 표현하며,  푸른 계열의 색상은 배제하여 따스하고 안정적인 분위기를 조성한다. 진한 파스텔 색상을 사용하여 연한 느낌 없이 선명하고 강렬한 색감을 표현한다.
            
            배경 테마: 햇살 가득한 봄날의 정원.
            
            배경 디테일: 싱그러운 녹색의 풀밭과 햇살에 반짝이는 잎사귀들, 멀리 보이는 푸른빛이 감도는 나무들과 꽃들.  부드러운 곡선으로 이루어진 잔디의 질감이 파스텔의 부드러움과 어울린다.
            
            사물 표현: 세 마리의 고양이는 햇살이 비추는 풀밭에 나란히 앉아있다.  두 마리의 고양이는 맛있게 생선을 먹고 있으며,  나머지 두 마리는 햇살 아래서 눈을 감고 편안하게 낮잠을 자고 있다. 고양이들의 털은 파스텔 특유의 부드러운 질감으로 표현되며, 각 고양이의 표정과 자세는 생동감 넘치게 묘사된다. 생선은 윤기 있고 신선한 질감으로 표현되어 고양이들의 식욕을 자극한다.
            `;
            
            // await new Promise((resolve) => setTimeout(resolve, 10000));      
            
            // Step 2: Generate Image using DALL·E API
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
            const image  = response.data.data[0].url
            setGeneratedImage(image);
            setErrorMessage("");
            
        }catch (error) {
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
                <button className='back' onClick={() => {navigate("/main")}}>
                    <IoMdSkipBackward className = 'back_icon'/>
                    back
                </button>
                <button className='refresh' onClick={() => {handelRefresh()}}>
                    <FiRefreshCw style={{width: '5vh', height: '5vh'}}/>
                </button>
            </div>
            <div className='middle'>
                {!generatedImage &&(
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