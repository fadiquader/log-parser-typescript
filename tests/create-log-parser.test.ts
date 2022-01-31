import { EventEmitter } from 'events'
import fs from 'fs'
import { createLogParser } from "../src/log-parser";
import { LogLevel } from "../src/utils/constants";
import { LogEventFormatter } from "../src/log-event-formatter";
import { JsonLogFile } from "../src/transports/json-log-file";
import {generateLogs} from "./test-utils/generate-logs";
import { MockJsonLogParser } from "./test-utils/mock-json-log-parser";
import {FileNotFoundError} from "../src/custom-erros/file-not-found-error";

jest.mock('fs')
jest.mock('../src/log-event-formatter')
jest.mock('../src/transports/json-log-file')

const jsonLogFileMock = {
  write: jest.fn(),
  close: jest.fn().mockResolvedValue(true)
}

describe('createLogParser Function', () => {
  let jsonLogParser: MockJsonLogParser;
  let eventEmitter: any;
  let logsData: string[];
  let formatter: any
  beforeEach(() => {
    logsData = generateLogs();
    eventEmitter = new EventEmitter();
    jest.mocked(JsonLogFile).mockReturnValueOnce((jsonLogFileMock as unknown) as JsonLogFile)
    jsonLogParser = new MockJsonLogParser(LogLevel.ERROR)
    jest.spyOn(jsonLogParser, 'parse')
    formatter = jest.fn()
      .mockImplementation(line =>  (log: any): string => new LogEventFormatter(log).toString())
  })

  it('creates a LogParser', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(true)

    const parser = createLogParser({
      inputFile: 'input.log',
      level: LogLevel.ERROR,
      parser: jsonLogParser,
      formatter,
      transports: [
        new JsonLogFile({ filename: 'output.json' })
      ],
    });

    jest.spyOn(parser, 'createReadLine').mockImplementation(() => {
      eventEmitter.close = () => {};
      return eventEmitter;
    });

    jest.spyOn(parser, 'closeTransports');

    parser.start()
    eventEmitter.emit('line', logsData[0])
    expect(jsonLogParser.parse).toHaveBeenCalledWith(logsData[0])
    expect(formatter).toHaveBeenCalled()
    eventEmitter.emit('close')
    expect(parser.closeTransports).toHaveBeenCalled()
  })

  it('throws error when file does not exist', () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(false)
    expect(() => createLogParser({
      inputFile: 'input.log',
      level: LogLevel.ERROR,
      parser: jsonLogParser,
      formatter,
      transports: [],
    })).toThrow(new FileNotFoundError('input.log'))
  })
})
