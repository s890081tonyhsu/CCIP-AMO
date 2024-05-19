const express = require('express')
const app = express()
const fs = require('fs')
const generateSchedule = require('./generateSchedule')
const config = require('./config')

app.get('/', (req, res) => {
  // 送回 index.html 文件
  res.sendFile(__dirname + '/index.html')
})

app.get('/getScheduleData', async (req, res) => {
  try {
    let scheduleData = await generateSchedule(config)
    // 將資料以 JSON 格式送回給前端
    res.json(scheduleData)
  } catch (err) {
    // 如果發生錯誤，返回錯誤訊息
    res.status(500).json({ error: err.message })
  }
})

const PORT = 3000
const HOST = 'localhost'

app.listen(PORT, HOST, () => {
  console.log(`Server is running at http://${HOST}:${PORT}`)
})
