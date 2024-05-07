import React, { useContext } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { faker } from '@faker-js/faker'
import { UserContext } from '@renderer/contexts/User'

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend)


const ApplicationChart: React.FC = () => {
  const {userEmotionEvents} = useContext(UserContext)
  const getEventsByApplication = (application: string) => {
    return userEmotionEvents.filter(event => {
      return event.active_program === application;
    })
  }
  const options3 = {
    plugins: {
      title: {
        display: true,
        text: 'Emotion Events by Application'
      }
    },
    responsive: true,
    scales: {
      x: {
        stacked: true
      },
      y: {
        stacked: true
      }
    }
  }

  const labels = ['VSCode', 'Chrome', 'Spotify', 'Slack', 'Terminal']

  const data3 = {
    labels: labels,
    datasets: [
      {
        label: 'Happy',
        data: labels.map((label) => getEventsByApplication(label).filter(event => event.event_type === 'Happy').length),
        backgroundColor: 'rgb(255, 99, 132)'
      },
      {
        label: 'Sad',
        data: labels.map((label) => getEventsByApplication(label).filter(event => event.event_type === 'Sad').length),
        backgroundColor: 'rgb(75, 192, 192)'
      },
      {
        label: 'Angry',
        data: labels.map((label) => getEventsByApplication(label).filter(event => event.event_type === 'Angry').length),
        backgroundColor: 'rgb(53, 162, 235)'
      },
      {
        label: 'Fear',
        data: labels.map((label) => getEventsByApplication(label).filter(event => event.event_type === 'Fear').length),
        backgroundColor: 'rgb(255, 206, 86'
      },
      {
        label: 'Disgust',
        data: labels.map((label) => getEventsByApplication(label).filter(event => event.event_type === 'Disgust').length),
        backgroundColor: 'rgb(255, 159, 64)'
      },
      {
        label: 'Neutral',
        data: labels.map((label) => getEventsByApplication(label).filter(event => event.event_type === 'Neutral').length),
        backgroundColor: 'rgb(153, 102, 255)'
      }
    ]
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        paddingLeft: '5%',
        paddingTop: '5%',
        width: '90%'
      }}
    >
      <Bar options={options3} data={data3} />
    </div>
  )
}

export default ApplicationChart
