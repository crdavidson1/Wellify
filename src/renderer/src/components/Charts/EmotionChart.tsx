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
import { Pie } from 'react-chartjs-2'
import { UserContext } from '@renderer/contexts/User'

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend)

interface Event {
  user_id: number
  event_type: string
  event_time: number
}

const EmotionChart: React.FC = () => {
  const {userEmotionEvents} = useContext(UserContext)
  const totalEvents = userEmotionEvents.length
  console.log(userEmotionEvents)
  const getEventsByEmotion = (emotion: string): Event[] => {
    return userEmotionEvents.filter(event => {
      return event.event_type === emotion;
    })
  }

  const options2 = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const
      },
      title: {
        display: true,
        text: 'Emotions This Week'
      }
    }
  }

  const labels = ['Happy', 'Sad', 'Angry', 'Fear', 'Disgust', 'Neutral']

  const data2 = {
    labels: labels,
    datasets: [
      {
        label: '% of Time',
        data: labels.map((label) => getEventsByEmotion(label).length/totalEvents*100),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }
    ]
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        paddingLeft: '25%',
        paddingTop: '5%',
        width: '50%'
      }}
    >
      <Pie options={options2} data={data2} />
    </div>
  )
}

export default EmotionChart
