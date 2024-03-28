import React from 'react'
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

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend)

const ApplicationChart: React.FC = () => {
  const options3 = {
    plugins: {
      title: {
        display: true,
        text: 'Emotions by Application'
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

  const labels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

  const data3 = {
    labels: ['VSCode', 'Chrome', 'Spotify', 'Slack', 'Terminal'],
    datasets: [
      {
        label: 'Happy',
        data: labels.map(() => faker.number.int({ min: 0, max: 1000 })),
        backgroundColor: 'rgb(255, 99, 132)'
      },
      {
        label: 'Sad',
        data: labels.map(() => faker.number.int({ min: 0, max: 1000 })),
        backgroundColor: 'rgb(75, 192, 192)'
      },
      {
        label: 'Angry',
        data: labels.map(() => faker.number.int({ min: 0, max: 1000 })),
        backgroundColor: 'rgb(53, 162, 235)'
      },
      {
        label: 'Fear',
        data: labels.map(() => faker.number.int({ min: 0, max: 1000 })),
        backgroundColor: 'rgb(255, 206, 86'
      },
      {
        label: 'Disgust',
        data: labels.map(() => faker.number.int({ min: 0, max: 1000 })),
        backgroundColor: 'rgb(255, 159, 64)'
      },
      {
        label: 'Neutral',
        data: labels.map(() => faker.number.int({ min: 0, max: 1000 })),
        backgroundColor: 'rgb(153, 102, 255)'
      }
    ]
  }

  return (
    <div
      style={{
        width: 'calc(100vw - 20rem)',
        height: '100%',
        display: 'flex',
        paddingLeft: '15rem',
        paddingTop: '2rem'
      }}
    >
      <Bar options={options3} data={data3} />
    </div>
  )
}

export default ApplicationChart
