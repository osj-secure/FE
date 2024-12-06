import React from 'react';
import { useNavigate } from 'react-router-dom';


function Intro() {
    const navigate = useNavigate();
    return (
        <div>
            <h1>intro Page</h1>
            <p>This is intro page.</p>
            <button onClick={() => navigate('/main')}>to main</button>
        </div>
    );
}

export default Intro;