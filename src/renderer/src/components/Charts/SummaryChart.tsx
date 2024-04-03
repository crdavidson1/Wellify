import React from 'react'
import { Grid, Box, Typography } from '@mui/material'
import SummaryImg from '../../summary-page.png'

const SummaryChart: React.FC = () => {
  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          paddingLeft: '5%',
          paddingTop: '5%',
          width: '90%'
        }}
      >
        <Grid container spacing={3} justifyContent="space-evenly" sx={{ marginTop: '20px' }}>
          <Grid item xs={3}>
            <Box
              sx={{
                backgroundColor: '#9cfbee',
                padding: '20px',
                borderRadius: '10px',
                width: '150px',
                height: '150px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Typography
                sx={{
                  flexGrow: 1,
                  textAlign: 'center',
                  fontWeight: 'bold',
                  color: 'black'
                }}
              >
                Daily Average Screen Time: 4h 40m
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={3}>
            <Box
              sx={{
                backgroundColor: '#9cfbee',
                padding: '20px',
                borderRadius: '10px',
                width: '150px',
                height: '150px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Typography
                sx={{
                  flexGrow: 1,
                  textAlign: 'center',
                  fontWeight: 'bold',
                  color: 'black'
                }}
              >
                Daily Average Slouches: 2.8% less from last week
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={3}>
            <Box
              sx={{
                backgroundColor: '#9cfbee',
                padding: '20px',
                borderRadius: '10px',
                width: '150px',
                height: '150px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Typography
                sx={{
                  flexGrow: 1,
                  textAlign: 'center',
                  fontWeight: 'bold',
                  color: 'black'
                }}
              >
                Daily Average Dominant Emotion: Neutral
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={3}>
            <Box
              sx={{
                backgroundColor: '#9cfbee',
                padding: '20px',
                borderRadius: '10px',
                width: '150px',
                height: '150px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Typography
                sx={{
                  flexGrow: 1,
                  textAlign: 'center',
                  fontWeight: 'bold',
                  color: 'black'
                }}
              >
                Most Used Application During Dominant Emotion: VS Code
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </div>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <img
          src={SummaryImg}
          alt="line art of person relaxing in a chair"
          style={{ width: 'auto', height: '250px' }}
        />
      </Box>
    </div>
  )
}

export default SummaryChart
