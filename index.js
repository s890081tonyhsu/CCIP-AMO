const generateSchedule = require('./generateSchedule')
const fs = require('fs')
const config = require('./config')
;(async () => {
  let res = await generateSchedule(config)

  // 檔案名稱和路徑
  const fileName = 'schedule.json'

  // 將資料寫入檔案
  fs.writeFile(fileName, res, (err) => {
    if (err) {
      console.error('無法寫入檔案：', err)
      return
    }
    console.log('資料已成功寫入到檔案中。')
  })

  console.log(res)
})()
