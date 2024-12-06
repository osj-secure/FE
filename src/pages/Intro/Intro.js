import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiPlayCircle } from "react-icons/fi";

const Intro = () => {
    const navigate = useNavigate();

    const containerStyle = {
        position: 'relative',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        backgroundColor: '#ffffff',
        fontFamily: "'Noto Sans KR', sans-serif"
    };

    // 상단 파도 영역
    const waveWrapperTopStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '40%',
        overflow: 'hidden'
    };

    // 진한 파란색 파도(상단)
    const waveTopStyle1 = {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: '#0099FF', 
        clipPath: 'ellipse(80% 100% at 20% 0%)'
    };

    // 하늘색 파도(상단)
    const waveTopStyle2 = {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: '#9ED8FF', 
        clipPath: 'ellipse(100% 90% at 40% 0%)'
    };

    // 하단 파도 영역
    const waveWrapperBottomStyle = {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '40%',
        overflow: 'hidden'
    };

    // 밝은 하늘색 파도(하단)
    const waveBottomStyle = {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: '#0099FF',
        // 아래 부분에서 위로 솟아오르는 파도 모양
        clipPath: 'ellipse(55% 85% at 50% 100%)'
    };

    const contentStyle = {
        position: 'relative',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 5%',
        marginTop: '25vh'
    };

    const leftBoxStyle = {
        maxWidth: '50%',
    };

    const titleStyle = {
        fontSize: '3rem',
        fontWeight: 'bold',
        margin: '0 0 20px 0'
    };

    const textStyle = {
        fontSize: '1.1rem',
        lineHeight: '1.6',
        color: '#333',
        marginBottom: '30px'
    };

    const buttonStyle = {
        display: 'inline-flex',
        alignItems: 'center',
        backgroundColor: '#E0F0FF',
        border: 'none',
        borderRadius: '50px',
        padding: '10px 20px',
        fontSize: '1.2rem',
        cursor: 'pointer',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
    };

    const iconStyle = {
        fontSize: '1.5rem',
        marginRight: '10px'
    };

    const imageStyle = {
        width: '200px',
        height: 'auto'
    };

    return (
        <div style={containerStyle}>
            {/* 상단 파도 레이어 */}
            <div style={waveWrapperTopStyle}>
                <div style={waveTopStyle2}></div>
                <div style={waveTopStyle1}></div>
            </div>

            {/* 하단 파도 레이어 */}
            <div style={waveWrapperBottomStyle}>
                <div style={waveBottomStyle}></div>
            </div>

            <div style={contentStyle}>
                <div style={leftBoxStyle}>
                    <div style={titleStyle}>Name</div>
                    <div style={textStyle}>
                        explain <br/>
                        explain <br/>
                        explain <br/>
                    </div>
                    <button style={buttonStyle} onClick={() => navigate('/main')}>
                        <FiPlayCircle style={iconStyle}/>
                        start
                    </button>
                </div>
                <img src='/logo192.png' alt='icon' style={imageStyle}/>
            </div>
        </div>
    );
}

export default Intro;