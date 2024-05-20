import React from 'react'
import { schedule } from './data'
import './ScheduleSVG.css'

const ScheduleSVG = () => {
  const generateSVG = () => {
    const svgContent = schedule
      .map((item, index) => {
        const yPosition = 30 + index * 40
        const rectHeight = 20
        const rectRadius = 10

        return `
        <g>
          <rect x="0" y="${
            yPosition - rectHeight + 5
          }" width="50" height="${rectHeight}" rx="${rectRadius}" ry="${rectRadius}" fill="#007bff" />
          <text x="10" y="${yPosition}" fill="#ffffff" class="time">${
          item.time
        }</text>
          <text x="60" y="${yPosition}" class="title">${item.title}</text>
          ${
            item.speaker
              ? `<text x="300" y="${yPosition}" class="speaker">${item.speaker}</text>`
              : ''
          }
        </g>
      `
      })
      .join('')

    return `
      <svg xmlns="http://www.w3.org/2000/svg" width="600" height="${
        40 + schedule.length * 40
      }">
        <style>
          text { font-family: Arial, sans-serif; }
        </style>
        ${svgContent}
      </svg>
    `
  }

  const downloadSVG = () => {
    const svgContent = generateSVG()
    const blob = new Blob([svgContent], { type: 'image/svg+xml' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'schedule.svg'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div>
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
      <button className="download-button" onClick={downloadSVG}>
        Download as SVG
      </button>
    </div>
  )
}

export default ScheduleSVG
