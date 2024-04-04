import React from 'react'
import { useState } from 'react'
import SlouchChart from './Charts/SlouchChart'
import EmotionChart from './Charts/EmotionChart'
import ApplicationChart from './Charts/ApplicationChart'
import SummaryChart from './Charts/SummaryChart'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'

const Statistics: React.FC = () => {
  const [chartType, setChartType] = useState()

  function handleChange(value) {
    setChartType(value)
  }
  let chart = <SlouchChart />
  if (chartType === '1') {
    chart = <SlouchChart />
  }
  if (chartType === '2') {
    chart = <EmotionChart />
  }
  if (chartType === '3') {
    chart = <ApplicationChart />
  }
  if (chartType === '4') {
    chart = <SummaryChart />
  }

  return (
    <div style={{ maxWidth: '100%' }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <br></br>
        <ButtonGroup variant="contained" aria-label="Chart selection" size="small">
          <Button
            onClick={() => handleChange('4')}
            variant={chartType === '4' ? 'contained' : 'outlined'}
            sx={{
              bgcolor: chartType === '4' ? '#89c9fb' : '#0064C5',
              color: 'white',
              '&:hover': {
                bgcolor: chartType === '4' ? '#89c9fb' : '#ADD8E6'
              }
            }}
          >
            Summary
          </Button>
          <Button
            onClick={() => handleChange('1')}
            variant={chartType === '1' ? 'contained' : 'outlined'}
            sx={{
              bgcolor: chartType === '1' ? '#89c9fb' : '#0064C5',
              color: 'white',
              '&:hover': {
                bgcolor: chartType === '1' ? '#89c9fb' : '#ADD8E6'
              }
            }}
          >
            Posture This Week
          </Button>
          <Button
            onClick={() => handleChange('2')}
            variant={chartType === '2' ? 'contained' : 'outlined'}
            sx={{
              bgcolor: chartType === '2' ? '#89c9fb' : '#0064C5',
              color: 'white',
              '&:hover': {
                bgcolor: chartType === '2' ? '#89c9fb' : '#ADD8E6'
              }
            }}
          >
            Emotions This Week
          </Button>
          <Button
            onClick={() => handleChange('3')}
            variant={chartType === '3' ? 'contained' : 'outlined'}
            sx={{
              bgcolor: chartType === '3' ? '#89c9fb' : '#0064C5',
              color: 'white',
              '&:hover': {
                bgcolor: chartType === '3' ? '#89c9fb' : '#ADD8E6'
              }
            }}
          >
            Emotions By Application
          </Button>
        </ButtonGroup>
      </div>
      {chart}
    </div>
  )
}

export default Statistics
