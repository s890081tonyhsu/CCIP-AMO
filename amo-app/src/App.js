import React from 'react'
import ScheduleSVG from './scheduleSVG'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Agenda</h1>
      </header>
      <div className="container">
        <div className="sidebar">
          <ScheduleSVG />
        </div>
      </div>
    </div>
  )
}

export default App
