import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { schedule } from './data'
import './ScheduleSVG.css'

const ScheduleSVG = () => {
  const generateSVG = () => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="600"
        height={`${40 + schedule.length * 40}`}
      >
        <style>
          {`
            text { font-family: Arial, sans-serif; }
            .time { fill: #ffffff; }
            .title { fill: #000000; }
            .speaker { fill: #000000; }
          `}
        </style>
        {schedule.map((item, index) => {
          const yPosition = 30 + index * 40
          const rectHeight = 20
          const rectRadius = 10

          return (
            <g key={index}>
              <rect
                x="0"
                y={yPosition - rectHeight + 5}
                width="70"
                height={rectHeight}
                rx={rectRadius}
                ry={rectRadius}
                fill="#007bff"
              />
              <text x="10" y={yPosition} className="time">
                {item.time}
              </text>
              <text x="80" y={yPosition} className="title">
                {item.title}
              </text>
              {item.speaker && (
                <text x="300" y={yPosition} className="speaker">
                  {item.speaker}
                </text>
              )}
            </g>
          )
        })}
      </svg>
    )
  }

  const downloadSVG = () => {
    // 把 React 的元素轉換為正常的 html 字串
    const svgContent = ReactDOMServer.renderToStaticMarkup(generateSVG())
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
      <div className="svg-container">{generateSVG()}</div>
      <button className="download-button" onClick={downloadSVG}>
        Download as SVG
      </button>
    </div>
  )
}

export default ScheduleSVG
