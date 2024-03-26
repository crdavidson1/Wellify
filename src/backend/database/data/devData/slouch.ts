interface Event {
  eventStart: number
  eventEnd: number
  totalTime: number
  sessionId: number
}
interface Slouch extends Event {
  slouchId: number
}
const slouchData: Slouch[] = [
  { slouchId: 1, eventStart: 1590103140000, eventEnd: 1590103140000, totalTime: 0, sessionId: 1 }
]

export default slouchData
