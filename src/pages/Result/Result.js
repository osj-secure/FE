import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LuRefreshCcw } from "react-icons/lu";
import { IoMdSkipBackward } from "react-icons/io";
import { LuDownload } from "react-icons/lu";
import './Result.css'

const Result = () => {
    const navigate = useNavigate()

    return (
        <div>
            <div className='top'>
                <button className = 'back' onClick={() => {navigate("/main")}}>
                    <IoMdSkipBackward/>
                    back
                </button>
                <button className='refresh'>
                    <LuRefreshCcw/>
                </button>
            </div>
            <div className='middle'>
                <button className='result'>
                    <img src="/logo192.png" alt = 'logo'></img>
                </button>
                <button className='result'>
                    <img src="/logo192.png" alt = 'logo'></img>
                </button>
                <button className='result'>
                    <img src="/logo192.png" alt = 'logo'></img>
                </button>
            </div>
            <div className='bottom'>
                <button className='download'>
                    <LuDownload/>
                </button>
            </div>
        </div>
    );
}

export default Result;