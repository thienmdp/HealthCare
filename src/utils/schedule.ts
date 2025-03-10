export const generateTimeSlots = (startTime: string, endTime: string, intervalMinutes: number = 15): string[] => {
  const slots: string[] = []
  const [startHour, startMinute] = startTime.split(':').map(Number)
  const [endHour, endMinute] = endTime.split(':').map(Number)

  let currentHour = startHour
  let currentMinute = startMinute

  while (currentHour < endHour || (currentHour === endHour && currentMinute < endMinute)) {
    slots.push(`${currentHour.toString().padStart(2, '0')}:${currentMinute.toString().padStart(2, '0')}`)

    currentMinute += intervalMinutes
    if (currentMinute >= 60) {
      currentHour += 1
      currentMinute = 0
    }
  }

  return slots
}
