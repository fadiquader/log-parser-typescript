import { createLogEvent } from './test-utils/create-log-event';
import { LogEventFormatter } from "../src/log-event-formatter";

describe('LogEventFormatter class', () => {
  let logEventObj = createLogEvent();

  beforeEach(() => {
    logEventObj = createLogEvent();
  });

  it('formats log event', () => {
    const formattedLogEvent = new LogEventFormatter(logEventObj)
    expect(formattedLogEvent.timestamp).toBe(new Date(logEventObj.timestamp).getTime())
    expect(formattedLogEvent.data).toEqual(JSON.parse(logEventObj.data))
  });

  it('stringifies log event object', () => {
    const formattedLogEvent = new LogEventFormatter(logEventObj);
    expect(formattedLogEvent.toString()).toMatch(JSON.stringify({
      timestamp: new Date(logEventObj.timestamp).getTime(),
      level: 'error',
      data: JSON.parse(logEventObj.data)
    }))
  })
})
