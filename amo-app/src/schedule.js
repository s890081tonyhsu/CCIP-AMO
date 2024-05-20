// src/Schedule.js
import React from 'react'
import { schedule } from './data'
import './Schedule.css' // 將樣式放在這裡

const Schedule = () => {
  return (
    <div className="schedule">
      {schedule.map((item, index) => (
        <div className="schedule-item" key={index}>
          <div className="time">{item.time}</div>
          <div className="details">
            <div className="title">{item.title}</div>
            {item.speaker && <div className="speaker">{item.speaker}</div>}
          </div>
        </div>
      ))}
    </div>
  )
}

export default Schedule
