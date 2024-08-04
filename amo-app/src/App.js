import React, { useEffect, useState } from 'react'
import ScheduleSVG from './ScheduleSVG'

function App() {
  const [schedule, setSchedule] = useState(null)

  useEffect(() => {
    const getSchedule = async () => {
      const response = await fetch('./schedule.json');
      const result = await response.json();
      setSchedule(result);
    }

    getSchedule()
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <h1>Agenda</h1>
      </header>
      <div className="container">
        <div className="sidebar">
          {/* <ScheduleSVG /> */}
          {schedule && <ScheduleSVG scheduleData={schedule} />}
        </div>
      </div>
    </div>
  )
}

export default App
