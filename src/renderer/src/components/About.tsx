import React from 'react'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary
}))

export default function About() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Item>
            <div>INSERT IMAGE HERE</div>
          </Item>
        </Grid>
        <Grid item xs={12}>
          <Item>
            <div
              style={{
                fontWeight: 'bold',
                textAlign: 'justify',
                padding: '20px',
                fontSize: '15px',
                color: 'black'
              }}
            >
              Wellify is the health app you were looking for! It tracks your posture and emotions
              during a day to help you maintain a healthy working position and monitor your emotions
              throughout the day. You can then look through your app usage and determine which app
              causes you the most distress. It provides useful notifications to inform you if you
              are sitting too close to your screen, and it will also notify you if you are
              slouching.
            </div>
          </Item>
        </Grid>
        <Grid item xs={12}>
          <Item>
            <div>
              About creators:
              <div>
                <a
                  href="https://www.linkedin.com/in/ginny-truong-659051197/"
                  style={{
                    textDecoration: 'none',
                    color: 'black',
                    fontWeight: 'bold',
                    fontSize: '15px'
                  }}
                >
                  Ginny Truong
                </a>
              </div>
              <div>
                <a
                  href="https://www.linkedin.com/in/acldiamond/"
                  style={{
                    textDecoration: 'none',
                    color: 'black',
                    fontWeight: 'bold',
                    fontSize: '15px'
                  }}
                >
                  Alexander Diamond
                </a>
              </div>
              <div>
                <a
                  href="https://www.linkedin.com/in/christopher-li-446073154/"
                  style={{
                    textDecoration: 'none',
                    color: 'black',
                    fontWeight: 'bold',
                    fontSize: '15px'
                  }}
                >
                  Chris Li
                </a>
              </div>
              <div>
                <a
                  href="https://www.linkedin.com/in/callum-davidson-93a13a175/"
                  style={{
                    textDecoration: 'none',
                    color: 'black',
                    fontWeight: 'bold',
                    fontSize: '15px'
                  }}
                >
                  Callum Davidson
                </a>
              </div>
              <div>
                <a
                  href="https://www.linkedin.com/in/nicolahorynska/"
                  style={{
                    textDecoration: 'none',
                    color: 'black',
                    fontWeight: 'bold',
                    fontSize: '15px'
                  }}
                >
                  Nicola Grzebyk
                </a>
              </div>
            </div>
          </Item>
        </Grid>
      </Grid>
    </Box>
  )
}
