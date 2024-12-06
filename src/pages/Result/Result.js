import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiRefreshCw } from "react-icons/fi";
import { IoMdSkipBackward } from "react-icons/io";
import { LuDownload } from "react-icons/lu";
import './Result.css';

const Result = () => {
    const navigate = useNavigate();

    return (
        <div>
            <div className='top'>
                <button className='back' onClick={() => {navigate("/main")}}>
                    <IoMdSkipBackward className = 'back_icon'/>
                    back
                </button>
                <button className='refresh'>
                    <FiRefreshCw style={{width: '5vh', height: '5vh'}}/>
                </button>
            </div>
            <div className='middle'>
                <div className='result'></div>
                <div className='result'></div>
                <div className='result'></div>
            </div>
            <div className='bottom'>
                <button className='download'>
                    <LuDownload className='download_icon'/>
                    Download
                </button>
            </div>
        </div>
    );
}

export default Result;