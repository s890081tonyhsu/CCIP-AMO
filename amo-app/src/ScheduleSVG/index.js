import { useState, useMemo } from 'react'

import { getSpeakerName } from './utils'
import PreviewSVG from './PreviewSVG'
import './styles.css'

function ScheduleSVG({ scheduleData }) {
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedRoom, setSelectedRoom] = useState(null)
  
  const validSpeakers = useMemo(() => scheduleData.speakers.filter(
    (speaker) => speaker.id !== null
  ), [scheduleData])

  const uniqueDates = useMemo(() => [...new Set(
    scheduleData.sessions.map(
      (session) => session.start.split('T')[0]
    )
  )], [scheduleData])

  const uniqueRooms = useMemo(() => [...new Set(
    scheduleData.sessions.map(
      (session) => session.room
    )
  )], [scheduleData])

  const filteredSessions = useMemo(() => {
    if (!selectedDate || !selectedRoom) return [];

    return scheduleData.sessions
      .filter((session) => (
        session.start.includes(selectedDate) && session.room === selectedRoom
      ))
      .map((session) => ({
        ...session,
        speakersTranslation: session.speakers.map((speaker) => getSpeakerName(validSpeakers, speaker.id, 'zh'))
      }))
      .sort((a, b) => new Date(a.start) - new Date(b.start));
  }, [scheduleData.sessions, selectedDate, selectedRoom, validSpeakers])

  return (
    <div>
      {uniqueDates.map((date, index) => (
        <button
          key={index}
          onClick={() => setSelectedDate(date)}
          className={`button ${
            selectedDate === date ? 'selected-button' : ''
          }`}
        >
          {date}
        </button>
      ))}
      {selectedDate && (
        <div>
          {uniqueRooms.map((room, index) => (
            <button
              key={index}
              onClick={() => setSelectedRoom(room)}
              className={`button ${
                selectedRoom === room ? 'selected-button' : ''
              }`}
            >
              {room}
            </button>
          ))}
        </div>
      )}
      <PreviewSVG sessions={filteredSessions} />
    </div>
  )
}

export default ScheduleSVG
