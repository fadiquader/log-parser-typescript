import { LogEventInterface } from '../../src/log-event-formatter/log-event.interface';

export const createLogEvent = (args = {}): LogEventInterface => ({
  timestamp: '2021-08-09T02:12:51.253Z',
  level: 'error',
  data: '{"transactionId":"9abc55b2-807b-4361-9dbe-aa88b1b2e979","details":"Cannot find user orders list","code":404,"err":"Not found"}'
})
