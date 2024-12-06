import React from 'react';
import { useNavigate } from 'react-router-dom';
function Main() {
    const navigate = useNavigate();
    return (
        <div>
            <h1>Main Page</h1>
            <p>This is main page.</p>
            <button onClick={() => navigate('/main/result')}>to result</button>
        </div>
    );
}

export default Main;