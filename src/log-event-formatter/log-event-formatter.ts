import { LogEventInterface } from "./log-event.interface";
import { LogEventDataInterface } from "./log-event-data.interface";

/**
 * Formats parsed log objects to pipe into a file or something else later.
 */
export class LogEventFormatter {
  timestamp: number
  level: string
  data: LogEventDataInterface

  constructor(logEvent: LogEventInterface) {
    this.timestamp = new Date(logEvent.timestamp).getTime()
    this.level = logEvent.level
    this.data = JSON.parse(logEvent.data || '{}')
  }

  toString(): string {
    return JSON.stringify({
      timestamp: this.timestamp,
      level: this.level,
      data: this.data
    })
  }
}
