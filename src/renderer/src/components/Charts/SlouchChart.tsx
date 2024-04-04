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

const SlouchChart: React.FC = () => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const
      },
      title: {
        display: true,
        text: 'Slouches This Week'
      }
    }
  }

  const labels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

  const data = {
    labels,
    datasets: [
      {
        label: 'Number of Slouches',
        data: labels.map(() => faker.datatype.number({ min: 0, max: 20 })),
        backgroundColor: '#222222'
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
      <Bar options={options} data={data} />
    </div>
  )
}

export default SlouchChart
