import React from 'react';

const Settings: React.FC = () => {
    return (
        <div>
            <br></br>
            <label>Camera: </label>
            <select name='Model Performance' id='model-performance'>
                <option>Camera 1</option>
                <option>Camera 2</option>
                <option>Camera 3</option>
            </select>
            <br></br>
            <br></br>
            <label>Model Performance: </label>
            <select name='Model Performance' id='model-performance'>
                <option>Lite</option>
                <option>Full</option>
                <option>Heavy</option>
            </select>
            <br></br>
            <br></br>
            <label>Posture Strictness: </label>
            <select name='Posture Strictness' id='posture-strictness'>
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
            </select>
        </div>
    )
}

export default Settings