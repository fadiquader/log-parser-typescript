interface LogData {
  transactionId: string
  details: string
  [name: string]: any
}

interface LogEventInterface {
  timestamp: string | number
  level: string
  data: string
}

export class LogEventFormatter {
  timestamp: number
  level: string
  data: LogData

  constructor(logEvent: LogEventInterface) {
    this.timestamp = new Date(logEvent.timestamp).getTime()
    this.level = logEvent.level
    this.data = JSON.parse(logEvent.data || '{}')
  }

  toString() {
    return JSON.stringify({
      timestamp: this.timestamp,
      level: this.level,
      data: this.data
    })
  }
}
