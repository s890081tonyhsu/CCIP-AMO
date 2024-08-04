import { useRef } from "react"
import { extractTime } from "./utils"

const SESSION_WIDTH = 1000
const SESSION_HEIGHT = 40

const INLINE_STYLES = `
  text { font-family: Arial, sans-serif; }
  .time { fill: #ffffff; }
  .title { fill: #000000; }
  .speaker { fill: #000000; }
`

function SessionRow({ session, idx }) {
  const yPosition = 30 + idx * SESSION_HEIGHT
  const rectHeight = 20
  const rectRadius = 10

  return (
    <g key={session.id}>
      <rect
        x="0"
        y={yPosition - rectHeight + 5}
        width="70"
        height={rectHeight}
        rx={rectRadius}
        ry={rectRadius}
        fill="#007bff"
      />
      {/* 時間 */}
      <text x="10" y={yPosition} className="time">
        {extractTime(session.start)}
      </text>

      {/* 中文標題 */}
      <text x="80" y={yPosition} className="title">
        {session.zh.title}
      </text>

      {/* 英文標題 */}
      <text x="80" y={yPosition + 20} className="title">
        {session.en.title}
      </text>

      {/* 講者 */}
      {session.speakers && (
        <text x="500" y={yPosition} className="speaker">
          {session.speakersTranslation.map((name, index) => (
            <tspan key={index} x="700" dy="1.2em">
              {name}
              {index !== session.speakers.length - 1 && ', '}
            </tspan>
          ))}
        </text>
      )}
    </g>
  )
}

function PreviewSVG({ sessions }) {
  const ref = useRef(null);
  const imageHeight = 40 + sessions.length * SESSION_HEIGHT

  const downloadSVG = () => {
    const svgContent = ref.current.innerHTML;
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
    <>
      <div ref={ref} className="svg-container">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={SESSION_WIDTH}
          height={imageHeight}
        >
          <style>{INLINE_STYLES}</style>
          {sessions.map((session, idx) => (
            <SessionRow key={session.id} session={session} idx={idx} />
          ))}
        </svg>
      </div>
      <button className="download-button" onClick={downloadSVG}>
        Download as SVG
      </button>
    </>
  )
}

export default PreviewSVG
