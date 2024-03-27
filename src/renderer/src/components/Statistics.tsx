import React from 'react';
import { useState } from 'react'
import SlouchChart from './Charts/SlouchChart';
import EmotionChart from './Charts/EmotionChart';
import ApplicationChart from './Charts/ApplicationChart';

const Statistics: React.FC = () => {
    const [chartType, setChartType] = useState()

    function handleChange(event) {
        setChartType(event.target.value)
    }
    let chart = <SlouchChart/>
    if (chartType === '1') {
        chart = <SlouchChart/>
    }
    if (chartType === '2') {
        chart = <EmotionChart/>
    }
    if (chartType === '3') {
        chart = <ApplicationChart/>
    }

  return (
    <div style={{height:'400px'}}>
        <label>Select a chart: </label>
            <select value={chartType} onChange={handleChange} name='Select Chart' id='model-performance'>
                <option value={'1'}>Slouches This Week</option>
                <option value='2'>Emotions This Week</option>
                <option value='3'>Emotions By Application</option>
            </select>
        {chart}
    </div>
  )
}

export default Statistics