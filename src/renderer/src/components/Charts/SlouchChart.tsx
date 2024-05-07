import React, { useContext } from 'react'
import { UserContext } from '@renderer/contexts/User'
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

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend)

interface Event {
  user_id: number
  event_type: string
  event_time: number
}

const SlouchChart: React.FC = () => {
  const {userPostureEvents} = useContext(UserContext)
  const getEventsByDay = (dayOfWeek: number): Event[] => {
    return userPostureEvents.filter(event => {
      const eventDate = new Date(event.event_time)
      return eventDate.getDay() === dayOfWeek;
    })
  }
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
        data: labels.map((label) => getEventsByDay(labels.indexOf(label)).length),
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
