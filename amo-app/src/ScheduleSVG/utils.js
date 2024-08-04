export const extractTime = (dateTimeString) => {
  const date = new Date(dateTimeString)
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')

  return `${hours}:${minutes}`
}

export const getSpeakerName = (speakers, id, lang = 'zh') => {
  console.log({ speakers })
  const speaker = speakers.find(
    (speaker) => speaker.id === id
  )

  return speaker ? speaker[lang].name : ''
}
